import React from "react";
import { NextPage } from 'next';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import {tokens} from "src/locales/tokens";
import { Layout as MarketingLayout } from 'src/layouts/marketing';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import {typography } from "src/theme/typography";

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
    {
      title: 'CORPORATIVO',
      icon: '/assets/icons/ic_checklist.svg',
    },
    {
      title: 'FUSIONES Y ADQUISICIONES',
      icon: 'assets/icons/ic_file.svg', // Replace with the correct path
    },
    {
      title: 'TRIBUTARIA',
      icon: 'assets/icons/ic_agreement.svg', // Replace with the correct path
    },
    {
      title: 'LABORAL',
      icon: 'assets/icons/ic_service_bullhorn.svg', // Replace with the correct path
    },
    {
      title: 'CONTRATACIÓN NACIONAL E INTERNACIONAL',
      icon: 'assets/icons/ic_service_analysis.svg', // Replace with the correct path
    },
    {
      title: 'INMOBILIARIA, INGENIERÍA Y CONSTRUCCIÓN',
      icon: 'assets/icons/ic_banking_currency.svg', // Replace with the correct path
    },
    {
      title: 'FINANCIAMIENTO DE PROYECTOS',
      icon: 'assets/icons/ic_money.svg', // Replace with the correct path
    },
    {
      title: 'MERCADOS REGULADOS',
      icon: 'assets/icons/ic_banking.svg', // Replace with the correct path
    },
    {
      title: 'INMIGRACIÓN',
      icon: 'assets/icons/ic_customer_service.svg', // Replace with the correct path
    },
    {
      title: 'INVERSIÓN EXTRANJERA',
      icon: 'assets/icons/ic_money.svg', // Replace with the correct path
    },
    {
      title: 'ENERGÍA Y RECURSOS NATURALES',
      icon: 'assets/icons/energy.svg', // Replace with the correct path
    },
    {
      title: 'AGUAS',
      icon: 'assets/icons/aguas.svg', // Replace with the correct path
    },
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
      <Typography sx={{
        ...typography.h5,
        mb: 9,
        mt: { xs: 5, sm: 5, md: 7 }, // Adjust these values as needed
        pt: { xs: 5, sm: 4, md: 6 }, // Adjust these values as needed
        textAlign: 'center'
      }}>
        {t(tokens.headings.Areas)}
      </Typography>

      <Box
        sx={{
          gap: 2,
          paddingLeft: 0,
          display: 'grid',
          my: { xs: 8, md: 10 },
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)', // 2 columns for extra small screens
            sm: 'repeat(2, 1fr)', // 2 columns for small screens
            md: 'repeat(4, 1fr)', // 4 columns for medium screens
            lg: 'repeat(5, 1fr)', // 5 columns for large screens
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
            width: 65,
            height: 65,
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

