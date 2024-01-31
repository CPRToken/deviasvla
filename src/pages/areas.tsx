import React from "react";
import { NextPage } from 'next';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { Layout as MarketingLayout } from 'src/layouts/marketing';
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

import { alpha } from '@mui/system/colorManipulator';


type ServiceItem = {
  title: string;
  icon: string;
};

const COLORS = ['primary', 'secondary', 'success', 'warning'] as const;

const SERVICES = [
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
];



const additionalAreas = [
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
  { title: 'PRÁCTICA GENERAL', icon: 'assets/icons/general.svg' }
];


// ----------------------------------------------------------------------
const Page: NextPage = () => {
  const theme =

  useTheme();
  const firstHalf = SERVICES.slice(0, 6);
  const secondHalf = SERVICES.slice(6, 12);
  // Additional areas


  return (
    <Container sx={{ py: { xs: 5, md: 10, lg: 17 } }}>
      <Typography sx={{ ...typography.h5, mb: 9, mt: 6, textAlign: 'center' }}>
        ÁREAS DE PRÁCTICA
      </Typography>






      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        {/* First two columns */}
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(2, 1fr)', paddingRight: 2 }}>
          {[...firstHalf, ...secondHalf].map((value) => (
            <div key={value.title} style={{
              textAlign: 'center',
              minHeight: '100px'
            }}> {/* Adjust minHeight as needed */}
              <SvgColor src={value.icon} color="info"
                        sx={{width: 50, height: 50, mx: 'auto', bgcolor: 'primary.main'}}/>
              <Typography sx={{...typography.subtitle1, color: 'text.secondary', mt: 2, mb: 2}}>
                {value.title}
              </Typography>
            </div>
          ))}
        </Box>
        {/* Additional areas */}
        <Box sx={{display: 'grid', gap: 4, gridTemplateColumns: 'repeat(2, 1fr)', paddingLeft: 2}}>
          {additionalAreas.map((value) => (
            <div key={value.title} style={{
              textAlign: 'center',
              minHeight: '100px'
            }}>
              <SvgColor src={value.icon} color="info"
                        sx={{width: 50, height: 50, mx: 'auto', bgcolor: 'primary.main' }} />
              <Typography sx={{ ...typography.subtitle1, color: 'text.secondary', mt: 2, mb: 2 }}>
                {value.title}
              </Typography>
            </div>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

// ----------------------------------------------------------------------

type ServiceItemProps = {
  service: {
    name: string;
    content: string;
    path: string;
    icon: string;
  };
  index: number;
};

function ServiceItem({ service, index }: ServiceItemProps) {
  const { name, icon, content, path } = service;



  return (
    <Card
      sx={{
        px: 4,
        py: 5,
        textAlign: 'center',
        ...(index === 1 && {
          py: { xs: 5, md: 8 },
        }),
        ...(index === 2 && {
          py: { xs: 5, md: 10 },

        }),
      }}
    >


      <Stack spacing={1} sx={{ my: 5 }}>
        <TextMaxLine variant="h6">{name}</TextMaxLine>
        <TextMaxLine variant="body2" sx={{ color: 'text.secondary' }}>
          {content}
        </TextMaxLine>
      </Stack>

      <IconButton
        component={RouterLink}
        href={path}
        color={
          (index === 0 && 'primary') ||
          (index === 1 && 'secondary') ||
          (index === 2 && 'success') ||
          'warning'
        }
      >
        <Iconify icon="carbon:direction-straight-right" />
      </IconButton>
    </Card>
  );
}
Page.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;
export default Page;
