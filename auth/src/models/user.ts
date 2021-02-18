import mongoose from 'mongoose'

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

userSchema.statics.build = (requirements: UserRequirements) => {
  return new User(requirements)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }
