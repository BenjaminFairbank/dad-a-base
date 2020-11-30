import React, { useState } from 'react'
import {
  Typography,
  Container,
  Card,
  Paper,
  Box,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  titleBox: {
    margin: '20px 0',
    textAlign: 'center',
  },
  formBox: {
    
  },
  formCard: {
    padding: 10,
    margin: 'auto',
    width: 200,
    height: 200,
  },
}))

const Login = props => {
  const classes = useStyles()

  const defaultFormData = {
    email: '',
    password: '',
    password_confirmation: ''
  }

  const [signUpFormData, setSignUpFormData] = useState(defaultFormData)

  const handleChange = (event) => {
    event.preventDefault()
    setSignUpFormData({
      ...signUpFormData,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    // if (validForSubmission()) {
    //   props.fetchPostNewComment(newCommentFormData)
    //   clearFormData()
    // }
    fetchSignUp(signUpFormData)
  }

  const fetchSignUp = (signUpPayload) => {
    fetch('/users', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({user: signUpPayload}),
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
      if (body.error) {
        console.log(body.error)
      } else {
        console.log(body)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return (
    <Container>
      <Box className={classes.titleBox}>
        <Typography variant='h3'>Sign Up</Typography>
      </Box>
      <Box className={classes.formBox}>
        <Card className={classes.formCard}>
          <form onSubmit={onSubmitHandler}>
            <Box>
              <label htmlFor='email'>Email</label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={handleChange}
                value={signUpFormData.email}
              />
            </Box>
            <Box>
              <label htmlFor='password'>Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={signUpFormData.password}
              />
            </Box>
            <Box>
              <label htmlFor='password_confirmation'>Confirm password</label>
              <input
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                onChange={handleChange}
                value={signUpFormData.password_confirmation}
              />
            </Box>
            <Box>
              <input
                id="button"
                type="submit"
                value="Sign Up"
              />
            </Box>
          </form>
        </Card>
      </Box>
    </Container>
  )
}

export default Login