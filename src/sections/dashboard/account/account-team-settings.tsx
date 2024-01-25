import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DotsHorizontalIcon from '@untitled-ui/icons-react/build/esm/DotsHorizontal';
import Mail01Icon from '@untitled-ui/icons-react/build/esm/Mail01';
import User01Icon from '@untitled-ui/icons-react/build/esm/User01';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {auth, db} from 'src/libs/firebase';
import {collection, getDocs, addDoc, query, onSnapshot, doc, getDoc} from 'firebase/firestore';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import {Profile} from "../../../types/social";

interface Member {
  avatar: string;
  email: string;
  name: string;
  role: string;
}

interface AccountTeamSettingsProps {
  members: Member[];
}

export const AccountTeamSettings: FC<AccountTeamSettingsProps> = (props) => {
    const { members } = props;
  const [uid, setUid] = useState<string | null>(auth.currentUser ? auth.currentUser.uid : null);
  const [user , setUser] = useState<Profile | null>(null);
  const [newMembers, setMembers] = useState<Member[]>([]);
  const [userUrl, setUserUrl] = useState(null);
const { currentUser } = auth;
  const [emailToInvite, setEmailToInvite] = useState('');


  useEffect(() => {
    const q = query(collection(db, 'team members'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let fetchedMembers: Member[] = [];
      snapshot.forEach((doc) => {
        fetchedMembers.push(doc.data() as Member);
      });
      setMembers(fetchedMembers);
    });
    return () => unsubscribe();
  }, []);



  useEffect(() => {
    if (currentUser && currentUser.uid) {
      const userDocRef = doc(db, 'users', currentUser.uid);

      getDoc(userDocRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          setUserUrl(docSnapshot.data().userUrl);
        }
      }).catch((error) => {
        console.error("Error fetching user data:", error);
      });
    }
  }, [currentUser]);



  const handleInvite = async () => {
    if (!userUrl) {
      console.error("userUrl is null or undefined");
      return;
    }


    const inviteLink = `http://localhost:3000/${userUrl}?invite=true`;
    const senderName = user ? user.name : null;

    // Create the payload for the email invitation
    const payload = {
      uid: uid,
      to: emailToInvite,
      inviteLink: inviteLink,
      name: senderName,
      avatar: 'new-avatar-url',
      newMemberName: 'New Member',
      role: 'Standard',
    };

    // Add new member to Firestore
    try {
      const docRef = await addDoc(collection(db, "team members"), {
        email: emailToInvite,
        name: senderName,
        role: 'Standard',
        avatar: 'new-avatar-url',
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    // Send the email invite
    try {
      const response = await fetch('/api/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        // handle successful email sending
      }
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <Card>
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            md={4}
          >
            <Stack spacing={1}>
              <Typography variant="h6">Invite members</Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                You currently pay for 2 Editor Seats.
              </Typography>
            </Stack>
          </Grid>
          <Grid
            xs={12}
            md={8}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={3}
            >
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon>
                        <Mail01Icon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                label="Email address"
                value={emailToInvite}
                onChange={(e) => setEmailToInvite(e.target.value)}
                sx={{ flexGrow: 1 }}
                type="email"
              />
              <Button variant="contained" onClick={handleInvite}>Send Invite</Button>

            </Stack>
          </Grid>
        </Grid>
      </CardContent>
      <Scrollbar>
        <Table sx={{ minWidth: 400 }}>
          <TableHead>
            <TableRow>
              <TableCell>Member</TableCell>
              <TableCell>Role</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Stack
                    alignItems="center"
                    direction="row"
                    spacing={1}
                  >
                    <Avatar
                      src={member.avatar}
                      sx={{
                        height: 40,
                        width: 40,
                      }}
                    >
                      <SvgIcon>
                        <User01Icon />
                      </SvgIcon>
                    </Avatar>
                    <div>
                      <Typography variant="subtitle2">{member.name}</Typography>
                      <Typography
                        color="text.secondary"
                        variant="body2"
                      >
                        {member.email}
                      </Typography>
                    </div>
                  </Stack>
                </TableCell>
                <TableCell>
                  {member.role === 'Owner' ? (
                    <SeverityPill>{member.role}</SeverityPill>
                  ) : (
                    member.role
                  )}
                </TableCell>
                <TableCell align="right">
                  <IconButton>
                    <SvgIcon>
                      <DotsHorizontalIcon />
                    </SvgIcon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </Card>
  );
};

AccountTeamSettings.propTypes = {
  members: PropTypes.array.isRequired,
};

