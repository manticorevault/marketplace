import mongoose from 'mongoose'
import { Password } from '../services/password'

interface UserRequirements {
  email: string
  password: string
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(requirements: UserRequirements): UserDoc
}

interface UserDoc extends mongoose.Document {
  email: 'string'
  password: 'string'
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPass = await Password.toHash(this.get('password'))
    this.set('password', hashedPass)
  }

  done()
})

userSchema.statics.build = (requirements: UserRequirements) => {
  return new User(requirements)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }
