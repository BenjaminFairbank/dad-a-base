import React, { useState, useEffect } from 'react'
import { Container } from '@material-ui/core'
import NewJokeForm from '../ui/NewJokeForm'
import JokesIndexDisplay from '../ui/JokesIndexDisplay'

const JokesIndex = props => {

  const [jokes, setJokes] = useState([])
  const [currentUser, setCurrentUser] = useState({})

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
      setCurrentUser(data.currentUser)
      setJokes(data.jokes)
    })
    .catch(error => {
      console.error(`Error in fetch: ${error.message}`)
    })
  }, [])

  return (
    <Container>
      <NewJokeForm
        setJokes={setJokes}
        jokes={jokes}
        currentUser={currentUser}
      />
      <JokesIndexDisplay
        setJokes={setJokes}
        jokes={jokes}
        currentUser={currentUser}
      />
    </Container>
  )
}

export default JokesIndex