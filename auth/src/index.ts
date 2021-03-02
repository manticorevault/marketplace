import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import mongoose, { mongo } from 'mongoose'
import cookieSession from 'cookie-session'

import { userRouter } from './routes/user'
import { loginRouter } from './routes/login'
import { logoutRouter } from './routes/logout'
import { registerRouter } from './routes/register'

import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()
app.set('trust proxy', true)

app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: true,
  }),
)

app.use(userRouter)
app.use(loginRouter)
app.use(logoutRouter)
app.use(registerRouter)

app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

const startUp = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log('Connection to MongoDB is working! ')
  } catch (err) {
    console.error(err)
  }

  app.listen(3000, () => {
    console.log('Listening to port 3000! Skaffold working!')
  })
}

startUp()
