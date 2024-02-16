import type { NextPage } from 'next';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import Mail01Icon from '@untitled-ui/icons-react/build/esm/Mail01';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import {contact, firma} from 'src/api/blog/data';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import { Layout as MarketingLayout } from 'src/layouts/marketing';
import Typography from '@mui/material/Typography';
import { typography, primaryFont } from "src/theme/typography";
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { paths } from 'src/paths';
import { ContactForm } from 'src/sections/contact/contact-form';
import React from "react";




const Page: NextPage = () => {
  useTheme();
  const { t } = useTranslation();
  usePageView();

  return (
    <>
      <Seo title="Contact" />
      <Box
        component="main"
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            lg: 'repeat(2, 1fr)',
            xs: 'repeat(1, 1fr)',
          },
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.50',
            py: 8,
          }}
        >
          <Container
            maxWidth="md"
            sx={{ pl: { lg: 15 } }}
          >
            <Stack spacing={3}>
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.index}
                  sx={{
                    alignItems: 'center',
                    display: 'inline-flex',
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">Home</Typography>
                </Link>
              </div>
              <Typography
                color="#b98f55"
                sx={{
                  ...typography.h2,

                  paddingTop: '10px', // Add padding to the top
                  paddingBottom: '30px', // Add padding to the bottom
                }}
                variant="body1">
                {contact.title ? (t(contact.title)) : t('defaultTitleKey')}
              </Typography>
            </Stack>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{
                mb: 6,
                mt: 8,
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                }}
                variant="rounded"
              >
                <SvgIcon>
                  <Mail01Icon />
                </SvgIcon>
              </Avatar>

            </Stack>

            <Typography color="text.secondary" sx={{ ...typography.body1 }} variant="body1">
              {contact.question ? (t(contact.question)) : t('defaultEducationKey')}
            </Typography>

            <Stack
              alignItems="center"
              direction="row"
              flexWrap="wrap"
              gap={4}
              sx={{
                color: 'text.primary',
                '& > *': {
                  flex: '0 0 auto',
                },
              }}
            >

            </Stack>
          </Container>
        </Box>
        <Box
          sx={{
            backgroundColor: 'background.paper',
            px: 6,
            py: 15,
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              pr: {
                lg: 15,
              },
            }}
          >
            <Typography
              sx={{ pb: 3 }}
              variant="h6"
            >
              Fill the form below
            </Typography>
            <ContactForm />
          </Container>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;

export default Page;
