import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, Form } from "formik";
import MyTextField from "./MyTextField";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  textfield: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    paddingTop: theme.spacing(0),
    paddingBottom: 0
  }
}));

const signUpSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  username: Yup.string()
    .required("Username required")
    .min(6, "Username must be atleast 6 characters long"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password must be atleast 8 characters long")
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])/,
      "Password must contain atleast one letter and one number"
    ),
  confirmPW: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match")
});

export default function SignUp({ handleChangeLoginPage }) {
  const classes = useStyles();

  const signUp = () => {};

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            confirmPW: ""
          }}
          onSubmit={(values, actions) => {
            signUp();
          }}
          validationSchema={signUpSchema}
          validateOnChange
          validateOnBlur
        >
          {({
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset
          }) => (
            <Form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <MyTextField
                    className={classes.textfield}
                    name="firstName"
                    id="firstName"
                    label="First Name"
                    autoComplete="fname"
                    // autoFocus
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    hasError={touched.firstName && !!errors.firstName}
                    errorMsg={errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.textfield}>
                  <MyTextField
                    className={classes.textfield}
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    value={values.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    hasError={touched.lastName && !!errors.lastName}
                    errorMsg={errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MyTextField
                    className={classes.textfield}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    hasError={touched.email && !!errors.email}
                    errorMsg={errors.email}
                  />
                </Grid>

                <Grid item xs={12}>
                  <MyTextField
                    className={classes.textfield}
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={values.username}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    hasError={touched.username && !!errors.username}
                    errorMsg={errors.username}
                  />
                </Grid>

                <Grid item xs={12}>
                  <MyTextField
                    className={classes.textfield}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    hasError={touched.password && !!errors.password}
                    errorMsg={errors.password}
                  />
                </Grid>

                <Grid item xs={12}>
                  <MyTextField
                    className={classes.textfield}
                    name="confirmPW"
                    label="Confirm Password"
                    type="password"
                    id="confirmPW"
                    // autoComplete="current-password"
                    value={values.confirmPW}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    hasError={touched.confirmPW && !!errors.confirmPW}
                    errorMsg={errors.confirmPW}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={handleChangeLoginPage}
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
