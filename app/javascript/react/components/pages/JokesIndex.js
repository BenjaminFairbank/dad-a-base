import React, { useState, useEffect } from 'react'
import { Container } from '@material-ui/core'
import JokeCard from '../ui/JokeCard'

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

  const jokeCards = jokes.map((joke) => {
    return (
      <JokeCard
        key={joke.id}
        joke={joke}
        currentUser={currentUser}
      />
    )
  })

  return (
    <Container>
      {jokeCards}
    </Container>
  )
}

export default JokesIndex