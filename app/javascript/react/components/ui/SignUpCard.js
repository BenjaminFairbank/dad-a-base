import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'

import { makeStyles, withStyles } from '@material-ui/core/styles'
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone'
import VisibilityOffTwoToneIcon from '@material-ui/icons/VisibilityOffTwoTone'

import { assignCurrentUser } from '../../modules/user'
import { displayAlertMessage } from '../../modules/alertMessage'

const CssTextField = withStyles((theme) => ({
  root: {
    marginTop: 5,
    width: '100%',
    '& label.Mui-focused': {
      color: theme.palette.primary.main,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.primary.main,
    },
  },
}))(TextField)

const useStyles = makeStyles((theme) => ({
  titleBox: {
    margin: '8px 0',
    textAlign: 'center',
  },
  signUpFormCard: {
    borderRadius: 8,
    margin: '10px auto',
    textAlign: 'center',
    background: theme.palette.tertiary.main,
    padding: '10px 25px',
    width: 300,
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
    marginBottom: 15,
  },
  dropzone: {
    textAlign: 'center',
    borderStyle: 'dashed',
    borderColor: theme.palette.tertiary.main,
    borderRadius: 5,
    marginTop: 25,
  },
  dropzoneButton: {
    '&:focus': {
      outline: 'none',
    },
    width: '100%',
    overflow: 'hidden',
  },
  dropzoneText: {
    fontWeight: 'bold',
    padding: '10px 0',
  },
  fileName: {
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    hyphens: 'auto',
  },
  passwordBox: {
    display: 'flex',
  },
  passwordField: {
    display: 'inline-flex',
    flex: 1,
  },
  passwordVisButton: {
    padding: 0,
    marginTop: 20,
    height: 30,
    width: 30,
  },
  icon: {
    marginTop: 1,
  },
  alert: {
    color: theme.palette.primary.main
  },
}))

const SignUpCard = props => {
  const classes = useStyles()

  const defaultSignUpFormData = {
    email: '',
    user_name: '',
    password: '',
    password_confirmation: '',
    profile_photo: '',
    about_me: '',
  }

  const [signUpFormData, setSignUpFormData] = useState(defaultSignUpFormData)
  const [passwordVisibility, setpasswordVisibility] = useState(false)
  const [passwordConfirmationVisibility, setpasswordConfirmationVisibility] = useState(false)

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

  const signUp = () => {
    let formPayload = new FormData()
    formPayload.append('user[email]', signUpFormData.email)
    formPayload.append('user[user_name]', signUpFormData.user_name)
    formPayload.append('user[password]', signUpFormData.password)
    formPayload.append('user[password_confirmation]', signUpFormData.password_confirmation)
    formPayload.append('user[profile_photo]', signUpFormData.profile_photo)
    formPayload.append('user[about_me]', signUpFormData.about_me)

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

  const signUpFormSubmitHandler = (event) => {
    event.preventDefault()
    signUp(signUpFormData)
    props.displayAlertMessage('Processing your request...')
  }

  return (
    <>
      <Box className={classes.titleBox}>
        <Typography variant='h6'>Sign Up</Typography>
      </Box>
      {props.alertMessage !== '' &&
        <Typography variant='body2' className={classes.alert}>{props.alertMessage}</Typography>
      }
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
            label="User Name"
            type="text"
            name="user_name"
            onChange={handleSignUpFormChange}
            value={signUpFormData.user_name}
            placeholder='(15 character maximum)'
          />
        </Box>
        <Box className={classes.passwordBox}>
          <CssTextField
            className={classes.passwordField}
            label="Password"
            type={passwordVisibility ? "text" : "password"}
            name="password"
            onChange={handleSignUpFormChange}
            value={signUpFormData.password}
            placeholder='(6 character minimum)'
          />
          <IconButton
            className={classes.passwordVisButton}
            onClick={()=>{setpasswordVisibility(!passwordVisibility)}}
          >
            {passwordVisibility && <VisibilityOffTwoToneIcon className={classes.icon} />}
            {!passwordVisibility && <VisibilityTwoToneIcon className={classes.icon} />}
          </IconButton>
        </Box>
        <Box className={classes.passwordBox}>
          <CssTextField
            className={classes.passwordField}
            label="Password Confirmation"
            type={passwordConfirmationVisibility ? "text" : "password"}
            name="password_confirmation"
            onChange={handleSignUpFormChange}
            value={signUpFormData.password_confirmation}
            placeholder='(6 character minimum)'
          />
          <IconButton
            className={classes.passwordVisButton}
            onClick={()=>{setpasswordConfirmationVisibility(!passwordConfirmationVisibility)}}
          >
            {passwordConfirmationVisibility && <VisibilityOffTwoToneIcon className={classes.icon} />}
            {!passwordConfirmationVisibility && <VisibilityTwoToneIcon className={classes.icon} />}
          </IconButton>
        </Box>
        <Dropzone onDrop={handleFileUpload}>
          {({getRootProps, getInputProps}) => (
            <section className={classes.dropzone}>
              <Button {...getRootProps()} className={classes.dropzoneButton}>
                <input {...getInputProps()} />
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant='body2' className={classes.dropzoneText}>
                      Click or drag 'n' drop your profile photo here
                    </Typography>
                  </Grid>
                  {signUpFormData.profile_photo !== '' &&
                    <>
                      <Grid item xs={12}>
                        <Typography variant='subtitle2'>Upload:</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant='subtitle2' className={classes.fileName}>
                          {signUpFormData.profile_photo.name}
                        </Typography>
                      </Grid>
                    </>
                  }
                </Grid>
              </Button>
            </section>
          )}
        </Dropzone>
        <Box>
          <CssTextField
            label="About Me"
            type="text"
            name="about_me"
            onChange={handleSignUpFormChange}
            value={signUpFormData.about_me}
            multiline
            rowsMax={4}
            placeholder='(255 character maximum)'
          />
        </Box>
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
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    alertMessage: state.alertMessage.message
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
)(SignUpCard)