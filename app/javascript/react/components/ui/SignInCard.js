import React, { useState }  from 'react'
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
  signInFormCard: {
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
}))

const SignInCard = props => {
  const classes = useStyles()

  const defaultSignInFormData = {
    email: '',
    password: '',
  }

  const [signInFormData, setSignInFormData] = useState(defaultSignInFormData)

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