import type { FC } from 'react';

import Box from '@mui/material/Box';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { typography, primaryFont } from "src/theme/typography";
import { useTheme } from '@mui/material/styles';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,       // Enable automatic sliding
  autoplaySpeed: 4000,
};

const subtitles = [
  "EXCELENCIA",
  "DEVIAS OP. 2",
  "RESPUESTA ÁGIL Y OPORTUNA",
  "TRAYECTORIA",
  "ATENCIÓN PERSONALIZADA",
  "RESPUESTA ÁGIL Y OPORTUNA",
  "TRABAJO EN EQUIPO",
];


export const HomeHero: FC = () => {

  const theme = useTheme();

  const lightModeImage = '/assets/lawfirmmain.png';
  const darkModeImage = '/assets/lawfirmmain.png';

  const lightModeGradient = 'linear-gradient(rgba(0, 0, 5, 0.8), rgba(0, 0, 0, 0.8))';
  const darkModeGradient = 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7))';
// Determine the background image based on the theme mode
  const backgroundImage = theme.palette.mode === 'dark' ? darkModeImage : lightModeImage;
  const backgroundGradient = theme.palette.mode === 'dark' ? darkModeGradient : lightModeGradient;


  return (
    <Box
      sx={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        backgroundSize: 'cover',
        backgroundImage: `${backgroundGradient}, url(${backgroundImage})`,
        pt: '170px',
        pb: '10px',
        height: '60vh',
        width: '100vw',
        '@media (max-width:600px)': {
          pt: '60px', // Adjust the padding-top value for mobile
          pb: '50px', // Adjust the padding-bottom value for mobile
          height: '40vh',
        }
      }}
      >
          <Container maxWidth="lg">
            <Box maxWidth="lg">
              {/* Carousel with subtitles */}
              <Slider {...carouselSettings}>
                {subtitles.map((subtitle, index) => (
                  <Typography
                    key={index}
                    variant="h2"
                    sx={{
                      color: '#fff',
                      textAlign: 'center',
                      paddingTop: '30px', // Add padding to the top
                      ...typography.h1, // Apply the h2 typography style from your import
                      // Add any additional styling here
                    }}
                  >
                    {subtitle}
                  </Typography>
                ))}
              </Slider>
            </Box>
        <Box
          sx={{
            pt: '100px',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              overflow: 'hidden',
              width: '90%',
              fontSize: 0,
              mt: -2, // hack to cut the bottom box shadow
              mx: -2,
              pt: 2,
              px: 2,
              '& img': {
                borderTopLeftRadius: (theme) => theme.shape.borderRadius * 2.5,
                borderTopRightRadius: (theme) => theme.shape.borderRadius * 2.5,
                boxShadow: 16,
                width: '100%',
              },
            }}
          >

          </Box>

        </Box>
      </Container>

    </Box>
  );
};
