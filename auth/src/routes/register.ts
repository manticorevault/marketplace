import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error'
import jwt from 'jsonwebtoken'
import { BadRequestError } from '../errors/bad-request-error'
import { User } from '../models/user'

const router = express.Router()

router.post(
  '/api/users/register',
  [
    body('email')
      .isEmail()
      .withMessage('Your should register with a valid e-mail!'),
    body('password')
      .trim()
      .isLength({ min: 8, max: 25 })
      .withMessage('Password must be between 8 and 25 characters long'),
  ],
  async (req: Request, res: Response) => {
    const error = validationResult(req)

    if (!error.isEmpty()) {
      throw new RequestValidationError(error.array())
    }

    const { email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      throw new BadRequestError('Uh-oh. This e-mail was already taken!')
    }

    const user = User.build({ email, password })
    await user.save()

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      'sadasdasd',
    )

    // Store it on session object
    req.session = {
      jwt: userJwt,
    }

    res.status(201).send(user)
  },
)

export { router as registerRouter }
