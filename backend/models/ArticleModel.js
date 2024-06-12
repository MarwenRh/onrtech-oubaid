import mongoose from "mongoose";
const ArticleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // ref: "uesr",
      ref: "user",
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      required: true,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
    test: {
      required: true,
      type: String,
      default: "test",
    },
  },
  {
    timestamps: true,
  }
);
export const Article = mongoose.model("Article", ArticleSchema);
