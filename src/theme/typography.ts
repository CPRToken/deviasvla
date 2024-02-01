import { Public_Sans, Ibarra_Real_Nova, Cormorant_Garamond, Playfair_Display, Montserrat  } from 'next/font/google';

// ----------------------------------------------------------------------

export function remToPx(value: string) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value: number) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    fontSecondaryFamily: React.CSSProperties['fontFamily'];
    fontWeightSemiBold: React.CSSProperties['fontWeight'];
    fontTertiaryFamily: React.CSSProperties['fontFamily'];
    fontQuaternaryFamily: React.CSSProperties['fontFamily'];
    fontQuinaryFamily: React.CSSProperties['fontFamily'];


  }
}

export const primaryFont = Public_Sans({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica Neue', 'Helvetica', 'sans-serif'],
});

export const secondaryFont = Cormorant_Garamond({
  weight: ['400'], // Only include the available weight
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});


export const tertiaryFont = Cormorant_Garamond({
  weight: ['400', '400','500','700'], // Example weights, you can choose what you need
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const quaternaryFont = Playfair_Display({
  weight: ['400','500', '700'], // Example weights, adjust as needed
  subsets: ['latin'],
  display: 'swap',
  fallback: ['serif'], // Fallback to a generic serif font
});

export const quinaryFont = Montserrat({
  weight: ['100','200', '300','400','500', '700'], // Example weights, adjust as needed
  subsets: ['latin'],
  display: 'swap',
  fallback: ['serif'], // Fallback to a generic serif font
});

// ----------------------------------------------------------------------

// LEARN MORE
// https://nextjs.org/docs/basic-features/font-optimization#google-fonts

export const typography = {
  fontFamily: primaryFont.style.fontFamily,
  fontSecondaryFamily: secondaryFont.style.fontFamily,
  fontTertiaryFamily: tertiaryFont.style.fontFamily,
  fontQuaternaryFamily: quaternaryFont.style.fontFamily,
  fontQuinaryFamily: quinaryFont.style.fontFamily,
  fontWeightThin: 100,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 100,
    lineHeight: 100 / 64,
    fontSize: pxToRem(40),
    fontFamily: secondaryFont.style.fontFamily,
    ...responsiveFontSizes({ sm: 40, md: 50, lg: 55 }),
  },
  h2: {
    fontWeight: 300,
    lineHeight: 64 / 48,
    fontSize: pxToRem(28),
    fontFamily: tertiaryFont.style.fontFamily,
       ...responsiveFontSizes({ sm: 40, md: 41, lg: 44 }),
  },
  h3: {
    fontWeight: 500,
    lineHeight: 64 / 48,
    fontSize: pxToRem(28),
    fontFamily: tertiaryFont.style.fontFamily,
    ...responsiveFontSizes({ sm: 43, md: 44, lg: 48 }),
  },
  h4: {
    fontWeight: 500,
    lineHeight: 1,
    fontSize: pxToRem(26),
    fontFamily: secondaryFont.style.fontFamily,
    ...responsiveFontSizes({ sm: 21, md: 25, lg: 27 }),
  },
  h5: {
    fontWeight: 300,
    lineHeight: 1.5,
    fontSize: pxToRem(27),
    fontFamily: secondaryFont.style.fontFamily,
    textTransform: 'uppercase',
    ...responsiveFontSizes({ sm: 22, md: 25, lg: 26 }),
  },
  h6: {
    fontWeight: 400,
    lineHeight:  1.4,
    fontSize: pxToRem(20),
    fontFamily: tertiaryFont.style.fontFamily,
    ...responsiveFontSizes({ sm: 15, md: 17, lg: 19 }),
  },
  subtitle1: {
    fontWeight: 400,
    lineHeight: 1.2,
    fontSize: pxToRem(16),
    fontFamily: tertiaryFont.style.fontFamily,
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    fontWeight: 300,
    lineHeight: 1.6,
    fontSize: pxToRem(20),
    fontFamily: tertiaryFont.style.fontFamily,
  },
  body2: {
    lineHeight: 1.4,
    fontSize: pxToRem(20),
    fontFamily: secondaryFont.style.fontFamily,
  },


  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'capitalize',
  },
} as const;
