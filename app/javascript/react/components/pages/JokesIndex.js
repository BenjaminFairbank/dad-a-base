import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import NewJokeForm from '../ui/NewJokeForm'
import JokesIndexDisplay from '../ui/JokesIndexDisplay'

const useStyles = makeStyles((theme) => ({
  spacerBox: {
    height: 10
  }
}))

const JokesIndex = props => {
  const classes = useStyles()

  const [jokes, setJokes] = useState([])

  useEffect(() => {
    fetch('/api/v1/jokes.json')
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
      setJokes(data)
    })
    .catch(error => {
      console.error(`Error in fetch: ${error.message}`)
    })
  }, [])

  let formAccess = <Box className={classes.spacerBox}></Box>
  if (props.currentUser !== null) {
    formAccess = <NewJokeForm setJokes={setJokes} jokes={jokes} />
  }

  return (
    <Container>
      {formAccess}
      <JokesIndexDisplay setJokes={setJokes} jokes={jokes} />
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
  }
}

export default connect(
  mapStateToProps,
  null
)(JokesIndex)