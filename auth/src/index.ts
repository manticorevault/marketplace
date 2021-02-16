import express from 'express'
import { json } from 'body-parser'

const app = express()

app.use(json())

app.get('/api/users/user', (req, res) => {
  res.send('I am a user!')
})

app.listen(3000, () => {
  console.log('Listening to port 3000! Skaffold working')
})
