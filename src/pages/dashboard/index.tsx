import React, {useEffect, useState} from "react";
import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import SvgColor from "src/components/svg-color";
import {socialApi} from "src/api/social/socialApi";
import Typography from '@mui/material/Typography';
import {typography } from "src/theme/typography";
import { useRouter } from 'next/router';
import { useTranslation } from "react-i18next";
import {useTheme} from "@mui/material/styles";

import Paper from '@mui/material/Paper';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';

import { paths } from 'src/paths';
import {tokens} from "../../locales/tokens";
import type {Profile} from "../../types/social";
import {auth} from "../../libs/firebase"; // Ensure paths are correctly imported



type ModuleItem = {
  name: string;
  path: string;
  icon: string;
  about: string;
};

const Page: NextPage = () => {
  const uid = auth.currentUser?.uid;
  const [user, setUser] = useState<Profile | null>(null);
  const { t } = useTranslation();

  useTheme();

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


      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [uid]);






  // Additional areas

  return (
    <Container sx={{ py: { xs: 5, md: 10, lg: 17 } }}>



      <Box
        sx={{
          gap: { xs: 3, sm: 3, md: 2, lg: 2 }, // Adjusts gap size based on the screen width
          paddingLeft: { xs: 1, sm: 1, md: 2, lg: 3 },
          paddingRight: { xs: 1, sm: 1, md: 2, lg: 3 },
          mt: { xs: 1, sm: 2, md: 2, lg: 3 }, // Responsive top margin
          mb: { xs: 1, sm: 2, md: 2, lg: 3 }, // Responsive bottom margin
          display: 'grid',
          my: { xs: 6, md: 12 },
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
        }}
      >

      </Box>
    </Container>
  );
}

type ModuleItemProps = {
  module: ModuleItem;
};

const ModuleItem = ({ module }: ModuleItemProps) => {
  const router = useRouter();
  const theme = useTheme();
  const [hovered, setHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Paper
      onClick={() => router.push(module.path)}
      variant="outlined"
      sx={{
        pt: '80%',
        width: '100%', // Makes the Paper component fill the width of its container
        minHeight: '100px',
        borderRadius: 2,
        cursor: 'pointer',
        textAlign: 'center',
        position: 'relative',
        bgcolor: hovered ? 'background.paper' : 'transparent', // Change background color on hover
        transition: theme.transitions.create('all'),
        '&:hover': {
          bgcolor: 'background.paper', // Change background color on hover
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          width: 1,
          height: 1,
          top: 0,
          position: 'absolute',
        }}
      >
        <Box
          className="svg-color"
          sx={{
            mb: 1,
            mt: 0,
            width: 50,
            height: 50,
            mx: 'auto',
            display: 'flex',
            borderRadius: '50%',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 1, sm: 0 }, // Adds padding on xs screens, none on sm and above
          }}
        >
          <SvgColor
            src={module.icon}
            color={hovered ? theme.palette.primary.main : 'info'} // Change icon color on hover to primary color
            sx={{
              width: 50,
              height: 50,
              mt: { xs: 1, sm: 0 }, // Adds padding on xs screens, none on sm and above
            }}
          />
        </Box>

        <Typography sx={{ ...typography.subtitle1, color: 'text.primary', mt: 0, mb: 2 }}>
          {module.name}
        </Typography>

        <Typography sx={{ ...typography.subtitle2,
          color: 'text.secondary',
          mt: { xs: 0, sm: 0 }, // Adds top margin on xs screens
          mb: { xs: 1, sm: 0 }, // Adds bottom margin on xs screens
          pl: { xs: 1, sm: 0 },
          pr: { xs: 1, sm: 0 },
        }}>
          {module.about}
        </Typography>
      </Stack>
    </Paper>
  );
}


Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
