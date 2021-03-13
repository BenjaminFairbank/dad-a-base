import React, { useState } from 'react'
import { connect } from 'react-redux'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone'
import VisibilityOffTwoToneIcon from '@material-ui/icons/VisibilityOffTwoTone'

import { withStyles } from '@material-ui/core/styles'
import useStyles from '../../styles/changePasswordFormStyles'

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

const ChangePasswordForm = props => {
  const classes = useStyles()

  const initialPasswordData = {
    email: props.user.email,
    current_password: '',
    password: '',
    password_confirmation: ''
  }

  const [updatePasswordFormData, setUpdatePasswordFormData] = useState(initialPasswordData)
  const [currentPasswordVisibility, setCurrentPasswordVisibility] = useState(false)
  const [passwordVisibility, setpasswordVisibility] = useState(false)
  const [passwordConfirmationVisibility, setpasswordConfirmationVisibility] = useState(false)

  const handlePasswordFormChange = event => {
    setUpdatePasswordFormData({
      ...updatePasswordFormData,
      [event.currentTarget.name]: event.target.value
    })
  }

  const updatePassword = (id, passwordData) => {
    fetch(`/api/v1/users/change_password/${id}`, {
      credentials: 'same-origin',
      method: 'PATCH',
      body: JSON.stringify({user: passwordData}),
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
    .then(body => {
      if (body.success) {
        props.displayAlertMessage(body.success)
        props.handleClosePW()
        setUpdatePasswordFormData(initialPasswordData)
      } else {
        props.displayAlertMessage(body.error)
      }
      props.setUpdating(false)
      props.setEditingMode(false)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const passwordChangeValidForSubmission = () => {
    return (
      updatePasswordFormData.password === updatePasswordFormData.password_confirmation &&
      updatePasswordFormData.current_password.length >= 6 &&
      updatePasswordFormData.password.length >= 6 &&
      updatePasswordFormData.password_confirmation.length >= 6 &&
      updatePasswordFormData.password !== updatePasswordFormData.current_password &&
      updatePasswordFormData.password_confirmation !== updatePasswordFormData.current_password
    )
  }

  const passwordChangeSubmitHandler = event => {
    event.preventDefault()
    props.setUpdating(true)
    updatePassword(props.user.id, updatePasswordFormData)
  }

  return(
    <>
      <Typography variant='h4' className={classes.warning}>
        Warning!
      </Typography>
      <Typography variant='body2' className={classes.text}>
        At the moment, this portal does NOT utilize encrpytion.
        For your own protection, DO NOT use an email-password
        combination that may protect your sensitive data elsewhere.
        Feel free to use unconfirmable credentials as this application will not email you.
      </Typography>
      <form onSubmit={passwordChangeSubmitHandler}>
        <Box className={classes.passwordBox}>
          <CssTextField
            className={classes.passwordField}
            label="Current password"
            type={currentPasswordVisibility ? "text" : "password"}
            name="current_password"
            onChange={handlePasswordFormChange}
            value={updatePasswordFormData.current_password}
            placeholder='(Your current password)'
          />
          <IconButton
            className={classes.passwordVisButton}
            onClick={()=>{setCurrentPasswordVisibility(!currentPasswordVisibility)}}
          >
            {currentPasswordVisibility && <VisibilityOffTwoToneIcon className={classes.icon} />}
            {!currentPasswordVisibility && <VisibilityTwoToneIcon className={classes.icon} />}
          </IconButton>
        </Box>
        <Box className={classes.passwordBox}>
          <CssTextField
            className={classes.passwordField}
            label="New password"
            type={passwordVisibility ? "text" : "password"}
            name="password"
            onChange={handlePasswordFormChange}
            value={updatePasswordFormData.password}
            placeholder='(Minimum of 6 characters)'
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
            label="Password confirmation"
            type={passwordConfirmationVisibility ? "text" : "password"}
            name="password_confirmation"
            onChange={handlePasswordFormChange}
            value={updatePasswordFormData.password_confirmation}
            placeholder='(Must match new password)'
          />
          <IconButton
            className={classes.passwordVisButton}
            onClick={()=>{setpasswordConfirmationVisibility(!passwordConfirmationVisibility)}}
          >
            {passwordConfirmationVisibility && <VisibilityOffTwoToneIcon className={classes.icon} />}
            {!passwordConfirmationVisibility && <VisibilityTwoToneIcon className={classes.icon} />}
          </IconButton>
        </Box>
        <Typography variant='body1' className={classes.alert}>
          {props.alertMessage}
        </Typography>
        <Button
          onClick={props.handleClosePW}
          className={classes.submitUpdateButton}
        >
          Cancel
        </Button>
        {passwordChangeValidForSubmission() &&
          <Button
            type="submit"
            className={classes.submitUpdateButton}
          >
            Change
          </Button>
        }
        {!passwordChangeValidForSubmission() &&
          <Button
            disabled
            className={classes.submitUpdateButton}
          >
            Change
          </Button>
        }
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
    displayAlertMessage: (message) => dispatch(displayAlertMessage(message))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordForm)