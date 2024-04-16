import type { NextPage } from 'next';
import React, { useState } from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import {tokens} from "src/locales/tokens";
import { useTranslation } from 'react-i18next';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { Layout as AuthLayout } from 'src/layouts/auth/modern-layout';
import { paths } from 'src/paths';
import { auth} from 'src/libs/firebase';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

interface Values {
    email: string;
}

const initialValues: Values = {
    email: '',
};

const validationSchema = Yup.object({
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
});

const Page: NextPage = () => {
    const [showMessage, setShowMessage] = useState(false);
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values): Promise<void> => {
            console.log("Form submitted"); // Debug line
            try {
                const auth = getAuth();
                await sendPasswordResetEmail(auth, values.email);
                console.log('Password reset email sent.');
                setShowMessage(true);
            } catch (error) {
                console.log('Error sending email:', error);
            }



        },
    });


    return (
        <>
            <Seo title="Forgot Password" />
            <div>
                <Card elevation={16}>
                    <CardHeader
                        title=""
                        // Add any other headers or subheaders you need
                    />
                    <CardContent>
                        <Box sx={{ mb: 4 }}>
                            <Link
                                color="text.primary"
                                component={RouterLink}
                                href={paths.auth.firebase.login}
                                sx={{
                                    alignItems: 'center',
                                    display: 'inline-flex',
                                }}
                                underline="hover"
                            >
                                <SvgIcon sx={{ mr: 1 }}>
                                    <ArrowLeftIcon />
                                </SvgIcon>
                                <Typography variant="subtitle2">Previous</Typography>
                            </Link>
                        </Box>
                        <Stack
                            sx={{ mb: 4 }}
                            spacing={1}
                        >
                            <Typography variant="h6">{t(tokens.form.forgotPassword)}</Typography>
                            {/* ... */}
                            {showMessage && (
                                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                                    {t(tokens.form.emailSentMessage)}
                                </Typography>
                            )}

                        </Stack>
                        <form
                            noValidate
                            onSubmit={formik.handleSubmit}
                        >
                            <TextField
                                autoFocus
                                error={!!(formik.touched.email && formik.errors.email)}
                                fullWidth
                                helperText={formik.touched.email && formik.errors.email}
                                label="Email Address"
                                name="email"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="email"
                                value={formik.values.email}
                            />
                            <Button
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                type="submit"
                                variant="contained"
                            >
                                {t(tokens.form.sendResetLink)}
                            </Button>
                        </form>

                        {showMessage && (
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                                {t(tokens.form.emailSentMessage)}
                            </Typography>
                        )}


                    </CardContent>
                </Card>
            </div>
        </>
    );

};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
