import React from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

// material-ui
import {
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project import
// import FirebaseSocial from "./FirebaseSocial";
import AnimateButton from "components/@extended/AnimateButton";

// assets
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useNavigate } from "../../../../node_modules/react-router/dist/index";

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
    const [checked, setChecked] = React.useState(false);
    const navigate = useNavigate();

    const [submitSuccess, setSubmitSuccess] = React.useState(false);
    const [failure, setFailure] = React.useState(false);
    const [response_msg, setMsg] = React.useState("");

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string()

                        .max(255)
                        .required("Usernameis required"),
                    password: Yup.string()
                        .max(255)
                        .required("Password is required"),
                })}
                onSubmit={async (
                    values,
                    { setErrors, setStatus, setSubmitting }
                ) => {
                    try {
                        console.log(values);
                        const response = await axios.post(
                            "http://localhost:8800/api/auth/loginAdmin",
                            values,
                            { withCredentials: true }
                        );
                        console.log(
                            "Authentication successful!",
                            response.data
                        );

                        // console.log("Authentication successful!", response.data);

                        // setSubmitSuccess(true);
                        setMsg(response.data.message);
                        setFailure(false);
                        localStorage.setItem(
                            "Admin-username",
                            response.data.username
                        );
                        localStorage.setItem(
                            "admin_id",
                            response.data.admin_id
                        );
                        setStatus({ success: true });
                        setSubmitting(true);
                        navigate("/");
                    } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: "Invalid username or password" });
                        setSubmitting(false);
                    }
                }}>
                {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values,
                }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-login">
                                        User name
                                    </InputLabel>
                                    <OutlinedInput
                                        id="email-login"
                                        type="text"
                                        value={values.username}
                                        name="username"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter username"
                                        fullWidth
                                        error={Boolean(
                                            touched.username && errors.username
                                        )}
                                    />
                                    {touched.username && errors.username && (
                                        <FormHelperText
                                            error
                                            id="standard-weight-helper-text-email-login">
                                            {errors.username}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-login">
                                        Password
                                    </InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(
                                            touched.password && errors.password
                                        )}
                                        id="-password-login"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                    edge="end"
                                                    size="large">
                                                    {showPassword ? (
                                                        <EyeOutlined />
                                                    ) : (
                                                        <EyeInvisibleOutlined />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="Enter password"
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText
                                            error
                                            id="standard-weight-helper-text-password-login">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            {/* <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="h6">Keep me sign in</Typography>
                    }
                  />
                  <Link
                    variant="h6"
                    component={RouterLink}
                    to=""
                    color="text.primary"
                  >
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid> */}
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>
                                        {errors.submit}
                                    </FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary">
                                        Login
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            {/* <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption"> Login with</Typography>
                </Divider>
              </Grid> */}
                            {/* <Grid item xs={12}>
                <FirebaseSocial />
              </Grid> */}
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthLogin;
