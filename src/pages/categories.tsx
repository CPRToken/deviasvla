import React from "react";
import { NextPage } from 'next';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import {tokens} from "src/locales/tokens";
import { Layout as MarketingLayout } from 'src/layouts/marketing';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {typography } from "src/theme/typography";
import { createTheme } from '@mui/material/styles';
import { paths } from 'src/paths';
import { RouterLink } from 'src/components/router-link';
import  TextMaxLine  from 'src/components/text-max-line/text-max-line';
import Iconify from 'src/components/iconify';
import SvgColor from "../components/svg-color";
import {useTheme} from "@mui/material/styles";
import { useTranslation } from 'react-i18next'
import Paper from '@mui/material/Paper';


type CategoryItem = {
  title: string;
  icon: string;
};

const Page: NextPage = () => {
  const { t } = useTranslation();

  useTheme();

  const categories: CategoryItem[] = [
    { title: 'LITIGIOS', icon: 'assets/icons/gavel_2.svg' },
    { title: 'SOLUCIÓN DE CONFLICTOS Y ARBITRAJE', icon: 'assets/icons/shake.svg' },
    { title: 'LIBRE COMPETENCIA', icon: 'assets/icons/free.svg' },
    { title: 'CONSTITUCIONAL Y ADMINISTRATIVO', icon: 'assets/icons/const.svg' },
    { title: 'INFORMES ESPECIALIZADOS EN DERECHO', icon: 'assets/icons/law.svg' },
    { title: 'CONFLICTOS DE LEYES Y JURISDICCIÓN', icon: 'assets/icons/conflicts.svg' },
    { title: 'PROTECCIÓN DEL CONSUMIDOR', icon: 'assets/icons/protect.svg' },
    { title: 'INSOLVENCIA Y REORGANIZACIÓN EMPRESARIAL', icon: 'assets/icons/reorg.svg' },
    { title: 'MEDIO AMBIENTE', icon: 'assets/icons/environ.svg' },
    { title: 'AGROINDUSTRIA', icon: 'assets/icons/AGROIN.svg ' },
    { title: 'EDUCACIÓN', icon: 'assets/icons/edu.svg ' },
    { title: 'PRÁCTICA GENERAL', icon: 'assets/icons/general.svg' },
  ];





  // Additional areas

  return (
    <Container sx={{ py: { xs: 5, md: 10, lg: 17 } }}>
      <Typography sx={{ ...typography.h5, mb: 9, mt: 3, textAlign: 'center' }}>
        {t(tokens.headings.Areas)}
      </Typography>

      <Box
        sx={{
          gap: 4,
          paddingLeft: 0,
          display: 'grid',
          my: { xs: 8, md: 10 },
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {categories.map((module) => (
          <CategoryItem key={module.title} module={module} />
        ))}
      </Box>
    </Container>
  );
}

type CategoryItemProps = {
  module: CategoryItem;
};

const CategoryItem = ({ module }: CategoryItemProps) => {
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

      variant="outlined"
      sx={{
        pt: '100%',
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
            mb: 2.5,
            width: 72,
            height: 72,
            mx: 'auto',
            display: 'flex',
            borderRadius: '50%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SvgColor
            src={module.icon}
            color={hovered ? theme.palette.primary.main : 'info'} // Change icon color on hover to primary color
            sx={{
              width: 60,
              height: 60,
            }}
          />
        </Box>

        <Typography sx={{ ...typography.subtitle1, color: 'text.secondary', mt: 1, mb: 1 }}>
          {module.title}
        </Typography>
      </Stack>
    </Paper>
  );
}


Page.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;
export default Page;

