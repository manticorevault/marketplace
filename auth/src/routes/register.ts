import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error'
import { DatabaseConnectionError } from '../errors/database-connection-error'

const router = express.Router()

router.post(
  '/api/users/register',
  [
    body('email')
      .isEmail()
      .withMessage('Your should register with a valid e-mail!'),
    body('password')
      .trim()
      .isLength({ min: 6, max: 25 })
      .withMessage('Password must be between 6 and 25 characters long'),
  ],
  (req: Request, res: Response) => {
    const error = validationResult(req)

    if (!error.isEmpty()) {
      throw new RequestValidationError(error.array())
    }

    console.log('Hold on! We are creating a new user!')
    throw new DatabaseConnectionError()

    res.send({})
  },
)

export { router as registerRouter }
