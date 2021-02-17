import express, { Request, Response } from 'express'
import { body } from 'express-validator'

const router = express.Router()

router.post(
  '/api/users/register',
  [
    body('email,').isEmail().withMessage('Your e-mail must be valid!'),
    body('password').trim().isLength({ min: 6, max: 25 }),
  ],
  (req: Request, res: Response) => {
    const { email, password } = req.body
  },
)

export { router as registerRouter }
