import type { FC } from 'react';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import CreditCard01Icon from '@untitled-ui/icons-react/build/esm/CreditCard01';
import Settings04Icon from '@untitled-ui/icons-react/build/esm/Settings04';
import User03Icon from '@untitled-ui/icons-react/build/esm/User03';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import {t} from "i18next";
import { RouterLink } from 'src/components/router-link';
import {socialApi} from "../../../api/social/socialApi";
import React, { useState, useEffect } from 'react';
import { Profile } from "../../../types/social";
import { useRouter } from 'src/hooks/use-router';
import { paths } from 'src/paths';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {tokens} from "src/locales/tokens";


interface AccountPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
  name?: string;
  email?: string;

}

export const AccountPopover: FC<AccountPopoverProps> = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const router = useRouter();
  const auth = getAuth();
  const [user, setUser] = useState<Profile | null>(null);



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;


        try {
          const response = await socialApi.getProfile({ uid });

          setUser(response);
        } catch (err) {
          console.error("Error fetching profile data:", err);
        }
      } else {
        // Optionally handle the case when no user is signed in.
        setUser(null);  // for example, reset the profile to null.
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);



  const handleLogout = useCallback(async (): Promise<void> => {
    try {
      onClose?.();

      await auth.signOut();
      router.push(paths.index);

    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  }, [auth, router, onClose]);



  return (
      <Popover
          anchorEl={anchorEl}
          anchorOrigin={{
            horizontal: 'center',
            vertical: 'bottom',
          }}
          disableScrollLock
          onClose={onClose}
          open={!!open}
          PaperProps={{
            sx: {
              width: {
                xs: '250px', // Width for small screens
                md: '250px', // Width for medium and up
              },
            }
          }}
          {...other}
      >
        <Box sx={{ p: 2 }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: {
                xs: '21px',  // For small screens
                md: '17px'  // For medium and up
              }
            }}
          >
            {user?.name}
          </Typography>

          <Typography
              color="text.secondary"
              variant="body2"
              sx={{
                fontSize: {
                  xs: '18px', // For phones or small screens
                  sm: '15px', // For larger screens
                  // Add more breakpoints as needed
                },
              }}
          >
            {user?.email}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 1 }}>
          <ListItemButton
              component={RouterLink}
              href={paths.dashboard.account}
              onClick={onClose}
              sx={{
                borderRadius: 1,
                px: 1,
                py: 0.5,
              }}
          >
            <ListItemIcon>
              <SvgIcon fontSize="small">
                <User03Icon />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1" sx={{fontSize: { xs: '21px', md: '16px' }}}>{t('nav.profile')}</Typography>} />
          </ListItemButton>
          <ListItemButton
              component={RouterLink}
              href={'/profile/[UserUrl].tsx'}
              onClick={onClose}
              sx={{
                borderRadius: 1,
                px: 1,
                py: 0.5,
              }}
          >
            <ListItemIcon>
              <SvgIcon fontSize="small">
                <Settings04Icon />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1" sx={{fontSize: { xs: '21px', md: '16px' }}}>{t('nav.settings')}</Typography>} />
          </ListItemButton>
          <ListItemButton
              component={RouterLink}
              href={paths.dashboard.index}
              onClick={onClose}
              sx={{
                borderRadius: 1,
                px: 1,
                py: 0.5,
              }}
          >
            <ListItemIcon>
              <SvgIcon fontSize="small">
                <CreditCard01Icon />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText primary={

              <Typography
                variant="body1"
                sx={{
                  fontSize: {
                    xs: '21px', // For phones or small screens
                    sm: '16px', // For larger screens
                    // Add more breakpoints as needed
                  },
                }}
              >
                {t('nav.billing')}
              </Typography>
            } />
          </ListItemButton>
        </Box>
        <Divider sx={{ my: '0 !important' }} />
        <Box
            sx={{
              display: 'flex',
              p: 1,
              justifyContent: 'center',
            }}
        >
          <Button
            color="inherit"
            onClick={handleLogout}
            size="large"
            sx={{
              fontSize: {
                xs: '21px',  // For small screens
                md: '15px'  // For medium and up
              }
            }}
          >
            {t(tokens.headings.logout)}
          </Button>

        </Box>
      </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  email: PropTypes.string,
  name: PropTypes.string,

};
