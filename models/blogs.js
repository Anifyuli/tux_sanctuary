import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
    required: true,
  },
  categories: [String],
  content: {
    type: String,
    required: true,
  },
});

export const Blog = mongoose.model("Blog", blogSchema);
