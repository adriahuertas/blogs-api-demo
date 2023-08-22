import mongoose from "mongoose";
import dotenv from "dotenv";
import mongooseUniqueValidator from "mongoose-unique-validator";

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
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
