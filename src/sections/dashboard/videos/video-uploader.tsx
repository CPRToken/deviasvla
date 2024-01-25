import { FC, useState,  useEffect } from 'react';
import PropTypes from 'prop-types';
import { ref, uploadBytes,  getDownloadURL,  } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore';
import { auth, db, storage } from 'src/libs/firebase';
import { Videos, VideoDropzone } from './video-dropzone';
import { DetailsCard } from './details-card';
import { PrivacyCard } from "./privacy-card";
import { Box, Dialog, DialogContent, IconButton, Stack, SvgIcon } from '@mui/material';
import XIcon from '@untitled-ui/icons-react/build/esm/X';


interface VideosUploaderProps {
  onClose?: () => void;
  title?: string;
  description?: string;
  createdAt?: Date;
  sharedEmails?: string[];
  open?: boolean;
  onUpload?: (data: { visibility: string, scheduleDate?: Date }) => void;
  onUploadSuccess?: () => void;
}

export const VideoUploader: FC<VideosUploaderProps> = (props)   => {
const { onClose, open = false, onUpload, onUploadSuccess, sharedEmails } = props;


  const user = auth.currentUser;
  const uid = user ? user.uid : null;


  const [files, setFiles] = useState<Videos[]>([]);
  const [title, setTitle] = useState<string>('');

 const [description, setDescription] = useState<string>('');
  const [step, setStep] = useState(1);
  const [videoLink, setVideoLink] = useState<string>('');
  const [userUrl, setUserUrl] = useState(null);

    const SELECT_VIDEO_STEP = 1;
  const DETAILS_STEP = 2;
  const PRIVACY_STEP = 3;


    useEffect(() => {
        if (user) {
            const userDocRef = doc(db, 'users', user.uid);
            getDoc(userDocRef).then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    setUserUrl(docSnapshot.data().userUrl);
                }
            }).catch((error) => {
                console.error("Error fetching user data:", error);
            });
        }
    }, [user]);



    const uploadVideo = (file: File, uniqueID: string, sharedEmails: string[] = []) => {
      if (uid) {  // Check if uid is not null
        const videoRef = ref(storage, `${uid}/videos/${uniqueID}`);
        uploadBytes(videoRef, file).then(snapshot => {
          getDownloadURL(snapshot.ref).then(url => {
            const docRef = doc(db, "users", uid, "videos", uniqueID);
            setDoc(docRef, {
              downloadUrl: url,
                    createdAt: serverTimestamp(),
                    title: title,
                    description: description,
                    sharedEmails: sharedEmails,
                fileSize: file.size,
            });
              if (onUploadSuccess) {
                  onUploadSuccess();
              }
          });
        });
      } else {
          // Handle the case where uid is null
      }
    };


    const uploadFile = () => {
        const file = files[0];
        if (!file || !uid) return;
        const uniqueID = uuidv4();
        uploadVideo(file, uniqueID, sharedEmails);
    };


        const handleDrop = (newFiles: File[]): void => {
            setFiles(prevFiles => [...prevFiles, ...newFiles]);
            setStep(DETAILS_STEP);
            const file = newFiles[0];
            if (!file || !uid) return;






            const uniqueID = uuidv4();
        const videoLink = `https:virtualeternity.cl/${userUrl}/videos/${uniqueID}`;
        setVideoLink(videoLink);


        const fileExtension = file.name.split('.').pop();


        const videoRef = ref(storage, `${uid}/videos/${uniqueID}`);



        uploadBytes(videoRef, file).then(snapshot => {
            getDownloadURL(snapshot.ref).then(url => {

                localStorage.setItem('videoDownloadUrl', url);

                const docRef = doc(db, "users", uid, "videos", uniqueID);


                setDoc(docRef, {
                    createdAt: serverTimestamp(),
                    downloadUrl: url,
                    fileSize: file.size,
                    name: file.name,
                    details: { title, description },

                    extension: fileExtension,

                });
                if (onUploadSuccess) {
                    onUploadSuccess();
                }
            });
        });
    };




    const handleNext = () => {
    if (step === SELECT_VIDEO_STEP) {
      setStep(DETAILS_STEP);
    } else if (step === DETAILS_STEP) {
      setStep(PRIVACY_STEP);
    } else if (step === PRIVACY_STEP) {
      uploadFile(); // Upload the file when the step is PRIVACY_STEP
    }
  };




  const handleBack = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleRemove = (file: File): void => {
    setFiles(prevFiles => prevFiles.filter(_file => _file.name !== file.name));
  };

  const handleRemoveAll = () => {
    setFiles([]);
  };


  const hasAnyFiles = files.length > 0;


    return (
      <Dialog fullWidth
              maxWidth="sm" open={!!open}
              onClose={onClose}>
        <Stack alignItems="center" direction="row" justifyContent="space-between" spacing={3} sx={{ px: 3, py: 2 }}>
          <IconButton color="inherit"
                      onClick={onClose}>
            <SvgIcon>
              <XIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
        <DialogContent>
          <VideoDropzone

              caption="Max file size is 3 MB"
              files={files}
              onDrop={handleDrop}
              onRemove={handleRemove}
              onRemoveAll={handleRemoveAll}
              videoLink={videoLink}
          />
          {hasAnyFiles && (
              <Box sx={{ mt: 2 }}>
                {step === DETAILS_STEP && (
                    <DetailsCard

                        onDetailsSubmit={details => {
                          console.log("Received from Details:", details);
                          setTitle(details.title);
                          setDescription(details.description);
                           console.log("State after setting:", title, description);

                          handleNext();
                        }}
                        onBack={handleBack}


                    />
                )}
                {step === PRIVACY_STEP && (
                    <PrivacyCard
                        title={title}
                        description={description}
                        videoLink={videoLink}
                        onUpload={(data) => {

                            if (onUpload) {
                                onUpload(data);
                            }
                        }}
                        onBack={handleBack}
                        onClose={onClose}
                    />

                )}
              </Box>
          )}
        </DialogContent>
      </Dialog>
  );
};

VideoUploader.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
