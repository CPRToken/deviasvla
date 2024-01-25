
import type { ChangeEvent } from 'react';
import {useCallback, useEffect, useRef, useState} from 'react';
import type { NextPage } from 'next';

import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import UserPlus02Icon from '@untitled-ui/icons-react/build/esm/UserPlus02';
import Avatar from '@mui/material/Avatar';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { socialApi } from 'src/api/social/socialApi';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';


import { SocialPostCard } from 'src/sections/dashboard/social/social-post-card';
import { SocialTimeline } from 'src/sections/dashboard/social/social-timeline';
import type { Profile, Post } from 'src/types/social';
import { useRouter } from 'next/router';

import { query, where, collection, getDocs } from "firebase/firestore";



import { db } from 'src/libs/firebase';



const tabs = [
  { label: 'Timeline', value: 'timeline' },
  { label: 'Videos', value: 'videos' },
  { label: 'Fotos', value: 'fotos' },
];


const useProfile = (): Profile | null => {

  const [profile, setProfile] = useState<Profile | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const { userUrl, invite } = router.query;

  useEffect(() => {
    if (invite === 'true') {
      setShowModal(true); // Show the modal when invite is true
    }
    if (!userUrl || typeof userUrl !== 'string') return;

    async function fetchProfileData() {
      try {
        const querySnapshot = await getDocs(query(collection(db, "users"), where("userUrl", "==", userUrl)));

        const userDoc = querySnapshot.docs[0];
        if (userDoc) {
          const uid = userDoc.id;

          // Using the SocialApi method to fetch profile
          socialApi.getProfile({ uid })
            .then(profileData => {
              setProfile(profileData);
            })
            .catch(error => {
              console.error("Error fetching profile using socialApi:", error);
            });
        } else {
          console.log('No such document with that userUrl!');
        }
      } catch (error) {
        console.error("Error fetching user data based on userUrl: ", error);
      }
    }

    fetchProfileData();
  }, [userUrl, invite]);




  return profile;
};








const usePosts = (): Post[] => {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();


  const { userUrl } = router.query;

  useEffect(() => {
    if (!userUrl || typeof userUrl !== 'string') return;

    async function fetchPostsData() {

      try {

        const querySnapshot = await getDocs(query(collection(db, "users"), where("userUrl", "==", userUrl)));
        const userDoc = querySnapshot.docs[0];
        if (userDoc) {
          const uid = userDoc.id;
          const unsubscribe = socialApi.getPosts({ uid }, (fetchedPosts) => {

            setPosts(fetchedPosts);



          });
        } else {
          console.log('No such document with that userUrl!');
        }
      } catch (error) {
        console.error("Error fetching user data based on userUrl: ", error);
      }
    }


    fetchPostsData();
  }, [userUrl]);

  return posts;
};







const Page: NextPage = () => {


  const profile = useProfile();
  const posts = usePosts();

  const [currentTab, setCurrentTab] = useState<string>('timeline');







  const coverInputRef = useRef(null);
  const inputRef = useRef(null);

  usePageView();





  const handleTabsChange = useCallback((event: ChangeEvent<any>, value: string): void => {
    setCurrentTab(value);
  }, []);

  if (!profile) {
    return null;
  }






//below is to upload and change the user's cover and avatar images.





  const SendFlowers = () => {
    // Your code here
  };


  return (
    <>
      <Seo title="Dashboard: Social Profile" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <div>




            <Box

              style={{ backgroundImage: `url(${profile.cover})` }}
              sx={{
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                borderRadius: 1,
                height: { xs: 250, md: 400 },
                position: 'relative',
                '&:hover': {
                  '& button': {
                    visibility: 'visible',
                  },
                },
              }}
            >

              <div>
                <input
                  type="file"

                  style={{ display: 'none' }}
                  ref={coverInputRef}
                  data-type="cover"
                />



              </div>

            </Box>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{ mt: 5 }}
            >
              <Stack
                alignItems="center"
                direction="row"
                spacing={2}
              >
                <Box display="flex" flexDirection="column" alignItems="center" position="relative"> {/* Added position="relative" here */}
                  <Avatar
                    src={profile.avatar}
                    sx={{
                      height: { xs: 150, md: 180 }, // 100 on phones and 150 on medium and up (like desktop)
                      width: { xs: 150, md: 180 },
                    }}
                  />

                  <div>
                    <input
                      type="file"

                      style={{ display: 'none' }}
                      ref={inputRef}
                      data-type="avatar"
                    />

                  </div>

                </Box>
                <div>


                  <Typography
                    color="text.secondary"
                    variant="overline"
                  >
                    {profile.bio}
                  </Typography>
                  <Typography variant="h4">{profile.name}</Typography>
                </div>
              </Stack>
              <Box sx={{ flexGrow: 1 }} />
              <Stack
                alignItems="center"
                direction="row"
                spacing={2}
                sx={{
                  display: {
                    md: 'block',
                    xs: 'none',
                  },
                }}
              >
                <Button
                  onClick={SendFlowers}
                  size="small"

                  startIcon={
                    <SvgIcon>
                      <UserPlus02Icon />
                    </SvgIcon>
                  }
                  variant="outlined"
                >
                  Share
                </Button>


                <Button
                  component={RouterLink}
                  href={"sendflowers"}
                  size="small"
                  startIcon={
                    <SvgIcon>
                      <LocalFloristIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Send Flowers
                </Button>
              </Stack>

            </Stack>
          </div>
          <Tabs
            indicatorColor="primary"
            onChange={handleTabsChange}
            scrollButtons="auto"
            sx={{ mt: 5 }}
            textColor="primary"
            value={currentTab}
            variant="scrollable"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {currentTab === 'timeline' && (
              <SocialTimeline
                posts={posts}
                profile={profile}
              />
            )}
            {currentTab === 'posts' && (
              posts.map((post) => (
                <SocialPostCard
                  key={post.postId}
                  postId={post.postId}
                  avatar={post.avatar}
                  authorName={post.name}
                  comments={post.comments}
                  createdAt={post.createdAt}
                  isLiked={post.isLiked}
                  likes={post.likes}
                  media={post.media}
                  message={post.message}
                />
              ))
            )}

          </Box>
        </Container>
      </Box>
    </>
  );
};





export default Page;
