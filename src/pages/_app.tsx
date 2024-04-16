// Remove if react-quill is not used
import 'react-quill/dist/quill.snow.css';
// Remove if react-draft-wysiwyg is not used
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// Remove if simplebar is not used
import 'simplebar-react/dist/simplebar.min.css';
// Remove if mapbox is not used
import 'mapbox-gl/dist/mapbox-gl.css';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import 'src/global.css';
// Remove if locales are not used
import 'src/locales/i18n';

import { RTL } from 'src/components/rtl';

import { SettingsButton } from 'src/components/settings/settings-button';
import { SettingsDrawer } from 'src/components/settings/settings-drawer';
import { Toaster } from 'src/components/toaster';

import { SettingsConsumer, SettingsProvider } from 'src/contexts/settings';

import { useNprogress } from 'src/hooks/use-nprogress';

import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';

const clientSideEmotionCache = createEmotionCache();

export interface CustomAppProps extends AppProps {
  Component: NextPage;
  emotionCache?: EmotionCache;
}

const CustomApp = (props: CustomAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;


  useNprogress();

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>VLA</title>
        <meta
          name="viewport"
          content="initial-scale=0.9, width=device-width"
        />
      </Head>

        <LocalizationProvider dateAdapter={AdapterDateFns}>

                <SettingsProvider>
                  <SettingsConsumer>
                    {(settings) => {
                      // Prevent theme flicker when restoring custom settings from browser storage
                      if (!settings.isInitialized) {
                        // return null;
                      }

                      const theme = createTheme({
                        colorPreset: settings.colorPreset,
                        contrast: settings.contrast,
                        direction: settings.direction,
                        paletteMode: settings.paletteMode,
                        responsiveFontSizes: settings.responsiveFontSizes,


                      });

                      // Prevent guards from redirecting


                      return (
                        <ThemeProvider theme={theme}>

                          <Head>
                            <meta
                              name="color-scheme"
                              content={settings.paletteMode}
                            />
                            <meta
                              name="theme-color"
                              content={theme.palette.neutral[900]}
                            />
                          </Head>
                          <RTL direction={settings.direction}>
                            <CssBaseline />


                              <>
                                {getLayout(<Component {...pageProps} />)}


                              </>

                            <Toaster />
                          </RTL>
                        </ThemeProvider>
                      );
                    }}
                  </SettingsConsumer>
                </SettingsProvider>

        </LocalizationProvider>

    </CacheProvider>
  );
};

export default CustomApp;
