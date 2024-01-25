import type { FC } from 'react';
import FaceSmileIcon from '@untitled-ui/icons-react/build/esm/FaceSmile';
import Link01Icon from '@untitled-ui/icons-react/build/esm/Link01';
import Attachment01Icon from '@untitled-ui/icons-react/build/esm/Attachment01';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';
import { getInitials } from 'src/utils/get-initials';
import {useEffect, useState} from "react";
import {Profile} from "../../../types/social";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { db} from "src/libs/firebase";
import {socialApi} from "src/api/social/socialApi";
import { doc, getDoc, updateDoc} from "firebase/firestore";


interface SocialCommentAddProps {
    postId: string;
    // add other props if needed
}

export const SocialCommentAdd: FC<SocialCommentAddProps> = (props) => {
    const [user, setUser] = useState<Profile | null>(null);
    const auth = getAuth();
    const { postId } = props;
    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
    const [comment, setComment] = useState<string>('');




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





    const handleComment = async () => {
        if (user && postId) {  // Make sure user data and postId are available
            const uid = user.uid;

            // Reference to the post
            const postRef = doc(db, "posts", postId);

            try {
                // Fetch existing post to get current comments
                const postSnapshot = await getDoc(postRef);
                if (postSnapshot.exists()) {
                    const postData = postSnapshot.data();

                    // Create new comment
                    const newComment = {
                        uid: uid,
                        avatar: user.avatar,
                        name: user.name,
                        createdAt: Date.now(),
                        message: comment
                    };

                    // Add new comment to existing comments
                    const updatedComments = [...(postData.comments || []), newComment];

                    // Update Firestore document
                    await updateDoc(postRef, { comments: updatedComments });

                    console.log("Successfully added the comment");

                    // Clear the comment text field
                    setComment(''); // Empty string


                }

            } catch (err) {
                console.error("Error:", err);
            }

        } else {
            console.log("User data or postId is not available.");
        }
    };   // end of handleComment function



    return (
        <div {...props}>
            <Stack
                alignItems="flex-start"
                direction="row"
                spacing={2}
            >
                <Avatar
                    src={user?.avatar}
                    sx={{
                        height: 40,
                        width: 40,
                    }}
                >
                    {getInitials(user?.name)}
                </Avatar>
                <Stack
                    spacing={3}
                    sx={{ flexGrow: 1 }}
                >
                    <TextField
                        fullWidth
                        multiline
                        placeholder="Type your reply"
                        rows={3}
                        variant="outlined"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    <Stack
                        alignItems="center"
                        direction="row"
                        justifyContent="space-between"
                        spacing={3}
                    >
                        <Stack
                            alignItems="center"
                            direction="row"
                            spacing={1}
                        >
                            {!smUp && (
                                <IconButton>
                                    <SvgIcon>
                                        <PlusIcon />
                                    </SvgIcon>
                                </IconButton>
                            )}
                            {smUp && (
                                <>
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
                                </>
                            )}
                        </Stack>
                        <div>
                            <Button variant="contained"
                                    onClick={handleComment}>Reply</Button>
                        </div>
                    </Stack>
                </Stack>
            </Stack>
        </div>
    );
};
