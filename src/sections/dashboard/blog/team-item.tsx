import { FC, useState } from 'react';
import PropTypes from 'prop-types';
import type { SxProps } from '@mui/system';
import {lawyers} from 'src/api/blog/data';
import Card from '@mui/material/Card';
import { useTranslation } from 'react-i18next'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { typography, primaryFont } from "src/theme/typography";
import Link from '@mui/material/Link';
import MailOutlineIcon from '@mui/icons-material/MailOutline'; // For email
import IconButton from '@mui/material/IconButton';
import PhoneIcon from '@mui/icons-material/Phone'; // For phone
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { RouterLink } from 'src/components/router-link';


interface TeamItemProps {
  id: string;
  name: string;
  title?: string;
  email?: string;
  bio?: string;
userurl?: string;
  cover?: string;
  image?: string;
  intro?: string;
  education?: string;
  professional?: string;
  publications?: string;

  sx?: SxProps;
}



export const TeamItem: FC<TeamItemProps> = ({
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

  const { userurl } = post;
  const [isHovered, setIsHovered] = useState(false);

  const { sx: otherSx, ...rest } = other;

  // Combine styles
  const cardStyle = {
    position: 'relative',
    transition: 'transform 0.3s ease-in-out',
    transform: isHovered ? 'scale(0.95)' : 'scale(1)',
    ...(otherSx as any),
  };

  // CardMedia (Image) styles with transition
  const cardMediaStyle = {
    height: 250,
    transition: 'transform 0.3s ease-in-out',
    transform: isHovered ? 'scale(1.10)' : 'scale(1)', // Zoom in when hovered
  };

  return (
    <Card {...other} sx={cardStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
    >

      <CardMedia
        component={RouterLink}
        href={`/${userurl}`}
        image={image}
        sx={cardMediaStyle}
      />
      {!isHovered && ( // Render this part only when not hovering
      <CardContent>
        <Typography variant="h4" sx={{ ...typography.h4 }}>
          <Link component={RouterLink} href={`/${userurl}`}>
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

        </Stack>

      </CardContent>
      )}

      {isHovered && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column', // Aligns children vertically
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}>
          {/* Name and Link inside overlay */}
          <Link component={RouterLink} href={`/${userurl}`} style={{ color: '#fff', marginBottom: '10px' }}>
            <Typography variant="h4" sx={{ ...typography.h4 }}>
              {post.name ? t(post.name) : t('defaultTitleKey')}
            </Typography>
          </Link>

          {/* Container for Icons */}
          <div style={{ display: 'flex', flexDirection: 'row' }}> {/* Aligns icons horizontally */}
            {/* Email Icon */}
            {post.email && (
              <IconButton component="a" href={`mailto:${post.email}`}>
                <MailOutlineIcon />
              </IconButton>
            )}

            {/* LinkedIn Icon */}
            {post.linkedinUrl && (
              <IconButton component="a" href={post.linkedinUrl} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon />
              </IconButton>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

TeamItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  userurl: PropTypes.string.isRequired,
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
