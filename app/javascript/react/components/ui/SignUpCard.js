import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

import { withStyles } from '@material-ui/core/styles'

import useStyles from '../../styles/signUpStyles'

import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone'
import VisibilityOffTwoToneIcon from '@material-ui/icons/VisibilityOffTwoTone'
import CropSharpIcon from '@material-ui/icons/CropSharp'

import { assignCurrentUser } from '../../modules/user'
import { displayAlertMessage } from '../../modules/alertMessage'

import ReactCropper from './ReactCropper'

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
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
                {signUpFormData.profile_photo === '' &&
                  <Typography variant='body2' className={classes.dropzoneText}>
                    Click or drag 'n' drop your profile photo here
                  </Typography>
                }
                {signUpFormData.profile_photo !== '' &&
                  <Typography variant='subtitle2' className={classes.fileName}>
                    Upload: {signUpFormData.profile_photo.name}
                  </Typography>
                }
              </Button>
            </section>
          )}
        </Dropzone>
        {signUpFormData.profile_photo !== '' && 
          <Button
            onClick={handleOpen}
            className={classes.cropButton}
            size='large'
          >
            Crop Profile Photo &nbsp;&nbsp;<CropSharpIcon size="small" />
          </Button>
        }
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
            className={classes.aboutMe}
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
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box className={classes.paper}>
              <ReactCropper
                formData={signUpFormData}
                setFormData={setSignUpFormData}
                handleClose={handleClose}
                userForm={true}
              />
            </Box>
          </Fade>
        </Modal>
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