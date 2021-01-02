import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Typography,
  Card,
  Box,
  TextField,
  Button,
  Grid
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import { assignCurrentUser } from '../../modules/user'
import { displayAlertMessage } from '../../modules/alertMessage'

const CssTextField = withStyles((theme) => ({
  root: {
    width: 250,
    '& label.Mui-focused': {
      color: theme.palette.secondary.main,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.quaternary.main,
    },
  },
}))(TextField);

const useStyles = makeStyles((theme) => ({
  titleBox: {
    margin: '8px 0',
    textAlign: 'center',
  },
  grid: {
    
  },
  signInFormCard: {
    margin: '10px auto',
    textAlign: 'center',
    background: theme.palette.tertiary.main,
    padding: 10,
    width: 300,
    height: 225,
  },
  signUpFormCard: {
    margin: '10px auto',
    textAlign: 'center',
    background: theme.palette.tertiary.main,
    padding: 10,
    width: 300,
    height: 375,
  },
  button: {
    marginTop: 18,
    background: theme.palette.quaternary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
    '&:focus': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
  },
  dropzone: {
    textAlign: 'center',
    borderStyle: 'dashed',
    borderColor: theme.palette.quaternary.main,
    borderRadius: 5,
    margin: '25px 20px 0px 20px',
  },
  dropzoneButton: {
    '&:focus': {
      outline: 'none',
    },
    width: '100%'
  },
  dropzoneText: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
    padding: '10px 0',
  },
}))

const Login = props => {
  const classes = useStyles()

  const defaultSignInFormData = {
    email: '',
    password: '',
  }

  const defaultSignUpFormData = {
    email: '',
    password: '',
    password_confirmation: '',
    profile_photo: ''
  }

  const [signInFormData, setSignInFormData] = useState(defaultSignInFormData)
  const [signUpFormData, setSignUpFormData] = useState(defaultSignUpFormData)

  const handleSignInFormChange = (event) => {
    event.preventDefault()
    setSignInFormData({
      ...signInFormData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSignUpFormChange = (event) => {
    event.preventDefault()
    setSignUpFormData({
      ...signUpFormData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleFileUpload = acceptedFiles => {
    setSignUpFormData({
      ...signUpFormData,
      profile_photo: acceptedFiles[0]
    })
  }

  const signIn = (signInPayload) => {
    fetch('/api/v1/users/sign_in_user', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({user: signInPayload}),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(userData => {
      if (userData.error) {
        props.displayAlertMessage(userData.error)
      } else {
        props.assignCurrentUser(userData)
        props.displayAlertMessage('Welcome to The Dad-a-base!')
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const signUp = () => {
    let formPayload = new FormData()
    formPayload.append('user[email]', signUpFormData.email)
    formPayload.append('user[password]', signUpFormData.password)
    formPayload.append('user[password_confirmation]', signUpFormData.password_confirmation)
    formPayload.append('user[profile_photo]', signUpFormData.profile_photo)

    fetch('api/v1/users', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Accept': 'image/jpeg'
      },
      body: formPayload
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(userData => {
      if (userData.error) {
        props.displayAlertMessage(userData.error)
      } else {
        props.assignCurrentUser(userData)
        props.displayAlertMessage('Welcome to The Dad-a-base!')
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const signInFormSubmitHandler = (event) => {
    event.preventDefault()
    signIn(signInFormData)
  }

  const signUpFormSubmitHandler = (event) => {
    event.preventDefault()
    signUp(signUpFormData)
    props.displayAlertMessage('Processing your request...')
  }

  let page = (
    <Grid container className={classes.grid}>
      <Grid item xs={12} sm={6}>
        <Card className={classes.signInFormCard}>
          <Box className={classes.titleBox}>
            <Typography variant='h6'>Sign In</Typography>
          </Box>
          <form onSubmit={signInFormSubmitHandler}>
            <Box>
              <CssTextField
                label="Email"
                type="text"
                name="email"
                onChange={handleSignInFormChange}
                value={signInFormData.email}
              />
            </Box>
            <Box>
              <CssTextField
                label="Password"
                type="password"
                name="password"
                onChange={handleSignInFormChange}
                value={signInFormData.password}
              />
            </Box>
            <Box>
              <Button
                className={classes.button}
                color="inherit"
                type="submit"
              >
                Sign In
              </Button>
            </Box>
          </form>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card className={classes.signUpFormCard}>
          <Box className={classes.titleBox}>
            <Typography variant='h6'>Sign Up</Typography>
          </Box>
          <form onSubmit={signUpFormSubmitHandler}>
            <Box>
              <CssTextField
                label="Email"
                type="text"
                name="email"
                onChange={handleSignUpFormChange}
                value={signUpFormData.email}
              />
            </Box>
            <Box>
              <CssTextField
                label="Password"
                type="password"
                name="password"
                onChange={handleSignUpFormChange}
                value={signUpFormData.password}
              />
            </Box>
            <Box>
              <CssTextField
                label="Password Confirmation"
                type="password"
                name="password_confirmation"
                onChange={handleSignUpFormChange}
                value={signUpFormData.password_confirmation}
              />
            </Box>
            <Dropzone onDrop={handleFileUpload}>
              {({getRootProps, getInputProps}) => (
                <section className={classes.dropzone}>
                  <Button {...getRootProps()} className={classes.dropzoneButton}>
                    <input {...getInputProps()} />
                    <Typography variant='body2' className={classes.dropzoneText}>
                      Click or drag 'n' drop your profile photo here
                    </Typography>
                  </Button>
                </section>
              )}
            </Dropzone>
            <Box>
              <Button
                className={classes.button}
                color="inherit"
                type="submit"
              >
                Sign Up
              </Button>
            </Box>
          </form>
        </Card>
      </Grid>
    </Grid>
  )

  if (props.currentUser !== null) {
    page = <Redirect to='/'/>
  }

  return <>{page}</>
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    assignCurrentUser: (userData) => dispatch(assignCurrentUser(userData)),
    displayAlertMessage: (message) => dispatch(displayAlertMessage(message))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)