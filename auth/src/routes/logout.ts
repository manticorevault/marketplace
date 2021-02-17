import express from 'express'

const router = express.Router()

router.post('/api/users/logout', (req, res) => {
  res.send("I'm logging out!")
})

export { router as logoutRouter }
