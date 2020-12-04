import React, { useState, useEffect } from 'react'

const Home = props => {

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
      setJokes(data.jokes)
      setCurrentUser(data.currentUser)
    })
    .catch(error => {
      console.error(`Error in fetch: ${error.message}`)
    })
  }, [])

  return (
    <p>Hi from Home</p>
  )
}

export default Home