import express, { json } from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('server is ready')
})

app.get('/jokes', (req, res) => {
  const jokes = [
  {
    id: 1,
    title: "The Atom Joke",
    description: "Why don't scientists trust atoms? Because they make up everything!"
  },
  {
    id: 2,
    title: "The Programmer Joke",
    description: "Why do programmers prefer dark mode? Because light attracts bugs!"
  },
  {
    id: 3,
    title: "The Developer Joke",
    description: "Why did the developer go broke? Because he used up all his cache!"
  },
  {
    id: 4,
    title: "The Noodle Joke",
    description: "What do you call a fake noodle? An impasta!"
  },
  {
    id: 5,
    title: "The Computer Joke",
    description: "Why did the computer go to the doctor? Because it had a virus!"
  },
  {
    id: 6,
    title: "The JavaScript Joke",
    description: "Why was the JavaScript developer sad? Because he didn't know how to null his feelings!"
  },
  {
    id: 7,
    title: "The Nature Joke",
    description: "Why do programmers hate nature? It has too many bugs!"
  },
  {
    id: 8,
    title: "The Console Joke",
    description: "How do you comfort a JavaScript bug? You console it!"
  },
  {
    id: 9,
    title: "The Function Joke",
    description: "Why did the function break up with the variable? It needed more space!"
  },
  {
    id: 10,
    title: "The Server Joke",
    description: "What did the server say to the client? You have my full attention!"
  }
]
res.json(jokes)
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`server is running at ${port}`)
})