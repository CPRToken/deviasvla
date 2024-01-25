// details.tsx
import React, { FC, useState } from 'react';
import { Button, TextField, Box } from '@mui/material';

import Typography from '@mui/material/Typography';

interface DetailsDocProps {
    onDetailsSubmit: (details: { title: string; description: string; }) => void;
    onNext?: () => void;
    onRemove: (file: File) => void;
    onRemoveAll: () => void;
  onBack: () => void;
}

export const DetailsDoc: FC<DetailsDocProps> = ({ onDetailsSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleNext = () => {
        console.log("Inside Details:", title, description); // Log here
        onDetailsSubmit({ title, description });
    };

    return (
      <Box display="flex" flexDirection="column" height="100%">
        <Typography variant="h5" gutterBottom>
          Details
        </Typography>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={4}
                margin="normal"
            />
        <Box mt={2} ml="auto">
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
            </Box>
        </Box>
    );
};


