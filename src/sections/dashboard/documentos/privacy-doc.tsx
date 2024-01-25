import React, {FC, useEffect, useState} from 'react';
import { RadioGroup, FormControlLabel, Radio, TextField, Button, Box, Typography} from '@mui/material';
import {Chip, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import '@mui/material/styles';
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {addDoc, collection, serverTimestamp , Timestamp} from 'firebase/firestore';
import {socialApi} from "src/api/social/socialApi";
import type {Profile} from 'src/types/social';
import {db, auth} from 'src/libs/firebase';
import {usePageView} from "src/hooks/use-page-view";


// ...
interface PrivacyDocProps {
    onUpload: (data: { visibility: string, scheduleDate?: Date, sharedEmails: string[] }) => void;
    fileLink?: string;
    downloadUrl?: string;
    description?: string;
    to?: string;
    title?: string;
    onClose?: () => void;
    onBack?: () => void;
}

export const PrivacyDoc: FC<PrivacyDocProps> = (props) => {
    const {onUpload, onBack, onClose, title, description,} = props;
    const [uid, setUid] = useState<string | null>(auth.currentUser ? auth.currentUser.uid : null);
    const [visibility, setVisibility] = useState('public');
    const [scheduleDate, setScheduleDate] = useState<Date | null>(null);
    const [isScheduledShare, setIsScheduledShare] = useState(false);
    const [openShareModal, setOpenShareModal] = useState(false);
    const [emails, setEmails] = useState<string[]>([]);
    const [user, setUser] = useState<Profile | null>(null);
    const [currentEmail, setCurrentEmail] = useState("");


    useEffect(() => {
        if (!uid) return; // Exit if uid is null

        const user = async () => {
            try {
                const userData = await socialApi.getProfile({uid});

                if (!userData) {
                    console.error("User data not found");
                    return;
                }

                // Use userData instead of fetchedUser
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        user();
    }, [uid]);


    usePageView();


    const handleOpenShareModal = () => {
        setOpenShareModal(true);
    };

    const handleCloseShareModal = () => {
        setOpenShareModal(false);
    };

    const handleAddEmail = () => {
        if (currentEmail && !emails.includes(currentEmail)) {
            setEmails(prevEmails => [...prevEmails, currentEmail]);
            setCurrentEmail(''); // clear the input field after adding
        }
    };


    const handleRemoveEmail = (emailToRemove: string) => {
        setEmails(prev => prev.filter(email => email !== emailToRemove));
    };


    const handleSendEmail = async () => {
        const pdfDownloadUrl = localStorage.getItem('pdfDownloadUrl');
        const senderName = user ? user.name : null;
        const allEmails = [currentEmail, ...emails].join(",");



      let firestoreTimestamp = null;
      if (scheduleDate) {
        firestoreTimestamp = Timestamp.fromDate((scheduleDate as any).$d);


      }


          const payload = {
            uid: uid,
            contentType: 'document',
            to: allEmails,
            name: senderName,
            downloadUrl: pdfDownloadUrl,
            subject: title,
            text: `${senderName} has sent you a private video titled "${title}".
            Description: "${description}" "${allEmails}" "${pdfDownloadUrl}"`
          };

          try {
            if (!isScheduledShare) {
        await fetch('/api/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      }

      if (isScheduledShare && scheduleDate && uid) {
        const scheduleRef = collection(db, 'schedules');







        const data = {
          createdAt: serverTimestamp(),
          uid: uid,
          contentType: 'document',
          title: title,
          name: senderName,
          description: description,
          downloadUrl: pdfDownloadUrl,
          scheduleDate: firestoreTimestamp,  // updated this line
          to: currentEmail,
        };

        await addDoc(scheduleRef, data);
      }

      handleCloseShareModal();
    } catch (error) {
        console.error('Failed to send email:', error);
      } finally {
        handleCloseShareModal();
      }
    };

    const handleSubmit = () => {
        if (onUpload) {
            onUpload({visibility, sharedEmails: emails}); // Added sharedEmails here
        }
        if (onClose) {
            onClose();
        }
    };


    return (
        <Box display="flex" flexDirection="column" height="auto" width="100%">

            <Typography variant="h5" gutterBottom>
                Privacidad
            </Typography>

            <FormControlLabel
                value="saveOrPublish"
                control={<Radio/>}
                label="Save or publish"
                onChange={(e) => setVisibility((e.target as HTMLInputElement).value)}
            />

            <Box mb={3}>
                <RadioGroup value={visibility} onChange={(e) => setVisibility(e.target.value)}>
                    <FormControlLabel
                        value="private"
                        control={<Radio/>}
                        label={
                            <Box>
                                Private
                                <Typography variant="caption" display="block">Only you and people you choose can watch
                                    your video</Typography>
                                {visibility === 'private' && (
                                    <Button
                                        variant="outlined"
                                        onClick={handleOpenShareModal}
                                        style={{marginTop: '10px'}}>
                                        SHARE PRIVATELY
                                    </Button>
                                )}
                            </Box>

                        }
                    />

                    <FormControlLabel
                        value="public"
                        control={<Radio/>}
                        label={
                            <Box>
                                Public
                                <Typography variant="caption" display="block">Everyone can watch your video</Typography>
                            </Box>
                        }
                    />

                    <FormControlLabel
                        value="unlisted"
                        control={<Radio/>}
                        label={
                            <Box>
                                Unlisted
                                <Typography variant="caption" display="block">Anyone with the video link can watch your
                                    video</Typography>
                            </Box>
                        }
                    />
                </RadioGroup>
            </Box>

            <Box mt={2} ml="auto" display="flex" justifyContent="space-between">
                {onBack && <Button onClick={onBack} variant="outlined">Back</Button>}
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Save
                </Button>
            </Box>

            {/* The modal/dialog section */}
            <Dialog open={openShareModal} onClose={handleCloseShareModal}>
                <DialogTitle>Share Document Privately</DialogTitle>
                <DialogContent>
                    <Typography variant="caption">
                        You can invite others to view your private video by entering in their email addresses below.
                        Invitees must sign up to view the private video.
                    </Typography>

                    <Box marginTop={2}>
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={!isScheduledShare}
                                    onChange={() => setIsScheduledShare(false)}
                                />
                            }
                            label="Send Now"
                        />
                    </Box>

                    <TextField
                        label="Invitees"
                        placeholder="Enter an email and press Enter"
                        fullWidth
                        value={currentEmail}
                        onChange={(e) => setCurrentEmail(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddEmail()}
                        margin="normal"
                    />

                    <Box display="flex" flexWrap="wrap" gap={1} marginTop={2}>
                        {emails.map(email => (
                            <Chip
                                key={email}
                                label={email}
                                onDelete={() => handleRemoveEmail(email)}
                            />
                        ))}
                    </Box>


                    <Box marginTop={2}>
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={isScheduledShare}
                                    onChange={() => setIsScheduledShare(true)}
                                />
                            }
                            label="Schedule"
                        />


                    </Box>

                    {isScheduledShare && (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Share on Date and Time"
                                value={scheduleDate}
                                onChange={(date) => setScheduleDate(date)}
                            />
                        </LocalizationProvider>
                    )}




                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseShareModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSendEmail} color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

