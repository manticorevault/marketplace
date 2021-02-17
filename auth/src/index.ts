import express from 'express'
import { json } from 'body-parser'

import { userRouter } from './routes/user'
import { loginRouter } from './routes/login'
import { logoutRouter } from './routes/logout'
import { registerRouter } from './routes/register'

import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()

app.use(json())

app.use(userRouter)
app.use(loginRouter)
app.use(logoutRouter)
app.use(registerRouter)

app.all('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)

app.listen(3000, () => {
  console.log('Listening to port 3000! Skaffold working')
})
