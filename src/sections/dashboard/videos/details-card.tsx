// details.tsx
import React, { FC, useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import {useTranslation} from "react-i18next";
import {tokens} from "src/locales/tokens";

import Typography from '@mui/material/Typography';

interface DetailsCardProps {
    onDetailsSubmit: (details: { title: string; description: string; videoLink: string;}) => void;
    onNext?: () => void;
  onBack: () => void;
}

export const DetailsCard: FC<DetailsCardProps> = ({ onDetailsSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const { t } = useTranslation();

    const handleNext = () => {
        console.log("Inside Details:", title, description); // Log here
        onDetailsSubmit({ title, description, videoLink });
    };

    return (
      <Box display="flex"
           flexDirection="column"
           height="100%">
        <Typography variant="h5"
                    gutterBottom>
            {t(tokens.form.details)}
        </Typography>
            <TextField
                label="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={4}
                margin="normal"
            />
        <Box mt={2} ml="auto">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              // Passing the title and description back to parent
              onDetailsSubmit({ title, description, videoLink });
            }}
          >
              Próximo
          </Button>
        </Box>
        </Box>
    );
};


