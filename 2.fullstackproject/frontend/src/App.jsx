import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [jokes, setJokes] = useState([])

  useEffect(() => {
    axios.get('/api/jokes')
    // if success
    .then((res) => { 
      setJokes(res.data)
    })
    // if get error
    .catch((error) => { 
      console.log(error)
    })
  })

  return (
    <>
      <h1>Full Stack App</h1>
      <p>Jokes: {jokes.length}</p>

      {
        jokes.map((joke, index) => (
          <div key={joke.id}>
            <h3>{joke.title}</h3>
            <p>{joke.content}</p>
          </div>
        ))
      }
    </>
    )
}

export default App
