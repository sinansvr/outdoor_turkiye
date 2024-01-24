
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Formik, Form } from "formik"
import useAuthCall from '../hooks/useAuthCall';
import { object, string } from "yup"


export default function Register() {
  const { register } = useAuthCall()
  
  const registerSchema = object({
    firstName:string()
    .required("This field is required!"),
    lastName:string()
    .required("This field is required!"),
    username:string()
    .required("This field is required!")
    .min(6, "At least 6 characters must be entered"),
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

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" mb={1}>
          Sign up
        </Typography>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: ""
          }}
          validationSchema={registerSchema}
          onSubmit={(values, action) => {
            register(values)
            action.resetForm()
            action.setSubmitting(false)
          }}
        >
          {({ handleChange, handleBlur, values, touched, errors }) => (
            <Form>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Grid container spacing={2}>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12} >
                    <TextField
                      required
                      fullWidth
                      id="username"
                      label="User Name"
                      name="username"
                      
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      error={touched.username && Boolean(errors.username)}
                      helperText={errors.username}
                    />
                  </Grid>
                  <Grid item xs={12} >
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      id="email"
                      type="email"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      error={touched.email && Boolean(errors.email)}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="password"
                      name="password"
                      id="password"
                      type="password"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      error={touched.password && Boolean(errors.password)}
                      helperText={errors.password}
                    />
                  </Grid>
                  
                </Grid>


                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Box>
            </Form>
          )}

        </Formik>

      </Box>

    </Container>

  );
}