import type { FC } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import type { Theme } from '@mui/material/styles/createTheme';
import { useTheme } from '@mui/material/styles';
import { Logo } from 'src/components/logo';
import { RouterLink } from 'src/components/router-link';
import { usePathname } from 'src/hooks/use-pathname';
import { paths } from 'src/paths';
import { LanguageSwitch } from 'src/layouts/dashboard/language-switch/language-switch';
import { SideNavItem } from './side-nav-item';
import useMediaQuery from "@mui/material/useMediaQuery";

interface Item {
  children?: {
    subheader?: string;
    items: {
      external?: boolean;
      path: string;
      title: string;
    }[];
  }[];
  disabled?: boolean;
  external?: boolean;
  path?: string;
  title: string;
}

const items: Item[] = [

  {
    title: 'Paginas',
    children: [
      {
        subheader: 'INICIO',
        items: [
          {
            title: 'Firma',
            path: paths.firma.index,
          },


        ],
      },
      {
        subheader: 'ÁREAS',
        items: [


          {
            title: 'Firma',
            path: paths.firma.index,
          },
          {
            title: 'Áreas',
            path: paths.areas.index,
          },
          {
            title: 'Áreas 2',
            path: paths.categories.index,
          },
          {
            title: 'Equipo',
            path: paths.equipo.index,
          },
          {
            title: 'Contacto',
            path: paths.contact,
          },
        ],
      },
    ],
  },
  {
    title: 'Equipo',
    path: paths.equipo.index,
    external: true,
  },
];

const renderItems = ({
  depth = 0,
  items,
  pathname,
}: {
  depth?: number;
  items: Item[];
  pathname?: string | null;
}): JSX.Element[] =>
  items.reduce(
    (acc: JSX.Element[], item) =>
      reduceChildRoutes({
        acc,
        depth,
        item,
        pathname,
      }),
    []
  );

const reduceChildRoutes = ({
  acc,
  depth,
  item,
  pathname,
}: {
  acc: JSX.Element[];
  depth: number;
  item: Item;
  pathname?: string | null;
}): Array<JSX.Element> => {
  const checkPath = !!(item.path && pathname);
  const partialMatch = checkPath ? pathname.includes(item.path!) : false;
  const exactMatch = checkPath ? pathname === item.path : false;

  if (item.children) {
    acc.push(

      <SideNavItem
        active={partialMatch}
        depth={depth}
        disabled={item.disabled}
        key={item.title}
        open={partialMatch}
        title={item.title}
      >

        <Stack spacing={2}>
          {item.children.map((child, index) => (
            <Stack
              component="ul"
              key={index}
              spacing={0.5}
              sx={{
                listStyle: 'none',
                m: 0,
                p: 0,
              }}
            >

              {child.subheader && (
                <Box
                  component="li"
                  sx={{
                    color: 'text.secondary',
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: 1.66,
                    mb: 1,
                    pl: '24px',
                    textTransform: 'uppercase',
                  }}
                >
                  {child.subheader}
                </Box>
              )}
              {child.items.map((item) => {
                const checkPath = !!(item.path && pathname);
                const active = checkPath ? pathname === item.path : false;

                const linkProps = item.path
                  ? item.external
                    ? {
                        component: 'a',
                        href: item.path,
                        target: '_blank',
                      }
                    : {
                        component: RouterLink,
                        href: item.path,
                      }
                  : {};




                // Determine the logo based on the theme mode


                return (
                  <li key={item.title}>
                    <ButtonBase
                      sx={{
                        alignItems: 'center',
                        borderRadius: 1,
                        display: 'flex',
                        justifyContent: 'flex-start',
                        pl: '24px',
                        pr: '16px',
                        py: '8px',
                        textAlign: 'left',
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                        ...(active && {
                          color: 'primary.main',
                        }),
                      }}
                      {...linkProps}
                    >
                      <Box
                        component="span"
                        sx={{
                          height: 6,
                          mr: 2,
                          width: 6,
                        }}
                      >
                        <Box
                          sx={{
                            backgroundColor: 'neutral.400',
                            borderRadius: '50%',
                            height: 4,
                            opacity: 0, // remove this if you want it to be visible
                            width: 4,
                            ...(active && {
                              backgroundColor: 'primary.main',
                              height: 6,
                              opacity: 1,
                              width: 6,
                            }),
                          }}
                        />
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          flexGrow: 1,
                          fontFamily: (theme) => theme.typography.fontFamily,
                          fontSize: 13,
                          fontWeight: 500,
                          lineHeight: '24px',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.title}
                      </Box>

                    </ButtonBase>
                  </li>
                );
              })}
            </Stack>
          ))}
        </Stack>

      </SideNavItem>

    );
  } else {
    acc.push(
      <SideNavItem
        active={exactMatch}
        depth={depth}
        disabled={item.disabled}
        external={item.external}
        key={item.title}
        path={item.path}
        title={item.title}
      />

    );
  }

  return acc;
};

interface SideNavProps {
  onClose?: () => void;
  open?: boolean;
}

export const SideNav: FC<SideNavProps> = (props) => {
  const { onClose, open = false } = props;
  const pathname = usePathname();
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const theme = useTheme();

  // Define your logos for light and dark mode
  const lightModeLogo = '/assets/logos/vla-light2.svg';
  const darkModeLogo = '/assets/logos/vla-dark2.svg';
  const logoImage = theme.palette.mode === 'dark' ? darkModeLogo : lightModeLogo;


  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          maxWidth: '100%',
          width: 300,
        },
      }}
      variant="temporary"
    >
      <Box
        sx={{
          pt: 2,
          px: 2,
        }}
      >
        <Stack
          alignItems="center"
          component={RouterLink}
          direction="row"
          display="inline-flex"
          href={paths.index}
          spacing={1}
          sx={{ textDecoration: 'none' }}
        >
          <Box
            component="img"
            src={logoImage}
            sx={{
              display: 'inline-flex',
              height: smDown ? 50 : 80, // Smaller height for small screens
              width: smDown ? 250 : 500, // Smaller width for small screens
            }}
          />
        </Stack>
      </Box>
      <Box
        component="nav"
        sx={{ p: 2 }}
      >
        <Stack
          component="ul"
          spacing={1}
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
          }}
        >
          {renderItems({ items, pathname })}
        </Stack>
      </Box>
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
