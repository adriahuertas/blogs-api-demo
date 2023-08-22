import mongoose from 'mongoose';
import dotenv from 'dotenv';
import mongooseUniqueValidator from 'mongoose-unique-validator';

dotenv.config();

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
});

blogSchema.plugin(mongooseUniqueValidator);

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    delete returnedObject.__v;
  },
});

export default mongoose.model('Blog', blogSchema);
