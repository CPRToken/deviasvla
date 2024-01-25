import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';;
import { lawyers } from 'src/api/blog/data';
import { TeamCard } from 'src/sections/dashboard/blog/team-card';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { typography , primaryFont } from "src/theme/typography";

export const HomeCaps: React.FC = () => {
  const [caps, setCaps] = useState(lawyers); // Directly use lawyers as it matches TeamCardProps structure
  const numberOfItems = 8; // Set to render 8 lawyers


  return (
    <Container maxWidth="xl"> {/* Change maxWidth to "xl" for a wider container */}
      <Typography variant="h2" sx={{ ...typography.h2, marginY: 4, paddingTop: '40px', textAlign: 'center' }}> {/* Apply the h2 typography style */}
        NUESTRO EQUIPO
      </Typography>
      <Grid container spacing={4} sx={{ paddingLeft: '0px', paddingRight: '0px', paddingTop: '0px', paddingBottom: '10px', marginTop: '15px', marginBottom: '40px' }}>
        {caps.slice(0, numberOfItems).map((cap) => (
          <Grid key={cap.id} item xs={12} sm={6} md={3} sx={{ padding: 1 }}> {/* Adjust grid sizing */}
            <TeamCard
              id={cap.id}
              name={cap.name}
              title={cap.title}

              bio={cap.bio}
              email={cap.email}
              image={cap.image}
              cover={cap.cover}
              sx={{
                '& img': { // Select the image inside TeamCard
                  maxWidth: '100%', // Adjust the maximum width for all screen sizes
                  maxHeight: 'auto', // Maintain the aspect ratio
                  display: 'block', // Ensure the image is displayed as a block element
                  margin: '0 auto', // Center the image horizontally
                  '@media (max-width: 600px)': { // Apply styles only for screens with a max width of 600px (mobile devices)
                    maxWidth: '100%', // Adjust the maximum width for mobile devices
                    paddingTop: '100px', // Adj
                  },
                },
              }}
            />
          </Grid>
        ))}
      </Grid>
      {/* ... */}
    </Container>
  );
};
