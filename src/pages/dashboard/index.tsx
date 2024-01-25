import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { OverviewBanner } from 'src/sections/dashboard/overview/overview-banner';
import ScheduledEmails, { Schedule } from './scheduled-emails';


import { StorageStats } from 'src/sections/dashboard/file-manager/storage-stats';



import { OverviewTips } from 'src/sections/dashboard/overview/overview-tips';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from 'src/libs/firebase';
import {useTranslation} from "react-i18next";
import {tokens} from "src/locales/tokens";



const Page: NextPage = () => {
  const settings = useSettings();
    const [schedules, setSchedules] = useState<Schedule[]>([]);


    useEffect(() => {
        const fetchSchedules = async () => {
            const user = auth.currentUser;
            if (user) {
                const uid = user.uid;
                const querySnapshot = await getDocs(query(collection(db, 'schedules'), where('uid', '==', uid)));
                setSchedules(querySnapshot.docs.map((doc) => { return { id: doc.id, ...doc.data() } as Schedule;  }));
            }
        };

        (async () => {
            try {
                await fetchSchedules();
            } catch (error) {
                console.error("Failed to fetch schedules:", error);
            }
        })();
    }, []);

  const { t } = useTranslation();



  usePageView();

  return (
    <>
      <Seo title="Dashboard: Overview" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            disableEqualOverflow
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                    <Typography variant="h5">{t(tokens.nav.overview)}</Typography>

                </div>
                <div>
                  <Stack
                    direction="row"
                    spacing={4}
                  >

                  </Stack>
                </div>
              </Stack>
            </Grid>
            <Grid
              xs={12}
              md={4}
            >


            </Grid>
            <Grid
              xs={12}
              md={4}
            >

            </Grid>
            <Grid
              xs={12}
              md={7}
            >
              <OverviewBanner />
            </Grid>
            <Grid
              xs={12}
              md={5}
            >
              <OverviewTips
                sx={{ height: '100%' }}
                tips={[
                  {
                    title: 'Need help?',
                    content:
                      'Pregunta a Jaime',
                  },
                  {
                    title: 'Tip 2.',
                    content: 'Tip content',
                  },
                  {
                    title: 'Tip 3.',
                    content: 'Tip content',
                  },
                ]}
              />
            </Grid>
              <Grid
                  xs={12}
                  md={7}
              >
                  <ScheduledEmails schedules={schedules} />




              </Grid>
              <Grid
                  xs={12}
                  md={5}
              >
                  <StorageStats />
              </Grid>



            <Grid xs={6}>

            </Grid>
            <Grid xs={6}>

            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
