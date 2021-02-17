import { CustomError } from './custom-error'

export class NotFoundError extends CustomError {
  statusCode = 404

  constructor() {
    super('Could not find this route')

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors() {
    return [{ message: 'Not found' }]
  }
}
