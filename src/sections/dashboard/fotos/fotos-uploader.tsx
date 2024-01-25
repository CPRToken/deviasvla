import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from 'src/libs/firebase';
import { Fotos, FotosDropzone } from './fotos-dropzone';
import { useSettings } from '../../../hooks/use-settings';

interface FotosUploaderProps {
  onClose?: () => void;
  open?: boolean;
  onUploadSuccess?: () => void;
}

export const FotosUploader: FC<FotosUploaderProps> = (props) => {
  const { onClose, open = false, onUploadSuccess } = props;
  const [fotosUpload, setFotosUpload] = useState<Fotos | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const user = auth.currentUser;
  const uid = user ? user.uid : null;
  useSettings();
  const uploadFile = () => {
    if (fotosUpload === null || uid === null) return;

    const imageRef = ref(storage, `${uid}/fotos/${fotosUpload.name}`);
    uploadBytes(imageRef, fotosUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(() => {
        setFotosUpload(null);
        setFiles([]);
        if (onUploadSuccess) {
          onUploadSuccess();
        }
      });
    });
  };

  const handleDrop = useCallback((newFiles: Fotos[]): void => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setFotosUpload(newFiles[0]);
  }, []);

  useEffect(() => {
    if (fotosUpload !== null) {
      uploadFile();
    }
  }, [fotosUpload]);

  const handleRemove = useCallback((file: Fotos): void => {
    setFiles((prevFiles) => {
      return prevFiles.filter((_file) => _file !== file);
    });
  }, []);

  const handleRemoveAll = useCallback((): void => {
    setFiles([]);
  }, []);

  return (
      <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
        <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={3}
            sx={{
              px: 3,
              py: 2,
            }}
        >
          <Typography variant="h6">Upload Fotos</Typography>
          <IconButton color="inherit" onClick={onClose}>
            <SvgIcon>
              <XIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
        <DialogContent>
          <FotosDropzone
              accept={"image/*" as any}
              caption="Max file size is 3 MB"
              files={files}
              onDrop={handleDrop}
              onRemove={handleRemove}
              onRemoveAll={handleRemoveAll}
              onUpload={onClose}
          />
        </DialogContent>
      </Dialog>
  );
};

FotosUploader.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
