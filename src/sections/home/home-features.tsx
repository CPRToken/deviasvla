import type { FC } from 'react';
import { useState } from 'react';
import Image from 'next/image';

import Box from '@mui/material/Box';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';

import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

interface Feature {
  id: string;
  title: string;
  description: string;
  imageDark: string;
  imageLight: string;
}

const features: Feature[] = [
  {
    id: 'experts',
    title: 'Cuenta tu historia',
    description:
      "Tu estas en control de tu cuento y lo que deceas compartir.",
    imageDark: '/assets/home-features-experts-dark.png',
    imageLight: '/assets/home-features-experts-light.png',
  },
  {
    id: 'figma',
    title: 'Diseña tu perfil',
    description:
      "¡Diseña tu propio perfil a tu gusto! Tú eliges qué información quieres compartir y qué prefieres mantener en privado. Aquí, tú tienes el control..",
    imageDark: '',
    imageLight: '/assets/home-features-figma-light.png',
  },
  {
    id: 'tech',
    title: 'Construido con tecnologías modernas,',
    description:
      'Construido con tecnologías modernas, hemos utilizado las últimas tendencias en desarrollo web para asegurar rapidez, elegancia y escalabilidad',
    imageDark: '',
    imageLight: '/assets/home-features-tech-light.png',
  },

];

export const HomeFeatures: FC = () => {
  const theme = useTheme();
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const feature = features[activeFeature];
  const image = theme.palette.mode === 'dark' ? feature?.imageDark : feature?.imageLight;

  return (
    <Box
      sx={{
        backgroundColor: 'neutral.800',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        backgroundImage: 'url("/assets/gradient-bg.svg")',
        color: 'common.white',
        py: '120px',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={2}
          sx={{ mb: 8 }}
        >
          <Typography
            align="center"
            color="inherit"
            variant="h3"
          >
            Cómo funciona?
          </Typography>
          <Typography
            align="center"
            color="inherit"
            variant="subtitle2"
          >
            Not just a set of tools, the package includes ready-to-deploy conceptual application.
          </Typography>
        </Stack>
        <Grid
          alignItems="center"
          container
          spacing={3}
        >
          <Grid
            xs={12}
            md={6}
          >
            <Stack spacing={1}>
              {features.map((feature, index) => {
                const isActive = activeFeature === index;

                return (
                  <Box
                    key={feature.id}
                    onClick={() => setActiveFeature(index)}
                    sx={{
                      borderRadius: 2.5,
                      color: 'neutral.400',
                      cursor: 'pointer',
                      p: 3,
                      transition: (theme) =>
                        theme.transitions.create(['background-color, box-shadow', 'color'], {
                          easing: theme.transitions.easing.easeOut,
                          duration: theme.transitions.duration.enteringScreen,
                        }),
                      ...(isActive && {
                        backgroundColor: 'primary.alpha12',
                        boxShadow: (theme) => `${theme.palette.primary.main} 0 0 0 1px`,
                        color: 'common.white',
                      }),
                      '&:hover': {
                        ...(!isActive && {
                          backgroundColor: 'primary.alpha4',
                          boxShadow: (theme) => `${theme.palette.primary.main} 0 0 0 1px`,
                          color: 'common.white',
                        }),
                      },
                    }}
                  >
                    <Typography
                      color="inherit"
                      sx={{ mb: 1 }}
                      variant="h6"
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      color="inherit"
                      variant="body2"
                    >
                      {feature.description}
                    </Typography>
                    {feature.id === 'figma' && (
                      <Box sx={{ mt: 3 }}>

                      </Box>
                    )}
                  </Box>
                );
              })}
            </Stack>
          </Grid>
          <Grid
            xs={12}
            md={6}
          >
            <Box
                sx={{
                  '& img': {
                    width: '100%',
                  },
                }}
            >
              <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
                <Image
                    src={image}
                    layout="fill"
                    objectFit="contain"
                    alt="Description for the image" // Add an appropriate description
                />
              </div>
            </Box>

          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
