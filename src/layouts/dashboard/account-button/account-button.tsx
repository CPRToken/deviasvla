import type { FC } from 'react';
import User01Icon from '@untitled-ui/icons-react/build/esm/User01';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import SvgIcon from '@mui/material/SvgIcon';
import React, { useState, useEffect } from 'react';
import { usePopover } from 'src/hooks/use-popover';
import { AccountPopover } from './account-popover';
import { Profile } from "../../../types/social";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {socialApi} from "../../../api/social/socialApi";



const useProfile = (): Profile | null => {
    const [user, setUser] = useState<Profile | null>(null);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                console.log("Current user ID:", uid);

                try {
                    const response = await socialApi.getProfile({ uid });
                    console.log("Profile data fetched:", response);
                    setUser(response);
                } catch (err) {
                    console.error("Error fetching profile data:", err);
                }
            } else {
                // Optionally handle the case when no user is signed in.
                setUser(null);  // for example, reset the profile to null.
            }
        });

        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, []);

    return user;
};

export const AccountButton: FC = () => {
    const user = useProfile();
    const popover = usePopover<HTMLButtonElement>();

    return (
        <>
            <Box
                component={ButtonBase}
                onClick={popover.handleOpen}
                ref={popover.anchorRef}
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    borderWidth: 2,
                    borderStyle: 'solid',
                    borderColor: 'divider',
                    height: 40,
                    width: 40,
                    borderRadius: '50%',
                }}
            >
                <Avatar
                    sx={{
                        height: 40,
                        width: 40,
                    }}
                    src={user?.avatar}
                >
                    <SvgIcon>
                        <User01Icon />
                    </SvgIcon>
                </Avatar>
            </Box>
            <AccountPopover
                anchorEl={popover.anchorRef.current}
                onClose={popover.handleClose}
                open={popover.open}
                name={user?.name || ""}
                email={user?.email || ""}
            />
        </>
    );
};
