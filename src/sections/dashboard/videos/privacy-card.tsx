import React, {FC, useEffect, useState} from 'react';
import { RadioGroup, FormControlLabel, Radio, TextField, Button, Box, Typography } from '@mui/material';
import { Chip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import '@mui/material/styles';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';
import {socialApi} from "src/api/social/socialApi";
import type { Profile } from 'src/types/social';
import { db, auth } from 'src/libs/firebase';
import {usePageView} from "src/hooks/use-page-view";
import {useTranslation} from "react-i18next";
import {tokens} from "src/locales/tokens";


interface PrivacyCardProps {
  onUpload: (data: { visibility: string, sharedEmails: string[] }) => void;
  videoLink?: string;
  downloadURL?: string;
  description?: string;
  to?: string;
  title?: string;
  onClose?: () => void;
  onBack?: () => void;
}

export const PrivacyCard: FC<PrivacyCardProps> = (props) => {
  const { onUpload, onBack, onClose, title, description } = props;
  const [uid, setUid] = useState<string | null>(auth.currentUser ? auth.currentUser.uid : null);
   const [visibility, setVisibility] = useState('public');
  const [scheduleDate, setScheduleDate] = useState<Date | null>(null);
  const [isScheduledShare, setIsScheduledShare] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [user , setUser] = useState<Profile | null>(null);
  const [currentEmail, setCurrentEmail] = useState("");
    const { t } = useTranslation();



  useEffect(() => {
    if (!uid) return; // Exit if uid is null

    const user = async () => {
      try {
        const userData = await socialApi.getProfile({ uid });

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
        const downloadUrl = localStorage.getItem('videoDownloadUrl');
        const senderName = user ? user.name : null;
        const allEmails = [currentEmail, ...emails].join(",");



        let scheduledDate = null;
        if (scheduleDate) {
            scheduledDate = Timestamp.fromDate((scheduleDate as any).$d);

        }

            const payload = {
            uid: uid,
            contentType: 'video',
            to: allEmails,
            name: senderName,
            downloadUrl: downloadUrl,
            subject: title,
            text: `${senderName} has sent you a private video titled "${title}"].
Description: "${description}" "${allEmails}" "${downloadUrl}"`,
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
                    contentType: 'video',
                   title: title,
                  name: senderName,
                    description: description,
                    downloadUrl: downloadUrl,
                    scheduleDate: scheduledDate,
                    to:  currentEmail,
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
      onUpload({ visibility, sharedEmails: emails }); // Added sharedEmails here
    }
    if (onClose) {
      onClose();
    }
  };




  return (
        <Box display="flex" flexDirection="column" height="auto" width="100%">

            <Typography variant="h5" gutterBottom>
                {t(tokens.form.privacy)}
            </Typography>


          <FormControlLabel
                value="saveOrPublish"
                control={<Radio />}
                label={t(tokens.form.saveOrPublish)}

                onChange={(e) => setVisibility((e.target as HTMLInputElement).value)}
            />

            <Box mb={3}>
                <RadioGroup value={visibility} onChange={(e) => setVisibility(e.target.value)}>
                    <FormControlLabel
                        value="private"
                        control={<Radio />}
                        label={
                            <Box>
                                {t(tokens.form.private)}

                                <Typography variant="caption" display="block">{t(tokens.form.privateVideoCaption)}</Typography>
                                {visibility === 'private' && (
                                    <Button
                                        variant="outlined"
                                        onClick={handleOpenShareModal}
                                        style={{marginTop: '10px'}}>
                                        {t(tokens.form.sharePrivately)}
                                    </Button>
                                )}
                            </Box>

                        }
                    />

                    <FormControlLabel
                        value="public"
                        control={<Radio />}
                        label={
                            <Box>
                                {t(tokens.form.public)}
                                <Typography variant="caption" display="block">{t(tokens.form.publicVideoCaption)}</Typography>
                            </Box>
                        }
                    />

                    <FormControlLabel
                        value="unlisted"
                        control={<Radio />}
                        label={
                            <Box>
                                {t(tokens.form.unlisted)}
                                <Typography variant="caption"

                                            display="block">{t(tokens.form.unlistedVideoCaption)}</Typography>
                            </Box>
                        }
                    />
                </RadioGroup>
            </Box>

            <Box mt={2} ml="auto" display="flex" justifyContent="space-between" gap={2}>
                {onBack && <Button onClick={onBack} variant="outlined">Previo</Button>}
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Guardar
                </Button>
            </Box>

            {/* The modal/dialog section */}
            <Dialog open={openShareModal} onClose={handleCloseShareModal}>
                <DialogTitle>Compartir privado</DialogTitle>
                <DialogContent>
                    <Typography variant="caption">
                        Puedes invitar a otros a ver tu video privado ingresando sus direcciones de correo electrónico a continuación. Los invitados deben registrarse para ver el video privado.
                    </Typography>

                  <Box marginTop={2}>
                    <FormControlLabel
                      control={
                        <Radio
                          checked={!isScheduledShare}
                          onChange={() => setIsScheduledShare(false)}
                        />
                      }
                      label={t(tokens.form.sendNow)}

                    />
                  </Box>

                    <TextField
                        label="Invitados"
                        placeholder="Ingrese un Email o más separados por comas"
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
                      label="Programado"
                    />


                  </Box>

                    {isScheduledShare && (

                        <LocalizationProvider  dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Compartir en fecha y hora"
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

