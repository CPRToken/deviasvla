import type { FC } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { typography, secondaryFont } from "src/theme/typography";

import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';

interface Section {
  title: string;
  items: {
    external?: boolean;
    title: string;
    path: string;
  }[];
}

const sections: Section[] = [

  {
    title: 'Contacto',
    items: [
      {
        title: 'contacto@vla.cl',
        path: 'mailto:contacto@vla.cl',
      },
      {
        title: '(56-2) 28877200',
        path: 'tel:+56228877200',
      },

    ],
  },
  {
    title: 'DIRECCIÓN',
    items: [

      {
        title: 'Cerro El Plomo 5630, of. 1601. Las Condes, Santiago',
        path: 'https://www.google.com/maps/place/Las+Condes+Santiago,+Chile/@-33.4057068,-70.5767909,17z/data=!3m1!4b1!4m6!3m5!1s0x9662cf63985a0c5d:0x428533b5ba9cfe8e!8m2!3d-33.4057113!4d-70.574216!16s%2Fg%2F1td501m7?entry=ttu',
      },
    ],
  },
];

export const Footer: FC = (props) => (
  <Box
    sx={{
      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'neutral.900' : 'neutral.50'),
      borderTopColor: 'divider',
      borderTopStyle: 'solid',
      borderTopWidth: 1,
      pb: 3,
      pt: {
        md: 12,
        xs: 6,
      },
    }}
    {...props}
  >
    <Container maxWidth="lg">
      <Grid
        container
        spacing={3}
      >
        <Grid
          xs={12}
          sm={4}
          md={3}
          sx={{
            order: {
              xs: 4,
              md: 1,
            },
          }}
        >
          <Stack spacing={1}>
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
                sx={{
                  color: 'text.primary',
                  fontFamily: secondaryFont.style.fontFamily,
                  fontSize: 18,
                  fontWeight: 800,
                  letterSpacing: '0.3px',
                  lineHeight: 2.5,
                  '& span': {
                    color: 'primary.main',
                  },
                }}
              >

              </Box>
            </Stack>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              ©   Villarroel, Lecaros y Aste
            </Typography>
          </Stack>
        </Grid>
        {sections.map((section, index) => (
          <Grid
            key={section.title}
            xs={12}
            sm={4}
            md={3}
            sx={{
              order: {
                md: index + 2,
                xs: index + 1,
              },
            }}
          >
            <Typography
              color="text.secondary"
              variant="overline"
            >
              {section.title}
            </Typography>
            <Stack
              component="ul"
              spacing={1}
              sx={{
                listStyle: 'none',
                m: 0,
                p: 0,
              }}
            >
              {section.items.map((item) => {
                const linkProps = item.path
                  ? item.external
                    ? {
                        component: 'a',
                        href: item.path,
                        target: '_blank',
                      }
                    : {
                        component: RouterLink,
                        href: item.path,
                      }
                  : {};

                return (
                  <Stack
                    alignItems="center"
                    direction="row"
                    key={item.title}
                    spacing={2}
                  >
                    <Box
                      sx={{
                        backgroundColor: 'primary.main',
                        height: 2,
                        width: 12,
                      }}
                    />
                    <Link
                      color="text.primary"
                      variant="subtitle2"
                      {...linkProps}
                    >
                      {item.title}
                    </Link>
                  </Stack>
                );
              })}
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ my: 6 }} />
      <Typography
        color="text.secondary"
        variant="caption"
      >
        All Rights Reserved.
      </Typography>
    </Container>
  </Box>
);
