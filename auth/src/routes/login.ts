import express from 'express'

const router = express.Router()

router.post('/api/users/login', (req, res) => {
  res.send("I'm logging in!")
})

export { router as loginRouter }
