import express from 'express'

const router = express.Router()

router.get('/api/users/user', (req, res) => {
  res.send("I'm a user!")
})

export { router as userRouter }
