import type { FC } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "src/libs/firebase";

export const ModalOffer: FC = () => {

    const handleAccept = async () => {
        const uid = 'some-uid'; // Replace with the actual uid
        const docRef = doc(db, 'team members', uid);
        await updateDoc(docRef, {
            offerStatus: 'accepted'
        });
    }

    return (
        <Box
            sx={{
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.100'),
                p: 3,
            }}
        >
            <Container maxWidth="sm">
                <Paper elevation={12}>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            display: 'flex',
                            p: 3,
                        }}
                    >
                        <Avatar
                            sx={{
                                backgroundColor: 'primary.light',
                                color: 'primary.main',
                            }}
                        >
                            <CheckIcon />
                        </Avatar>
                        <div>
                            <Typography variant="h5">Accept Offer</Typography>
                            <Typography
                                color="text.secondary"
                                sx={{ mt: 1 }}
                                variant="body2"
                            >
                                You've been invited to manage this account. Do you accept the offer?
                            </Typography>
                        </div>
                    </Stack>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            pb: 3,
                            px: 3,
                        }}
                    >
                        <Button
                            color="inherit"
                            sx={{ mr: 2 }}
                            onClick={() => {
                                // Handle cancellation here
                            }}
                        >
                            Decline
                        </Button>
                        <Button
                            sx={{
                                backgroundColor: 'primary.main',
                                '&:hover': {
                                    backgroundColor: 'primary.dark',
                                },
                            }}
                            variant="contained"
                            onClick={handleAccept}
                        >
                            Accept
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};
