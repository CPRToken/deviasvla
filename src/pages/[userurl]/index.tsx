import React from 'react';
import { lawyers } from 'src/api/blog/data';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { tokens } from  'src/locales/tokens';
import { Layout as MarketingLayout } from 'src/layouts/marketing';
import Typography from '@mui/material/Typography';
import { typography, primaryFont } from "src/theme/typography";

import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'



const renderTextWithLineBreaks = (text: string) => {
  return text.split('\n').map((line: string, index: number) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
};




const Page: NextPage = () => {
  useTheme();


const { t } = useTranslation();
  const router = useRouter();
  const { userurl } = router.query;


  const lawyer = lawyers.find(l => l.userurl === userurl);

  if (!lawyer) {
    return <div>Lawyer not found</div>;
  }


  return (
    <Container
      maxWidth="xl"
      sx={{
        pt: { xs: '60px', sm: '80px', md: '120px', lg: '140px' }, // Responsive padding top
        pb: { xs: '30px', sm: '40px', md: '50px', lg: '120px' }, // Responsive padding bottom
        px: { xs: '10px', sm: '15px', md: '20px', lg: '25px' }, // Responsive padding left and right
        // You can add more responsive styles here
      }}>
      <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
        <Box
          component="img"
          src={lawyer.image}
          alt={lawyer.title}
          sx={{
            float: 'left',
            borderRadius: '20px',
            marginRight: '20px',
            marginTop: '20px',
            marginBottom: '20px',
            width: 500, // Adjust the width as needed
            height: '100%', // Adjust the height as needed
            maxWidth: '100%',
            objectFit: 'cover',

            paddingLeft: '10px', // Added left padding
            paddingRight: '10px', // Added right padding
            '@media (max-width:600px)': {
              pt: '20px',
              pb: '20px',
               height: '50vh',
              width: '100%',
              borderRadius: '30px',

            }
          }}
        />
            <Typography
              color="text.primary"
              sx={{
                ...typography.h3,
                fontSize: { xs: '34px', sm: '28px', md: '30px', lg: '32px' }, // Adjust font size for different screen sizes
              }}
              variant="h2">
              {lawyer.name}
            </Typography>



            <Typography
              color="#b98f55"
              sx={{
                ...typography.h5,

                paddingTop: '10px', // Add padding to the top
                paddingBottom: '10px', // Add padding to the bottom
              }}
              variant="body1">
              {lawyer.title ? renderTextWithLineBreaks(t(lawyer.title)) : t('defaultTitleKey')}
            </Typography>

        <Typography color="text.primary" sx={{ ...typography.h4 }} paddingBottom={2}  variant="body1">
          {t(tokens.form.education)}
        </Typography>

            <Typography color="text.secondary" sx={{ ...typography.body2 }} variant="body1">
              {lawyer.education ? renderTextWithLineBreaks(t(lawyer.education)) : t('defaultEducationKey')}
            </Typography>

            <Typography color="text.secondary" sx={{ ...typography.body2 }} variant="body1">
              {lawyer.experience ? renderTextWithLineBreaks(t(lawyer.experience)) : t('defaultEducationKey')}
            </Typography>
            <Typography color="text.secondary" sx={{ ...typography.body2 }} paddingBottom={2} variant="body1">
              {lawyer.professional ? renderTextWithLineBreaks(t(lawyer.professional)) : t('defaultEducationKey')}
            </Typography>


          <Typography color="text.secondary" sx={{ ...typography.body2 }} variant="body1">
            {lawyer.publications ? renderTextWithLineBreaks(t(lawyer.publications)) : t('defaultEducationKey')}
          </Typography>

        <Typography color="text.secondary" sx={{ ...typography.body2 }} paddingBottom={2} variant="body1">
          {lawyer.languages ? renderTextWithLineBreaks(t(lawyer.languages)) : t('defaultEducationKey')}
        </Typography>


            <Typography
              color="text.primary"
              sx={{
                ...typography.body1,
              }}
              variant="body1">
              Email: {lawyer.email}
            </Typography>


      </Paper>
      {/* ... Other components ... */}
    </Container>
  );
};


Page.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;

export default Page;
