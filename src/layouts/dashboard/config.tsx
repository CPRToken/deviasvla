import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import SvgIcon from '@mui/material/SvgIcon';
import { useEffect, useMemo, useState } from 'react';
import File01Icon from 'src/icons/untitled-ui/duocolor/file-01';
import HomeSmileIcon from 'src/icons/untitled-ui/duocolor/home-smile';
import Lock01Icon from 'src/icons/untitled-ui/duocolor/lock-01';
import Upload04Icon from 'src/icons/untitled-ui/duocolor/upload-04';
import Users03Icon from 'src/icons/untitled-ui/duocolor/users-03';
import XSquareIcon from 'src/icons/untitled-ui/duocolor/x-square';
import { tokens } from 'src/locales/tokens';
import { paths } from 'src/paths';
import { db, auth } from 'src/libs/firebase';
import { doc, getDoc } from 'firebase/firestore';



export interface Item {
  disabled?: boolean;
  external?: boolean;
  icon?: ReactNode;
  items?: Item[];
  label?: ReactNode;
  path?: string;
  title: string;
}

export interface Section {
  items: Item[];
  subheader?: string;
}




export const useSections = () => {
  const { t } = useTranslation();

  const { currentUser } = auth;

  const [userUrl, setUserUrl] = useState(null);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    if (currentUser) {
      const userDocRef = doc(db, 'users', currentUser.uid);
      getDoc(userDocRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              setUserUrl(userData.userUrl);
              setUserRole(userData.role);
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
    }
  }, [currentUser]);





  return useMemo(() => {
    return [
      {
        subheader: t(tokens.nav.dashboard),
        items: [
          {
            title: t(tokens.nav.overview),
            path: paths.dashboard.index,
            icon: <SvgIcon fontSize="small"><HomeSmileIcon /></SvgIcon>,
          },
          {
            title: t(tokens.nav.account),
            path: paths.dashboard.account,
            icon: <SvgIcon fontSize="small"><HomeSmileIcon /></SvgIcon>,
          },
          {
            title: t(tokens.nav.profile),
            path: `/dashboard/${userUrl}`,
            icon: <SvgIcon fontSize="small"><Upload04Icon /></SvgIcon>,
          },
          {
            title: t(tokens.nav.fileManager),
            path: paths.dashboard.fileManager,
            icon: <SvgIcon fontSize="small"><Upload04Icon /></SvgIcon>,
          },
        ],
      },

      ...(userRole.includes('admin')
          ? [
            {
              subheader: t(tokens.nav.pages),
              items: [
                {
                  title: t(tokens.nav.customers),
                  path: paths.dashboard.customers.index,
                  icon: <SvgIcon fontSize="small"><Users03Icon /></SvgIcon>,
                  items: [
                    { title: t(tokens.nav.list),
                      path: paths.dashboard.customers.index },
                  ],
                },
                {
              title: t(tokens.nav.capsules),
              path: paths.dashboard.capsules.index,
              icon: <SvgIcon fontSize="small"><File01Icon /></SvgIcon>,
            },
            {
              title: t(tokens.nav.postCreate),
              path: paths.dashboard.capsules.postCreate,
              icon: <SvgIcon fontSize="small"><Users03Icon /></SvgIcon>,
            },
            {
              title: t(tokens.nav.auth),
              icon: (
                  <SvgIcon fontSize="small"><Lock01Icon /></SvgIcon>
              ),
              items: [
                {
                  title: t(tokens.nav.login),
                  items: [
                    { title: 'Classic',
                      path: paths.authDemo.login.classic },
                    { title: 'Modern',
                      path: paths.authDemo.login.modern },
                  ],
                },
                {
                  title: t(tokens.nav.register),
                  items: [
                    { title: 'Classic', path: paths.authDemo.register.classic },
                    { title: 'Modern', path: paths.authDemo.register.modern },
                  ],
                },


              {
                title: t(tokens.nav.forgotPassword),
                items: [
                  { title: 'Classic', path: paths.authDemo.forgotPassword.classic },
                  { title: 'Modern', path: paths.authDemo.forgotPassword.modern },
                ],
              },
              {
                title: t(tokens.nav.resetPassword),
                items: [
                  { title: 'Classic', path: paths.authDemo.resetPassword.classic },
                  { title: 'Modern', path: paths.authDemo.resetPassword.modern },
                ],
              },
              {
                title: t(tokens.nav.verifyCode),
                items: [
                  { title: 'Classic', path: paths.authDemo.verifyCode.classic },
                  { title: 'Modern', path: paths.authDemo.verifyCode.modern },
                ],
              },

          {
            title: t(tokens.nav.error),
            icon: <SvgIcon fontSize="small"><XSquareIcon /></SvgIcon>,
            items: [
              { title: '401', path: paths.notAuthorized },
              { title: '404', path: paths.notFound },
              { title: '500', path: paths.serverError },
            ],

            },
            ],
            },
            ],
            },
            ]
            : []),
    ];
    }
    , [t, userRole, userUrl]);
}



