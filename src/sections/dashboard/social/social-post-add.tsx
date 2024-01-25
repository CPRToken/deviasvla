import type { FC } from 'react';
import Attachment01Icon from '@untitled-ui/icons-react/build/esm/Attachment01';
import FaceSmileIcon from '@untitled-ui/icons-react/build/esm/FaceSmile';
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import Link01Icon from '@untitled-ui/icons-react/build/esm/Link01';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';

import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';
import {t} from "i18next";
import {tokens} from "src/locales/tokens";
import { getInitials } from 'src/utils/get-initials';
import { useEffect, useState } from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';


import type {Profile } from 'src/types/social';

import { db} from "src/libs/firebase";
import {socialApi} from "src/api/social/socialApi";




export const SocialPostAdd: FC = (props) => {

    const [user, setUser] = useState<Profile | null>(null);
    const auth = getAuth();
  const [postText, setPostText] = useState<string>("");

  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;

        try {
          const response = await socialApi.getProfile({ uid });

          setUser(response);
} catch (err) {
          console.error("Error fetching profile data:", err);
        }
      } else {
        setUser(null);  // for example, reset the profile to null.
      }
    });
    return unsubscribe;
  }, [auth]);





    const handlePost = async () => {
        if (user) { // Make sure user data is available
            const uid = user.uid; // Assuming uid is a field in your Profile type

            try {
                const docRef = await addDoc(collection(db, "posts"), {

                    uid: uid,
                    avatar: user.avatar, // Use the avatar field from your user state
                    name: user.name, // Use the name field from your user state
                    createdAt: serverTimestamp(),
                    comments: [],
                    isLiked: false,
                    likes: 0,
                    message: postText
                });

                console.log("Document written with ID: ", docRef.id);
                setPostText(""); // Clear the post text
            } catch (err) {
                console.error("Error adding document: ", err);
            }
        } else {
            console.log("User data is not available.");
        }
    };





  return (
      <>

        <Card {...props}>
          <CardContent>
            <Stack alignItems="flex-start"
                   direction="row"
                   spacing={2}>

                <Avatar
                    src={user?.avatar}
                    sx={{
                        height: 45,
                        width: 45,
                    }}
                >
                    {getInitials(user?.name)}
                </Avatar>
              <Stack
                  spacing={3}
                  sx={{ flexGrow: 1 }}>

                  <OutlinedInput
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    fullWidth
                    multiline
                    placeholder={t(tokens.headings.whatsOnYourMind)}
                    rows={3}
                />


                  <Stack alignItems="center"
                         direction="row"
                         justifyContent="space-between"
                         spacing={3}>

                      {smUp && (
                          <Stack alignItems="center"
                                 direction="row"
                                 spacing={1}>

                        <IconButton>
                          <SvgIcon>
                            <Image01Icon />
                          </SvgIcon>
                        </IconButton>
                        <IconButton>
                          <SvgIcon>
                            <Attachment01Icon />
                          </SvgIcon>
                        </IconButton>
                        <IconButton>
                          <SvgIcon>
                            <Link01Icon />
                          </SvgIcon>
                        </IconButton>
                        <IconButton>
                          <SvgIcon>
                            <FaceSmileIcon />
                          </SvgIcon>
                        </IconButton>
                      </Stack>
                  )}
                  <div>
                    <Button variant="contained"
                            onClick={handlePost}>Post</Button>
                  </div>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>


        </Card>
      </>
  );
}
