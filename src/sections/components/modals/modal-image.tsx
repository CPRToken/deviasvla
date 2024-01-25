import { Box, Paper, Stack, Typography, IconButton, SvgIcon } from '@mui/material';
import { FC } from 'react';
import XIcon from '@untitled-ui/icons-react/build/esm/X'; // Assuming the path is correct
import Image from 'next/image';

interface ImageViewerProps {
  imageUrl: string;
  onClose?: () => void; // Optional close function if you wish to pass one in
}


export const ImageViewer: FC<ImageViewerProps> = ({ imageUrl, onClose }) => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          (theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.100'),
        p: 3,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          margin: 3,
          maxWidth: '100%',
          mx: 'auto',
          outline: 'none',
          width: 600,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
          sx={{
            px: 2,
            py: 1,
          }}
        >
          <Typography
            sx={{ flexGrow: 1 }}
            variant="h6"
          >
           <center> Esta foto es solo para tus ojos!</center>
          </Typography>
          <IconButton onClick={onClose}>
            <SvgIcon>
              <XIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
        <Image src={imageUrl} alt="Modal content" width={100} />

      </Paper>
    </Box>
  );
}


