import React from 'react';
import Grid from '@mui/material/Grid';
import { NextPage } from 'next';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Layout as MarketingLayout } from 'src/layouts/marketing';
import { lawyers } from 'src/api/blog/data';
import { TeamItem } from 'src/sections/dashboard/blog/team-item';

import {useTheme} from "@mui/material/styles";
const Page: NextPage = () => {
  useTheme();


  return (
    <Container
      maxWidth="xl"
      sx={{
        pt: { xs: '60px', sm: '80px', md: '120px', lg: '180px' }, // Responsive padding top
        pb: { xs: '30px', sm: '40px', md: '50px', lg: '120px' }, // Responsive padding bottom
        px: { xs: '10px', sm: '15px', md: '20px', lg: '25px' }, // Responsive padding left and right
        // You can add more responsive styles here
      }}>
      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Grid container spacing={5}>
          {lawyers.map((lawyer) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={lawyer.id}> {/* Added lg={3} for larger screens */}
              <TeamItem
                id={lawyer.id}
                name={lawyer.name}
                title={lawyer.title}
                email={lawyer.email}
                bio={lawyer.bio}
                image={lawyer.image}
                cover={lawyer.cover}

                intro={lawyer.intro}
                education={lawyer.education}
                professional={lawyer.professional}
                publications={lawyer.publications}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};
Page.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;
export default Page;
