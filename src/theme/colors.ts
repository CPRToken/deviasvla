import { alpha } from '@mui/system/colorManipulator';
import type { ColorRange, PaletteColor } from '@mui/material/styles/createPalette';

const withAlphas = (color: PaletteColor): PaletteColor => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.3),
    alpha50: alpha(color.main, 0.5),
  };
};

export const neutral: ColorRange = {
  50: '#F8F9FA',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D2D6DB',
  400: '#9DA4AE',
  500: '#6C737F',
  600: '#4D5761',
  700: '#28303c',
  800: '#1b2232',
  900: '#111927',
};

export const blue = withAlphas({
  lightest: '#ead095',
  light: '#ceab5a',
  main: '#a27f2f',
  dark: '#785c1b',
  darkest: '#6b5411',
  contrastText: '#FFFFFF',
});

export const green = withAlphas({
  lightest: '#f9e7d4',
  light: '#ffb98f',
  main: '#e05200',
  dark: '#ab4800',
  darkest: '#953900',
  contrastText: '#FFFFFF',
});

export const indigo = withAlphas({
  lightest: '#F5F7FF',
  light: '#EBEEFE',
  main: '#6b6b6e',
  dark: '#727274',
  darkest: '#5d5d5d',
  contrastText: '#FFFFFF',
});

export const purple = withAlphas({
  lightest: '#ead095',
  light: '#ceab5a',
  main: '#ffb201',
  dark: '#a27f2f',
  darkest: '#785c1b',
  contrastText: '#FFFFFF',
});

export const success = withAlphas({
  lightest: '#F0FDF9',
  light: '#3FC79A',
  main: '#10B981',
  dark: '#0B815A',
  darkest: '#134E48',
  contrastText: '#FFFFFF',
});

export const info = withAlphas({
  lightest: '#ECFDFF',
  light: '#CFF9FE',
  main: '#06AED4',
  dark: '#0E7090',
  darkest: '#164C63',
  contrastText: '#FFFFFF',
});

export const warning = withAlphas({
  lightest: '#FFFAEB',
  light: '#FEF0C7',
  main: '#F79009',
  dark: '#B54708',
  darkest: '#7A2E0E',
  contrastText: '#FFFFFF',
});

export const error = withAlphas({
  lightest: '#FEF3F2',
  light: '#FEE4E2',
  main: '#F04438',
  dark: '#B42318',
  darkest: '#7A271A',
  contrastText: '#FFFFFF',
});
