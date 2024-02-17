import type { FC } from 'react';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Settings } from 'react-slick'; // Ensure this is correctly imported for typing
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { typography } from "src/theme/typography"; // Assuming this path is correct

export const HomeHero: FC = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const carouselSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    afterChange: (current: number) => setBackgroundIndex(current), // Correctly typed
  };

  const backgroundImages = [
    '/assets/lawfirmmain.png',
    '/assets/lawfirmwhite.jpg',
    '/assets/excelencia.jpg',
    '/assets/tradicion.jpg',
    '/assets/recepcion.jpg',
    '/assets/equipo.jpg',

  ];

  const subtitles = [
    "EXCELENCIA",
    "RESPUESTA ÁGIL Y OPORTUNA",
    "TRAYECTORIA",
    "ATENCIÓN PERSONALIZADA",
    "RESPUESTA ÁGIL Y OPORTUNA",
    "TRABAJO EN EQUIPO",
  ];

  const darkModeGradient = 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))';

  return (
    <Box
      sx={{
        display: 'flex', // Use flexbox for layout
        flexDirection: 'column', // Stack children vertically
        justifyContent: 'center', // Center children vertically
        alignItems: 'center', // Center children horizontally
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center', // Center the background image
        backgroundSize: 'cover',
        backgroundImage: `${darkModeGradient}, url(${backgroundImages[backgroundIndex]})`,
        height: '70vh',
        width: '100vw',
        '@media (max-width:600px)': {
          height: '60vh',
        },
      }}
    >
      <Container maxWidth="lg">
        <Box maxWidth="lg">
          <Slider {...carouselSettings}>
            {subtitles.map((subtitle, index) => (
              <Typography
                key={index}
                variant="h2"
                sx={{
                  color: '#fff',
                  textAlign: 'center',
                  paddingTop: '30px',
                  ...typography.h2, // Ensure your typography settings are applied correctly
                }}
              >
                {subtitle}
              </Typography>
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};
