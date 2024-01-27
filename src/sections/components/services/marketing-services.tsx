import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------



const ÁREAS = [
  {
    title: 'Search Engine Optimization',

    icon: '/assets/icons/ic_statistics.svg',
  },
  {
    title: 'Social Media Strategy',

    icon: '/assets/icons/ic_social_media.svg',
  },
  {
    title: 'Real Time and Data',

    icon: '/assets/icons/ic_real_time.svg',
  },
  {
    title: 'Online Media Management',

    icon: '/assets/icons/ic_checklist.svg',
  },
  {
    title: 'Reporting & Analysis',

    icon: '/assets/icons/ic_report.svg',
  },
  {
    title: 'Penalty Recovery',

    icon: '/assets/icons/ic_file.svg',
  },
];


// ----------------------------------------------------------------------

export default function MarketingServicesInclude() {
  return (
    <Container
      sx={{
        textAlign: 'center',
        pt: { xs: 5, md: 10 },
        pb: { xs: 10, md: 15 },
      }}
    >
      <Typography variant="h2">ÁREAS DE PRÁCTICA</Typography>



      <Box
        sx={{
          rowGap: 8,
          columnGap: 10,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {ÁREAS.map((value) => (
          <div key={value.title}>
            <SvgColor
              src={value.icon}
              color="info"
              sx={{
                width: 64,
                height: 64,
                mx: 'auto',
                bgcolor: 'primary.main',
              }}
            />

            <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
              {value.title}
            </Typography>


          </div>
        ))}
      </Box>
    </Container>
  );
}
