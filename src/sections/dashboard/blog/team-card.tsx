import type { FC } from 'react';
import PropTypes from 'prop-types';
import type { SxProps } from '@mui/system';
import {lawyers} from 'src/api/blog/data';
import Card from '@mui/material/Card';
import { useTranslation } from 'react-i18next'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { typography, primaryFont } from "src/theme/typography";
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { RouterLink } from 'src/components/router-link';


interface TeamCardProps {
  id: string;
  name: string;
  title?: string;
  email?: string;
  bio?: string;
userUrl?: string;
  cover?: string;
  image?: string;
  intro?: string;
  education?: string;
  professional?: string;
  publications?: string;

  sx?: SxProps;
}



export const TeamCard: FC<TeamCardProps> = ({
                                              id,
                                              name,
                                              title,
                                              email,
                                              bio,
                                              image,
                                               cover,
                                 intro,
                           education,
      professional,
      publications,




                                              ...other
                                            }) => {
  const { t } = useTranslation();
  const post = lawyers.find((post) => post.id === id);

  if (!post) {
    // Handle the case where no matching post is found
    return null;
  }

  const { userUrl } = post;

  return (
    <Card {...other}>
      <CardMedia
        component={RouterLink}
        href={`/${userUrl}`}
        image={image}
        sx={{ height: 250 }}
      />
      <CardContent>
        <Typography variant="h4" sx={{ ...typography.h4 }}>
          <Link component={RouterLink} href={`/${userUrl}`}>
            {post.name ? t(post.name) : t('defaultTitleKey')}
          </Link>
        </Typography>


        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          spacing={1}
          sx={{ mt: 0 }}
        >
          <Typography variant="h6" sx={{ ...typography.h6 }}>

              {post.title ? t(post.title) : t('defaultTitleKey')}

          </Typography>
        </Stack>
          <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            spacing={1}
            sx={{ mt: 0 }}
          >
          <Typography
            color="text.secondary"
            sx={{
              ...typography.body2, // Apply the body1 typography style
              height: 22,
              mt: 0,
              mb: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
            }}
            variant="body2"
          >
            Email: {email}
          </Typography>
        </Stack>

      </CardContent>
    </Card>
  );
};

TeamCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  userUrl: PropTypes.string.isRequired,
  intro: PropTypes.string,
  education: PropTypes.string,
  professional: PropTypes.string,
  publications: PropTypes.string,
  cover: PropTypes.string,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  sx: PropTypes.any,
};
