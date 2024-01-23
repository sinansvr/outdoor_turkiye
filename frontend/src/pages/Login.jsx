import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import { object, string } from "yup"
import useAuthCall from "../hooks/useAuthCall"
import { useNavigate } from 'react-router-dom';



export default function SignInSide() {
  const navigate = useNavigate()

  const { login } = useAuthCall()

  const loginSchema = object({
    email: string().email("Please, enter a valid email!")
      .required("This field is required!"),
    password: string()
      .required("This field is required!")
      .min(8, "At least 8 characters must be entered")
      .max(16, "Maximum 16 characters must be entered")
      .matches(/\d+/, "Must contain at least one digit.")
      .matches(/[a-z]/, "Must contain at least one lowercase letter.")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter.")
      .matches(/[!,?{}><%&$*#£+-.]+/, "Must contain at least one special character.")

  })

  return (

    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, action) => {
              login(values)
              action.resetForm()
              action.setSubmitting(false)
              navigate(-1)
            }}
          >
            {({ handleChange, handleBlur, values, touched, errors }) => (

              <Form>
                <Box sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    fullWidth
                    autoComplete="email"
                    id="email"
                    label="Email Address"
                    name="email"
                    autoFocus
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={touched.email && Boolean(errors.email)}
                    helperText={errors.email}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={touched.password && Boolean(errors.password)}
                    helperText={errors.password}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>



                </Box>
              </Form>

            )}

          </Formik>

          <Grid container>
            <Grid item m={"auto"}>
              <Link onClick={()=>navigate("/register")} href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>

        </Box>
      </Grid>
    </Grid>

  );
}