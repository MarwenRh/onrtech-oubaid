import { Article } from "../models/ArticleModel.js";
import { User } from "../models/userModel.js";
import cloudinary from "../utils/cloudinaryConfig.js";
import fs from "fs";
import sanitizeHtml from "sanitize-html";
import slugify from "slugify";
import readingTime from "reading-time";

const sanitize = (html) =>
  sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2"]),
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      "*": ["style", "class"],
    },
    allowedSchemesByTag: { a: ["http", "https", "mailto"] },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
    },
  });

const computeSlug = async (title, id) => {
  const base = slugify(title, { lower: true, strict: true });
  const exists = await Article.findOne({ slug: base, _id: { $ne: id } });
  return exists ? `${base}-${Date.now()}` : base;
};

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({}).sort({ createdAt: -1 });
    res.status(200).send({ count: articles.length, Article: articles });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

export const getPublishedArticles = async (req, res) => {
  try {
    const articles = await Article.find({ published: true }).sort({ publishedAt: -1 });
    res.status(200).send({ count: articles.length, PublishedArticles: articles });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

export const getTopThreeNewestArticles = async (req, res) => {
  try {
    const articles = await Article.find({ published: true })
      .sort({ publishedAt: -1 })
      .limit(3);
    res.status(200).send({ count: articles.length, topThreeArticles: articles });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

export const getUnpublishedArticles = async (req, res) => {
  try {
    const articles = await Article.find({ published: false }).sort({ updatedAt: -1 });
    res.status(200).send({ count: articles.length, UnpublishedArticles: articles });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const id = req.params.id;
    const article = await Article.findById(id);
    if (!article) return res.status(404).send({ msg: "article not found" });
    return res.status(200).send(article);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

export const getEditorArticles = async (req, res) => {
  try {
    const editorId = req.params.editorId;
    const articles = await Article.find({ userId: editorId }).sort({ updatedAt: -1 });
    return res
      .status(200)
      .send({ count: articles.length, editorArticles: articles });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

export const approveArticleById = async (req, res) => {
  const id = req.params.id;
  try {
    const article = await Article.findById(id);
    if (!article) return res.status(404).send("Article not found");

    const updated = await Article.findByIdAndUpdate(
      id,
      { published: true, status: "published", publishedAt: Date.now() },
      { new: true }
    );
    res.status(200).send(updated);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

export const createArticle = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "You have to put an image." });
    if (!req.file.mimetype.startsWith("image/"))
      return res.status(400).json({ error: "Only images are allowed." });

    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path);

    const {
      title,
      contentHtml,
      summary,
      author,
      userId,
      tags = "",
      category,
      seoTitle,
      seoDescription,
      published,
    } = req.body;

    const sanitized = sanitize(contentHtml || "");
    const readStats = readingTime(sanitized);
    const slug = await computeSlug(title, null);
    const isPublished = published === "true";

    const newArticle = await Article.create({
      title,
      slug,
      summary,
      contentHtml: sanitized,
      image: result.secure_url,
      author,
      userId,
      tags: typeof tags === "string" ? tags.split(",").map((t) => t.trim()).filter(Boolean) : tags,
      category,
      seoTitle,
      seoDescription,
      published: isPublished,
      status: isPublished ? "published" : "review",
      publishedAt: isPublished ? new Date() : undefined,
      readTimeMinutes: Math.max(1, Math.round(readStats.minutes)),
    });

    return res.status(201).send(newArticle);
  } catch (error) {
    if (req.file?.path) try { fs.unlinkSync(req.file.path); } catch {}
    res.status(500).send({ msg: error.message });
  }
};

export const deleteArticleById = async (req, res) => {
  try {
    const id = req.params.id;
    const article = await Article.findByIdAndDelete(id);
    if (!article) return res.status(404).send({ msg: "Article Not found" });
    return res.status(200).send({ msg: "deleted succefully" });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

export const updateArticleById = async (req, res) => {
  try {
    const id = req.params.id;
    let article = await Article.findById(id);
    if (!article) return res.status(404).send({ msg: "Article not found" });

    if (req.file) {
      if (!req.file.mimetype.startsWith("image/"))
        return res.status(400).json({ error: "Only images are allowed." });
      const result = await cloudinary.uploader.upload(req.file.path);
      req.body.image = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const user = await User.findById(req.user._id);
    // Web Editor edits revert to review
    if (user.role === "Web Editor") {
      req.body.published = false;
      req.body.status = "review";
      req.body.publishedAt = undefined;
    }

    if (req.body.title && req.body.title !== article.title) {
      req.body.slug = await computeSlug(req.body.title, id);
    }

    if (typeof req.body.contentHtml === "string") {
      req.body.contentHtml = sanitize(req.body.contentHtml);
      const readStats = readingTime(req.body.contentHtml);
      req.body.readTimeMinutes = Math.max(1, Math.round(readStats.minutes));
    }

    if (typeof req.body.tags === "string") {
      req.body.tags = req.body.tags.split(",").map((t) => t.trim()).filter(Boolean);
    }

    const updatedArticle = await Article.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).send(updatedArticle);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};