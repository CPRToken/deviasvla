import React from 'react';
import { firma } from 'src/api/blog/data';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { tokens } from  'src/locales/tokens';
import { Layout as MarketingLayout } from 'src/layouts/marketing';
import Typography from '@mui/material/Typography';
import { typography, primaryFont } from "src/theme/typography";
import Grid from '@mui/material/Grid';

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



  return (
    <Container
      maxWidth="xl"
      sx={{
        pt: { xs: '60px', sm: '80px', md: '120px', lg: '180px' },
        pb: { xs: '30px', sm: '40px', md: '50px', lg: '120px' },
        px: { xs: '10px', sm: '15px', md: '20px', lg: '25px' },
        display: 'flex', // Add flex display
        flexDirection: 'column', // Stack children vertically
        alignItems: 'center', // Align items to the center
        justifyContent: 'center', // Center items along the cross axis
      }}>

        <Typography
          color="text.primary"
          sx={{
            ...typography.h2,
            fontSize: { xs: '34px', sm: '28px', md: '32px', lg: '36px' }, // Adjust font size for different screen sizes
          }}
          variant="h2">
          {}
        </Typography>



        <Typography
          color="#b98f55"
          sx={{
            ...typography.h5,

            paddingTop: '10px', // Add padding to the top
            paddingBottom: '10px', // Add padding to the bottom
          }}
          variant="body1">
          {firma.title ? renderTextWithLineBreaks(t(firma.title)) : t('defaultTitleKey')}
        </Typography>



        <Typography color="text.secondary" sx={{ ...typography.body2 }} variant="body1">
          {firma.about ? renderTextWithLineBreaks(t(firma.about)) : t('defaultEducationKey')}
        </Typography>






      {/* ... Other components ... */}
    </Container>
  );
};


Page.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;

export default Page;
