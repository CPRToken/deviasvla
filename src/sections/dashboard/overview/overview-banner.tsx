import type { FC } from 'react';
import PropTypes from 'prop-types';
import Settings04Icon from '@untitled-ui/icons-react/build/esm/Settings04';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { tokens } from 'src/locales/tokens';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { useSettings } from 'src/hooks/use-settings';
import Image from 'next/image';

export const OverviewBanner: FC = (props) => {
  const { handleDrawerOpen } = useSettings();

  const  { t } = useTranslation();

    const theme = useTheme();

  return (
    <Stack
      alignItems="center"
      direction={{
        xs: 'column',
        md: 'row',
      }}
      spacing={4}
      sx={(theme) => ({
        background: `
      linear-gradient(${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.12)'},
      ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.01)' : 'rgba(255, 255, 255, 0.21)'}),
      url('${theme.palette.mode === 'dark' ? '/assets/dash-dark.png' : '/assets/dash-light.png'}')
    `,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.darkest : theme.palette.primary.lightest,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 2.5,
        p: 4,
      })}
      {...props}
    >
        <Box
            sx={{
                width: 200,
            }}
        >
            <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
                <Image
                    src={theme.palette.mode === 'dark' ? "/assets/person-standing-dark.png" : "/assets/person-standing.png"}
                    layout="fill"
                    objectFit="contain"
                    alt="Person Standing"
                />
            </div>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
        <Typography
          color="primary.main"
          sx={{ mt: 3, fontSize: '1.2rem' }}
          variant="h3"
        >
            {t(tokens.headings.newUpdateAvailable)}
        </Typography>

          <Typography
              color="text.primary"
              sx={{ mt: 1, fontSize: '1rem' }}  // Adjust the fontSize here
              variant="body1"
        >
            {t(tokens.headings.favoriteTemplateUpdate)}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            color="primary"
            onClick={handleDrawerOpen}
            startIcon={
              <SvgIcon>
                <Settings04Icon />
              </SvgIcon>
            }
            variant="contained"
          >
              {t(tokens.headings.openAppSettings)}
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

OverviewBanner.propTypes = {
  onDismiss: PropTypes.func,
};
