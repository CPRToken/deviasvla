import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { categories } from 'src/api/blog/data';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import { useTranslation } from 'react-i18next';

type CategoryItemProps = {
  name: string;
};

function CategoryItem({ name }: CategoryItemProps) {
  const { t } = useTranslation();

  return (
    <Box sx={{ flex: '1 0 21%', margin: '0.5%' }}>
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          borderRadius: 1.5,
          cursor: 'pointer',
          bgcolor: 'transparent',
          transition: (theme) =>
            theme.transitions.create('all', {
              duration: theme.transitions.duration.enteringScreen,
            }),
          '&:hover': {
            bgcolor: 'background.paper',
            boxShadow: (theme) => theme.shadows[5],
            h6: {
              color: 'primary.main',
            },
          },
        }}
      >
        <TextMaxLine variant="h6" line={1}>
          {t(name)}
        </TextMaxLine>
      </Paper>
    </Box>
  );
}

export default function Categories() {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        bgcolor: 'background.neutral',
        py: { xs: 10, md: 15, lg: 20 },
      }}
    >
      <Container>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={4} sx={{ textAlign: { xs: 'center', lg: 'unset' } }}>
            <Typography variant="h2">Featured Category</Typography>
            <Typography sx={{ color: 'text.secondary', mt: 2, mb: 2 }}>
              Description or subtitle here
            </Typography>
            <Button
              variant="contained"
              size="large"
              color="inherit"
              endIcon={<Iconify icon="carbon:chevron-right" />}
            >
              Explore more
            </Button>
          </Grid>
          <Grid item xs={12} lg={7}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
              {categories.map((name, index) => (
                <CategoryItem key={index} name={name} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
