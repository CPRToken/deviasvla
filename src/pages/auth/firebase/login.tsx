import type { NextPage } from 'next';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { tokens } from 'src/locales/tokens';
import { useTranslation } from 'react-i18next';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import type { AuthContextType } from 'src/contexts/auth/firebase';
import { GuestGuard } from 'src/guards/guest-guard';
import { IssuerGuard } from 'src/guards/issuer-guard';
import { useAuth } from 'src/hooks/use-auth';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { useRouter } from 'src/hooks/use-router';
import { useSearchParams } from 'src/hooks/use-search-params';
import { Layout as AuthLayout } from 'src/layouts/auth/modern-layout';
import { paths } from 'src/paths';

import { Issuer } from 'src/utils/auth';
import React, {useState} from "react";


interface Values {
    email: string;
    password: string;
    submit: null;
}

const initialValues: Values = {
    email: '',
    password: '',
    submit: null,
};

const validationSchema = Yup.object({
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: Yup.string().max(255).required('Password is required'),
});

const Page: NextPage = () => {
    const isMounted = useMounted();
  const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const returnTo = searchParams.get('returnTo');
    const { issuer, signInWithEmailAndPassword} = useAuth<AuthContextType>();
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers): Promise<void> => {
            try {
                await signInWithEmailAndPassword(values.email, values.password);



             if (isMounted()) {
                 router.push(paths.dashboard.index);
            }
        } catch (err) {
            console.error(err);
            helpers.setFieldError('submit', err.message);
        }
    },
});

    const { t } = useTranslation();

    usePageView();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

    return (
        <>
            <Seo title="Login" />
            <div>
                <Card elevation={16}>
                    <CardHeader
                        subheader={
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                Don&apos;t have an account? &nbsp;
                                <Link
                                    component={RouterLink}
                                    href={paths.auth.firebase.register}
                                    underline="hover"
                                    variant="subtitle2"
                                >
                                    Register
                                </Link>
                            </Typography>
                        }
                        sx={{ pb: 0 }}
                        title={t(tokens.headings.logInTitle)}
                    />
                    <CardContent>
                        <form
                            noValidate
                            onSubmit={formik.handleSubmit}
                        >
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    mt: 3,
                                }}
                            >

                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        display: 'flex',
                                        mt: 2,
                                    }}
                                >
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Divider orientation="horizontal" />
                                    </Box>
                                    <Typography
                                        color="text.secondary"
                                        sx={{ m: 2 }}
                                        variant="body1"
                                    >
                                        OR
                                    </Typography>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Divider orientation="horizontal" />
                                    </Box>
                                </Box>
                            </Box>
                            <Stack spacing={3}>
                                <TextField
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
                              <TextField
                                error={Boolean(formik.touched.password && formik.errors.password)}
                                fullWidth
                                helperText={formik.touched.password && formik.errors.password}
                                label="Password"
                                name="password"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type={showPassword ? 'text' : 'password'}
                                value={formik.values.password}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                      >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Stack>
                            {formik.errors.submit && (
                                <FormHelperText
                                    error
                                    sx={{ mt: 3 }}
                                >
                                    {formik.errors.submit as string}
                                </FormHelperText>
                            )}
                            <Box sx={{ mt: 2 }}>
                                <Button
                                    disabled={formik.isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                >
                                    Log In
                                </Button>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Link
                                    component={RouterLink}
                                    href={paths.auth.firebase.forgot}
                                    sx={{ fontStyle: 'italic', fontSize: '14px' }}
                                >
                                    {t(tokens.form.forgotPassword)}
                                </Link>
                            </Box>



                        </form>
                    </CardContent>
                </Card>
                <Stack
                    spacing={3}
                    sx={{ mt: 3 }}
                >


                </Stack>
            </div>
        </>
    );
};

Page.getLayout = (page) => (
    <IssuerGuard issuer={Issuer.Firebase}>
        <GuestGuard>
            <AuthLayout>{page}</AuthLayout>
        </GuestGuard>
    </IssuerGuard>
);

export default Page;
