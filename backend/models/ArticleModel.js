import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    summary: { type: String, trim: true, maxlength: 400 },
    contentHtml: { type: String, required: true }, // sanitized HTML
    image: { type: String, required: true }, // cover image URL
    author: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: { type: String, default: "General" },
    readTimeMinutes: { type: Number, default: 1 },
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true, maxlength: 160 },
    published: { type: Boolean, required: true, default: false },
    publishedAt: { type: Date },
    status: {
      type: String,
      enum: ["draft", "review", "published"],
      default: "draft",
      index: true,
    },
  },
  { timestamps: true }
);

export const Article = mongoose.model("Article", ArticleSchema);