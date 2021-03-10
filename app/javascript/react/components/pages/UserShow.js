import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

import UserProfile from '../ui/UserProfile'
import NewJokeForm from '../ui/NewJokeForm'
import JokesDisplay from '../ui/JokesDisplay'

import { displayAlertMessage } from '../../modules/alertMessage'

const useStyles = makeStyles((theme) => ({
  spacerBox: {
    height: 10
  }
}))

const UserShow = props => {
  const classes = useStyles()

  const [user, setUser] = useState({})
  const [jokes, setJokes] = useState([])

  useEffect(() => {
    fetch(`/api/v1/users/${props.match.params.id}`)
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json() )
    .then(data => {
      if (!data.error) {
        setUser(data.user)
        setJokes(data.jokes)
      } else {
        props.displayAlertMessage(data.error)
      }
    })
    .catch(error => {
      console.error(`Error in fetch: ${error.message}`)
    })
  }, [])

  let formAccess = <Box className={classes.spacerBox}></Box>
  if (props.currentUser !== null && props.currentUser.id === user.id) {
    formAccess = <NewJokeForm setJokes={setJokes} jokes={jokes} />
  }

  return (
    <Container maxWidth='md'>
      {user.id && <UserProfile user={user} setUser={setUser} />}
      {formAccess}
      <JokesDisplay setJokes={setJokes} jokes={jokes} />
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
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
)(UserShow)