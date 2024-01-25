import type { FC } from 'react';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import ClockIcon from '@untitled-ui/icons-react/build/esm/Clock';
import HeartIcon from '@untitled-ui/icons-react/build/esm/Heart';
import Share07Icon from '@untitled-ui/icons-react/build/esm/Share07';
import Avatar from '@mui/material/Avatar';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import type { Comment} from 'src/types/social';
import { SocialComment } from './social-comment';
import { SocialCommentAdd } from './social-comment-add';
import { db, auth } from 'src/libs/firebase';
import { arrayRemove, arrayUnion, getDoc, increment, doc, updateDoc } from 'firebase/firestore';

interface SocialPostCardProps {


    postId?: string;
    avatar?: string;
    authorName?: string;
    comments: Comment[];
    isLiked?: boolean;
    likes?: number;
    name?: string;
    media?: string;
    createdAt?: number;
    message?: string;

}
export const SocialPostCard: FC<SocialPostCardProps> = (props) => {
      const {
        postId,
        avatar,
        authorName,
        comments,
        createdAt,
        isLiked: isLikedProp,
        likes: likesProp,
        media,
        message,
        ...other
    } = props;

    const [isLiked, setIsLiked] = useState<boolean>(isLikedProp ?? false);
    const [likes, setLikes] = useState<number>(likesProp ?? 0);






    const handleLike = useCallback(async (): Promise<void> => {
        const uid = auth.currentUser?.uid;
        if (!uid) {
            console.error("User not logged in");
            return;
        }

        if (postId) {
            const postRef = doc(db, 'posts', postId);
            const postSnapshot = await getDoc(postRef);

            if (postSnapshot.exists()) {
                const postData = postSnapshot.data();
                const likedBy = postData.likedBy || [];

                if (!likedBy.includes(uid)) {
                    // User hasn't liked yet, so like the post
                    await updateDoc(postRef, {
                        likes: increment(1),
                        likedBy: arrayUnion(uid),
                    });
                    setIsLiked(true);
                    setLikes((prevLikes) => prevLikes + 1);
                }
            }
        } else {
            // Handle the case when postId is undefined
            console.error("postId is undefined");
        }
    }, [postId]);



    const handleUnlike = useCallback(async (): Promise<void> => {
        const uid = auth.currentUser?.uid;
        if (!uid) {
            console.error("User not logged in");
            return;
        }

        if (postId) {
            const postRef = doc(db, 'posts', postId);
            const postSnapshot = await getDoc(postRef);

            if (postSnapshot.exists()) {
                const postData = postSnapshot.data();
                const likedBy = postData.likedBy || [];

                if (likedBy.includes(uid)) {
                    // User has liked before, so unlike the post
                    await updateDoc(postRef, {
                        likes: increment(-1),
                        likedBy: arrayRemove(uid),
                    });
                    setIsLiked(false);
                    setLikes((prevLikes) => prevLikes - 1);
                }
            }
        } else {
            // Handle the case when postId is undefined
            console.error("postId is undefined");
        }
    }, [postId]);




    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (


        <Card {...other}>

            <CardHeader
                avatar={
                    <Avatar
                        component="a"
                        href="#"
                        src={avatar}
                    />
                }
                disableTypography
                subheader={
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={1}
                    >
                        <SvgIcon color="action">
                            <ClockIcon />
                        </SvgIcon>
                        <Typography
                            color="text.secondary"
                            variant="caption"
                        >
                            {createdAt && formatDistanceToNowStrict(new Date(createdAt * 1000))} ago






                        </Typography>
                    </Stack>
                }
                title={
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={0.5}
                        sx={{ mb: 1 }}
                    >
                        <Link
                            color="text.primary"
                            href="#"
                            variant="subtitle2"
                        >


                        </Link>
                        <Typography variant="body1">{authorName}  </Typography>
                    </Stack>


                }
            />
            <Box
                sx={{
                    pb: 2,
                    px: 3,
                }}
            >
                <Typography variant="body1"  sx={{ fontSize: '1.3rem'}}>{message}</Typography>
                {media && (
                    <Box sx={{ mt: 3 }}>
                        <CardActionArea>

                            <CardMedia
                                image={media}
                                sx={{
                                    backgroundPosition: 'top',
                                    height: 500,
                                }}
                            />
                        </CardActionArea>
                    </Box>
                )}
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{ mt: 2 }}
                >
                    <div>
                        <Stack
                            alignItems="center"
                            direction="row"
                        >
                            {isLiked ? (
                                <Tooltip title="Unlike">
                                    <IconButton onClick={handleUnlike}>
                                        <SvgIcon
                                            sx={{
                                                color: 'error.main',
                                                '& path': {
                                                    fill: (theme) => theme.palette.error.main,
                                                    fillOpacity: 1,
                                                },
                                            }}
                                        >
                                            <HeartIcon />
                                        </SvgIcon>
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <Tooltip title="Like">
                                    <IconButton onClick={handleLike}>
                                        <SvgIcon>
                                            <HeartIcon />
                                        </SvgIcon>
                                    </IconButton>
                                </Tooltip>
                            )}
                            <Typography
                                color="text.secondary"
                                variant="subtitle2"
                            >
                                {likes}
                            </Typography>
                        </Stack>
                    </div>
                    <div>
                        <IconButton>
                            <SvgIcon>
                                <Share07Icon />
                            </SvgIcon>
                        </IconButton>
                    </div>
                </Stack>
                <Divider sx={{ my: 3 }} />
                <Stack spacing={3}>

                    {comments.map((comment) => (
                        <SocialComment
                            authorAvatar={comment?.avatar}
                            authorName={comment?.name}
                            createdAt={comment.createdAt}
                            key={comment.postId}
                            message={comment.message}
                        />

                    ))}
                </Stack>
                <Divider sx={{ my: 2 }} />

                <SocialCommentAdd postId={postId!} />


            </Box>
        </Card>

    );
};

SocialPostCard.propTypes = {


    avatar: PropTypes.string,
    postId: PropTypes.string,
    authorName: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    createdAt: PropTypes.number.isRequired,
    isLiked: PropTypes.bool,
    likes: PropTypes.number,
    media: PropTypes.string,
    message: PropTypes.string.isRequired,
    // if you have the key 'id' as a prop, then add it as well:
    // id: PropTypes.string.isRequired
};

