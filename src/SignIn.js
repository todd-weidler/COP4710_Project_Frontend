import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, Form } from "formik";
import MyTextField from "./MyTextField";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";

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
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const signInSchema = Yup.object().shape({
  username: Yup.string().required("Username required"),
  password: Yup.string().required("Password Required")
});

export default function SignIn({ handleChangeLoginPage }) {
  const classes = useStyles();

  const handleSubmit = () => {};

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Formik
          initialValues={{
            username: "",
            password: ""
          }}
          onSubmit={(values, actions) => {
            handleSubmit();
          }}
          // validate={(values) => validate(values)}
          validationSchema={signInSchema}
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
              <MyTextField
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
              <MyTextField
                hasError={touched.password && !!errors.password}
                errorMsg={errors.password}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <Grid container>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={handleChangeLoginPage}
                  >
                    {"Don't have an account? Sign Up"}
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
