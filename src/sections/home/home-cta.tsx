import type { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'next/image';


export const HomeCta: FC = () => {
  const logoSrc = '/assets/sendero-dark.png';




  return (
    <Box
      sx={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundImage: 'linear-gradient(rgba(0, 0, 139, 0.30), rgba(0, 0, 139, 0.4)), url("/assets/parque.jpg")',
        color: 'neutral.100',
        pt: { xs: '30px', sm: '50px' },
        pb: { xs: '10px', sm: '30px' },
        height: { xs: 'auto', sm: '750px' },
        width: '100%'
      }}
    >
      <Container maxWidth="lg">
        <Box position="relative">
          <div style={{ position: 'absolute', top: '-10px', left: '-10px' }}>
            <Image src={logoSrc} alt="Sendero Logo" width={180} height={50} objectFit="contain" />
          </div>
                    <Stack spacing={2} style={{ paddingTop: '100px', paddingLeft: '40px', paddingBottom: '40px' }}>
                        <Typography
                            align="center"
                            color="inherit"
                            variant="h3"
                            style={{ paddingBottom: '20px', paddingTop: '20px' }}
                        >
          Estás planeando para el futuro?
        </Typography>
        <Typography
          align="center"
          color="inherit"
          variant="subtitle1"
          sx={{
              paddingTop: '0px',
              paddingBottom: '-20px',
              textAlign: 'left',
              fontSize: { xs: '1.4rem', sm: '1.2rem' }  // Add this line
          }}>
          Obtén un Presupuesto para un Funeral, y un Funeral Virtual.
          Consulta las opciones de precios para los servicios que necesitas.
        </Typography>
        <Typography
          align="center"
          color="inherit"
          variant="subtitle1"
          sx={{
              paddingTop: '8px',
              paddingBottom: '10px',
              textAlign: 'left',
              fontSize: { xs: '1.3rem', sm: '1.2rem' }  // Add this line
          }}>
          En la Funeraria Sendero, tienen todo lo que se necesita para un adiós inolvidable para esa persona querida.
        </Typography>
        <Typography
          align="center"
          color="inherit"
          variant="subtitle1"
          sx={{
              paddingTop: '8px',
              paddingBottom: '30px',
              textAlign: 'left',
              fontSize: { xs: '1.3rem', sm: '1.2rem' }  // Add this line
          }}>
          Funeraria Sendero, saben lo crucial que es ofrecer un servicio de primera y estar disponibles cuando más los necesitas
        </Typography>
      </Stack>
                    <Stack
                        alignItems="center"
                        direction="row"
                        justifyContent="center"
                        spacing={2}
                        sx={{ mt: { xs: 2, md: 6 }, mb: { xs: 8, md: 5 } }}
                    >
                      <Button
                        component="a"
                        href="https://www.funerariasendero.cl/"
                        target=""
                        variant="outlined"
                        sx={{
                          fontSize: { xs: '16px', sm: '18px' },
                          width: { xs: '120px', sm: '110px' },
                          padding: { xs: '10px 20px', sm: '5px 16px' },
                          borderWidth: 2,
                          fontWeight: 'bold'
                        }}
                      >
                        Visita
                      </Button>
                    </Stack>
        </Box>
      </Container>

</Box>

    );
};


