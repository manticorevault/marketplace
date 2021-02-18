import mongoose from 'mongoose'

interface UserRequirements {
  email: string
  password: string
}

interface UserModel extends mongoose.Model<any> {
  build(requirements: UserRequirements): any
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

userSchema.statics.build = (requirements: UserRequirements) => {
  return new User(requirements)
}

const User = mongoose.model<any, UserModel>('User', userSchema)

export { User }
