/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import mongooseUniqueValidator from 'mongoose-unique-validator'

dotenv.config()

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  author: { type: String, minlength: 3, required: true },
  url: { type: String, required: true },
  date: Date,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [
    {
      text: String,
      date: Date,
    },
  ],
})

blogSchema.plugin(mongooseUniqueValidator)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject._id
  },
  virtuals: true,
})

export default mongoose.model('Blog', blogSchema)
