import type { FC } from 'react';
import PropTypes from 'prop-types';
import BookOpen01Icon from '@untitled-ui/icons-react/build/esm/BookOpen01';
import Briefcase01Icon from '@untitled-ui/icons-react/build/esm/Briefcase01';
import Home02Icon from '@untitled-ui/icons-react/build/esm/Home02';
import Mail01Icon from '@untitled-ui/icons-react/build/esm/Mail01';

import { useTranslation } from 'react-i18next';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

interface SocialAboutProps {


  email: string;
  gender?: string;
  maritalStatus?: string;
   originCity?: string,
  highSchool?: string;
  university?: string;
  currentCity?: string;
   placesWorked?: string;
  quote?: string;
}

export const SocialAbout: FC<SocialAboutProps> = (props) => {
  const {

    email,
    gender,
    maritalStatus,
    originCity,
    highSchool,
    university,
    currentCity,
   placesWorked,
    quote,
    ...other
  } = props;


    const { t } = useTranslation();


  return (
      <Stack
          spacing={3}
          {...other}
      >

        <Card>
          <CardHeader
              title={t('headings.citaFavorita')}
              titleTypographyProps={{ variant: 'h6',   style: { fontSize: '13px' } }}
              style={{ paddingBottom: '0px' }}  // Add this line
          />

          <CardContent>

            <Typography
                color="text.primary"
                sx={{ mb: 2 }}
                variant="body2"
            >

              {quote}

            </Typography>
            <List disablePadding>
              <ListItem
                  disableGutters
                  divider
              >
                <ListItemAvatar>
                  <SvgIcon color="action">

                  </SvgIcon>
                </ListItemAvatar>
                <ListItemText
                    primary={
                      <Link
                          color="text.primary"
                          sx={{ cursor: 'pointer' }}
                          variant="body2"
                      >


                      </Link>
                    }
                />
              </ListItem>
              <ListItem
                  disableGutters
                  divider
              >
                <ListItemAvatar>
                  <SvgIcon color="action">
                    <Briefcase01Icon />
                  </SvgIcon>
                </ListItemAvatar>
                <ListItemText
                    disableTypography
                    primary={

                      <Typography variant="subtitle2">
                        Lugares donde trabajé: <br />
                        {placesWorked}
                        <Link
                            color="text.primary"
                            href="#"
                            variant="subtitle2"
                        >
                          {}
                        </Link>
                      </Typography>
                    }
                    secondary={
                      <Typography
                          color="text.primary"
                          variant="subtitle2"
                      >

                        <Link
                            color="text.secondary"
                            href="#"
                            variant="body2"
                        >
                          {}
                        </Link>
                      </Typography>
                    }
                />
              </ListItem>

              <ListItem
                  disableGutters
                  divider
              >
                <ListItemAvatar>
                  <SvgIcon color="action">
                    <BookOpen01Icon />
                  </SvgIcon>
                </ListItemAvatar>
                <ListItemText
                    primary={
                      <Link
                          color="text.secondary"
                          sx={{ cursor: 'pointer' }}
                          variant="body2"
                      >
                        Escuelas:  <br />
                        Liceo: {highSchool} <br />
                        Universidad:  {university}
                      </Link>
                    }
                />
              </ListItem>
              <ListItem
                  disableGutters
                  divider
              >
                <ListItemAvatar>
                  <SvgIcon color="action">
                    <Home02Icon />
                  </SvgIcon>
                </ListItemAvatar>
                <ListItemText
                    disableTypography
                    primary={
                      <Typography variant="subtitle2">
                        Lives in{' '}
                        <Link
                            color="text.primary"
                            href="#"
                            variant="subtitle2"
                        >
                          {gender}
                        </Link>
                      </Typography>
                    }
                    secondary={
                      <Typography
                          color="text.secondary"
                          variant="body2"
                      >
                        Originally from{' '}
                        <Link
                            color="text.secondary"
                            href="#"
                            variant="body2"
                        >
                          {originCity}
                        </Link>
                      </Typography>
                    }
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemAvatar>
                  <SvgIcon color="action">
                    <Mail01Icon />
                  </SvgIcon>
                </ListItemAvatar>
                <ListItemText primary={<Typography variant="subtitle2">{email}</Typography>} />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Stack>
  );
};

SocialAbout.propTypes = {

    gender: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  originCity: PropTypes.string.isRequired,
   maritalStatus: PropTypes.string,
   placesWorked: PropTypes.string.isRequired,
  highSchool: PropTypes.string.isRequired,
  university: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,

};
