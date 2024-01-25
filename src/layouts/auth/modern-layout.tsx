import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Head from 'next/head';


import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;

  return (

    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: {
          xs: 'column-reverse',
          md: 'row',
        },
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'neutral.800',
            backgroundImage: `
            linear-gradient(rgba(5, 5, 40, 0.20), rgba(5, 5, 40, 0.50))
,
            linear-gradient(rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.05)),
            url("/assets/sky.png")`,
          // The linear gradient adds a bluish overlay with 50% opacity
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover', // this makes it cover the entire box
          color: 'common.white',
          display: 'flex',
          flex: {
            xs: '0 0 auto',
            md: '1 1 auto',
          },
          justifyContent: 'center',
          p: {
            xs: 4,
            md: 8,
          },
        }}
      >
        <Box maxWidth="md">
            <Box
                sx={{
                    '& img': {
                        maxWidth: '300px', // For PC/Laptops
                        marginBottom: '1rem',
                        '@media (max-width: 600px)': {
                            maxWidth: '200px', // For mobile
                        },
                    },
                }}
            >
                <img
                    src="/assets/VLALOGO7.svg"
                    alt="VLA Logo"
                />
            </Box>



            <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            gap={4}
            sx={{
              color: 'text.primary',
              '& > *': {
                color: 'neutral.400',
                flex: '0 0 auto',
              },
            }}
          >

          </Stack>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: 'background.paper',
          display: 'flex',
          flex: {
            xs: '1 1 auto',
            md: '0 0 auto',
          },
          flexDirection: 'column',
          justifyContent: {
            md: 'center',
          },
          maxWidth: '100%',
          p: {
            xs: 4,
            md: 8,
          },
          width: {
           xs: 690,
            md: 650,
          },
        }}
      >
        <div>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>




            <Stack
              alignItems="center"
              component={RouterLink}

              direction="row"
              display="inline-flex"
              href={paths.index}
              spacing={1}
              sx={{ textDecoration: 'none' }}
            >
              <Box
                component="img"
                src="/assets/logos/logo.svg"
                sx={{
                  display: 'inline-flex',
                  height: 40,
                  width: 40,
                }}
              />

              <Box
                sx={{
                  color: 'text.primary',
                  fontFamily: "inherit",
                 fontSize: { xs: 25, md: 27 },
                  fontWeight: { xs: 450, md: 500 },  // Lighter weight for mobile, bolder for PC
                  letterSpacing: '0.4px',
                  lineHeight: 2.5,
                  '& span': {
                    color: 'primary.main',
                  },
                }}
              >
                Villarroel,  <span>Lecaros y Aste </span>
              </Box>
            </Stack>
          </Box>
          {children}
        </div>
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
