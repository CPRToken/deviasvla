import type { FC } from 'react';
import PropTypes from 'prop-types';
import {v4 as uuidv4} from "uuid";
import {  useEffect, useState } from 'react';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import { serverTimestamp, doc, setDoc, getDoc} from 'firebase/firestore';
import {ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import { auth, db, storage } from 'src/libs/firebase';
import { FileDropzone } from 'src/sections/dashboard/documentos/file-dropzone';
import {PrivacyDoc} from 'src/sections/dashboard/documentos/privacy-doc';
import {DetailsDoc} from 'src/sections/dashboard/documentos/details-doc';
import { Box, Dialog, DialogContent, IconButton, Stack, SvgIcon } from '@mui/material';

interface FileUploaderProps {
  onClose?: () => void;
  createdAt?: Date;
  sharedEmails?: string[];
  open?: boolean;
  onUpload?: (data: { visibility: string, scheduleDate?: Date }) => void;
  onUploadSuccess?: () => void;
}
export const FileUploader: FC<FileUploaderProps> = ({ onClose, open, onUpload, onUploadSuccess }) => {

    const user = auth.currentUser;
  const uid = user ? user.uid : null;


  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState<string>('');

  const [description, setDescription] = useState<string>('');
  const [step, setStep] = useState(1);
   const [fileLink, setFileLink] = useState<string>('');
  const [userUrl, setUserUrl] = useState(null);

  const SELECT_DOC_STEP = 1;
  const DETAILS_STEP = 2;
  const PRIVACY_STEP = 3;



    const uploadDoc = (file: File, uniqueID: string) => {
        if (uid) {
            const docsRef = ref(storage, `${uid}/documentos/${uniqueID}`);

            uploadBytes(docsRef, file).then(snapshot => {
                getDownloadURL(snapshot.ref).then(url => {
                    const docRef = doc(db, "users", uid, "documentos", uniqueID);
                    setDoc(docRef, {
                        downloadUrl: url,
                        createdAt: serverTimestamp(),
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
        if (!file || !uid || !title || !description) return;
        const uniqueID = uuidv4();
        uploadDoc(file, uniqueID);
    };

    const handleDrop = (newFiles: File[]): void => {
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
        setStep(DETAILS_STEP);
        const file = newFiles[0];
        if (!file || !uid) return;


        const uniqueID = uuidv4();
        const fileLink = `http://localhost:3000/${userUrl}/documentos/${uniqueID}`;
        setFileLink(fileLink);





        const documentRef = ref(storage, `${uid}/documentos/${uniqueID}`);

        const fileExtension = file.name.split('.').pop();

        uploadBytes(documentRef, file).then(snapshot => {
            getDownloadURL(snapshot.ref).then(url => {

                localStorage.setItem('pdfDownloadUrl', url);

                const docRef = doc(db, "users", uid, "documentos", uniqueID);


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
        if (step === SELECT_DOC_STEP) {
            setStep(DETAILS_STEP);
        } else if (step === DETAILS_STEP) {
            setStep(PRIVACY_STEP);
        } else if (step === PRIVACY_STEP) {
            uploadFile(); // Upload the file when the step is PRIVACY_STEP
        }
    };


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


    let dialog = <>
        <Dialog fullWidth maxWidth="sm" open={open || false} onClose={onClose}>

        <Stack alignItems="center" direction="row" justifyContent="space-between" spacing={3} sx={{px: 3, py: 2}}>
            <IconButton color="inherit"
                        onClick={onClose}>
                <SvgIcon>
                    <XIcon/>
                </SvgIcon>
            </IconButton>
        </Stack>
        <DialogContent>
            <FileDropzone
                accept={{'*/*': []}}
                caption="Max file size is 3 MB"
                files={files}
                onDrop={handleDrop}
                onRemove={handleRemove}
                onRemoveAll={handleRemoveAll}
                name={title}

                fileLink={fileLink}
            />
            {hasAnyFiles && (
                <Box sx={{mt: 2}}>
                    {step === DETAILS_STEP && (
                        <DetailsDoc

    onDetailsSubmit={(details) => {


        setDescription(details.description);
        handleNext();
    }}
    onBack={handleBack}

    onRemove={handleRemove}
    onRemoveAll={handleRemoveAll}/>
                    )}
                    {step === PRIVACY_STEP && (
                        <PrivacyDoc
                            title={title}
                            description={description}
                            fileLink={fileLink}
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
    </Dialog></>;
    return dialog;
};

FileUploader.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
