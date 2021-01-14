import React from 'react'
import JokeCard from './JokeCard'

const JokesDisplay = props => {

  const jokeCards = props.jokes.sort((a, b) => (a.created_at < b.created_at) ? 1 : -1).map(joke => {
    return (
      <JokeCard
        key={joke.id}
        joke={joke}
        setJokes={props.setJokes}
      />
    )
  })

  return <>{jokeCards}</>
}

export default JokesDisplay