require('dotenv').config()
const express = require('express');

const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login', (req, res) => {
  res.send('jump into login form') 
})

app.listen(port, () => {
  console.log(`login port on ${port}`)
})

app.listen(process.env.PORT,  () => {
  console.log(`Example app listening on port ${port}`)
})

// This is server (if continuously listening )
// Now this application is  production ready
