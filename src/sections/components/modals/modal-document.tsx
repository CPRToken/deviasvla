import {Box, IconButton, Paper, Stack, SvgIcon, Typography} from "@mui/material";

import XIcon from "@untitled-ui/icons-react/build/esm/X";

interface PDFViewerProps {
  documentUrl: string;
  onClose?: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ documentUrl, onClose }) => {
  return (
      <Box
          sx={{
            backgroundColor: (theme) =>
                (theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.100'),
            p: 3,
            maxWidth: '100vw',
            maxHeight: '100vh',
            overflow: 'hidden'
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
              width: 800,
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
              <center> Este documento es solo para tus ojos!</center>
            </Typography>
            <IconButton onClick={onClose}>
              <SvgIcon>
                <XIcon />
              </SvgIcon>
            </IconButton>
          </Stack>

          {onClose && (
              <IconButton
                  onClick={onClose}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                  }}
              >
                {/* Close Button Content */}
              </IconButton>
          )}
        </Paper>
      </Box>
  );
}

export default PDFViewer;
