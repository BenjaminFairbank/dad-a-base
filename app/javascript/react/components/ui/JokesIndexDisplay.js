import React from 'react'
import JokeCard from '../ui/JokeCard'

const JokesIndexDisplay = props => {

  const jokeCards = props.jokes.sort((a, b) => (a.created_at < b.created_at) ? 1 : -1).map(joke => {
    return (
      <JokeCard
        key={joke.id}
        joke={joke}
        currentUser={props.currentUser}
      />
    )
  })

  return <>{jokeCards}</>
}

export default JokesIndexDisplay