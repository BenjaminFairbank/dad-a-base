import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
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
}))(TextField)

const useStyles = makeStyles((theme) => ({
  titleBox: {
    margin: '8px 0',
    textAlign: 'center',
  },
  signUpFormCard: {
    margin: '10px auto',
    textAlign: 'center',
    background: theme.palette.tertiary.main,
    padding: 10,
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
    borderColor: theme.palette.quaternary.main,
    borderRadius: 5,
    margin: '25px 20px 0px 20px',
  },
  dropzoneButton: {
    '&:focus': {
      outline: 'none',
    },
    width: '100%',
    overflow: 'hidden',
  },
  dropzoneText: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
    padding: '10px 0',
  },
  fileName: {
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    hyphens: 'auto',
  }
}))

const SignUpCard = props => {
  const classes = useStyles()

  const defaultSignUpFormData = {
    email: '',
    password: '',
    password_confirmation: '',
    profile_photo: ''
  }

  const [signUpFormData, setSignUpFormData] = useState(defaultSignUpFormData)

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

  const signUpFormSubmitHandler = (event) => {
    event.preventDefault()
    signUp(signUpFormData)
    props.displayAlertMessage('Processing your request...')
  }

  return (
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
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    assignCurrentUser: (userData) => dispatch(assignCurrentUser(userData)),
    displayAlertMessage: (message) => dispatch(displayAlertMessage(message))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SignUpCard)