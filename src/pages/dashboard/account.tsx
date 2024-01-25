import type { ChangeEvent } from 'react';
import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { Seo } from 'src/components/seo';

import { useCallback, useState, useEffect } from 'react';
import {socialApi} from "src/api/social/socialApi";


import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';

import { AccountGeneralSettings } from 'src/sections/dashboard/account/account-general-settings';
import { AccountNotificationsSettings } from 'src/sections/dashboard/account/account-notifications-settings';
import { AccountTeamSettings } from 'src/sections/dashboard/account/account-team-settings';
import { AccountSecuritySettings } from 'src/sections/dashboard/account/account-security-settings';
import type { Profile } from 'src/types/social';
import {auth} from "../../libs/firebase";
import {tokens} from "../../locales/tokens";
import {useTranslation} from "react-i18next";
new Date();
const tabs = [
  { label: 'General', value: 'general' },

  { label: 'Equipo', value: 'team' },

  { label: 'Seguridad', value: 'security' },
];

const Page: NextPage = () => {
    const [uid] = useState<string | null>(auth.currentUser ? auth.currentUser.uid : null);
    const [user, setUser] = useState<Profile | null>(null);

    const [, setAvatarUrl] = useState<string | null>(null);
    const [currentTab, setCurrentTab] = useState<string>('general');

    const { t } = useTranslation();

    useEffect(() => {
        if (!uid) return; // Exit if uid is null

        const fetchUserData = async () => {
            try {
                const userData = await socialApi.getProfile({ uid });

                if (!userData) {
                    console.error("User data not found");
                    return;
                }

                setUser(userData);          // Use userData instead of fetchedUser
                setAvatarUrl(userData.avatar || null);

            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [uid]);




  usePageView();


  const handleTabsChange = useCallback((event: ChangeEvent<any>, value: string): void => {
    setCurrentTab(value);
  }, []);


  return (
    <>
      <Seo title="Dashboard: Account" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack
            spacing={3}
            sx={{ mb: 3 }}
          >
              <Typography variant="h4">{t(tokens.nav.account)}</Typography>
            <div>
              <Tabs
                indicatorColor="primary"
                onChange={handleTabsChange}
                scrollButtons="auto"
                textColor="primary"
                value={currentTab}
                variant="scrollable"
              >
                {tabs.map((tab) => (
                  <Tab
                    key={tab.value}
                    label={tab.label}
                    value={tab.value}
                  />
                ))}
              </Tabs>
              <Divider />
            </div>
          </Stack>
          {currentTab === 'general' && user && (
            <AccountGeneralSettings
              avatar={user.avatar || ''}
              email={user.email || ''}
              name={user.name || ''}
              dob={user.dob || ''}
              maritalStatus={user.maritalStatus || ''}
               quote={user.quote || ''}
              university={user.university || ''}
            />
          )}

            {currentTab === 'team' &&(
                <AccountTeamSettings
                    members={[


                ]}


                     />
            )}




            {currentTab === 'notifications' && <AccountNotificationsSettings />}
          {currentTab === 'security' && (
            <AccountSecuritySettings
              loginEvents={[

              ]}
            />
          )}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
