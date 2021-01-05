import React, { useState }  from 'react'
import { connect } from 'react-redux'
import {
  Typography,
  Card,
  Box,
  TextField,
  Button,
  IconButton
} from '@material-ui/core'
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
  signInFormCard: {
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
}))

const SignInCard = props => {
  const classes = useStyles()

  const defaultSignInFormData = {
    email: '',
    password: '',
  }

  const [signInFormData, setSignInFormData] = useState(defaultSignInFormData)
  const [passwordVisibility, setpasswordVisibility] = useState(false)

  const handleSignInFormChange = (event) => {
    event.preventDefault()
    setSignInFormData({
      ...signInFormData,
      [event.currentTarget.name]: event.currentTarget.value
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

  const signInFormSubmitHandler = (event) => {
    event.preventDefault()
    signIn(signInFormData)
  }

  return (
    <Card elevation={3} className={classes.signInFormCard}>
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
        <Box className={classes.passwordBox}>
          <CssTextField
            className={classes.passwordField}
            label="Password"
            type={passwordVisibility ? "text" : "password"}
            name="password"
            onChange={handleSignInFormChange}
            value={signInFormData.password}
          />
          <IconButton
            className={classes.passwordVisButton}
            onClick={()=>{setpasswordVisibility(!passwordVisibility)}}
          >
            {passwordVisibility && <VisibilityOffTwoToneIcon className={classes.icon} />}
            {!passwordVisibility && <VisibilityTwoToneIcon className={classes.icon} />}
          </IconButton>
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
)(SignInCard)