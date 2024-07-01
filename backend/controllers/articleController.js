import { Article } from "../models/ArticleModel.js";
import { User } from "../models/userModel.js";
import cloudinary from "../utils/cloudinaryConfig.js";
import fs from "fs";
// get all articles
export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({});
    res.status(200).send({ count: articles.length, Article: articles });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: error.message });
  }
};

// get published articles
export const getPublishedArticles = async (req, res) => {
  try {
    const articles = await Article.find({ published: true });
    res
      .status(200)
      .send({ count: articles.length, PublishedArticles: articles });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: error.message });
  }
};
// get 3 newest articles
export const getTopThreeNewestArticles = async (req, res) => {
  try {
    const articles = await Article.find({ published: true })
      .sort({ publishedAt: -1 }) // Sort by publishedAt in descending order
      .limit(3); // Limit the results to 3 documents

    res
      .status(200)
      .send({ count: articles.length, topThreeArticles: articles });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: error.message });
  }
};

// get unpublished articles
export const getUnpublishedArticles = async (req, res) => {
  try {
    const articles = await Article.find({ published: false });
    res
      .status(200)
      .send({ count: articles.length, UnpublishedArticles: articles });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: error.message });
  }
};

// get an article by its id
export const getArticleById = async (req, res) => {
  try {
    const id = req.params.id;
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).send({ msg: "article not found" });
    } else {
      return res.status(200).send(article);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: error.message });
  }
};
// get article for his editor by his id
export const getEditorArticles = async (req, res) => {
  try {
    const editorId = req.params.editorId;
    const articles = await Article.find({ userId: editorId });
    if (!articles) {
      return res.status(404).send({ msg: "no articles" });
    } else {
      return res
        .status(200)
        .send({ count: articles.length, editorArticles: articles });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: error.message });
  }
};
// Approva an artilce
export const approveArticleById = async (req, res) => {
  const id = req.params.id;
  try {
    const article = Article.findById(id);
    if (!article) {
      res.status(404).send("Article not found");
    }
    req.body.published = true;
    req.body.publishedAt = Date.now();

    await Article.findByIdAndUpdate(id, req.body);

    console.log("Article approved");
    res.status(200).send("Article approved successfully");
  } catch (error) {
    console.error("Error approving article:", error);
    res.status(500).send("Internal server error");
  }
};

// Create an article
export const createArticle = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "You have to put an image." });
    }
    if (!req.file.mimetype.startsWith("image/")) {
      return res.status(400).json({ error: "Only images are allowed." });
    }
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(req.file.path);
    // Delete temporary file from server
    fs.unlinkSync(req.file.path);
    // Parse the published field back to a boolean
    const published = req.body.published === "true";
    // Create a new Article object
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
      image: result.secure_url, // URL of the uploaded image from Cloudinary
      author: req.body.author,
      userId: req.body.userId,
      publishedAt: req.body.publishedAt,
      published: req.body.published,
    });
    // Save the new article to the database
    const article = await Article.create(newArticle);

    // Send back the created article as a response
    return res.status(201).send(article);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: error.message });
  }
};

// delete an article
export const deleteArticleById = async (req, res) => {
  try {
    const id = req.params.id;
    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      return res.status(404).send({ msg: "Article Not found" });
    } else {
      return res.status(200).send({ msg: "deleted succefully" });
    }
  } catch (error) {
    console.log(msg.error);
    return res.status(500).send({ msg: error.message });
  }
};

export const updateArticleById = async (req, res) => {
  try {
    const id = req.params.id;
    let article = await Article.findById(id);
    if (!article) {
      return res.status(404).send({ msg: "Article not found" });
    }

    if (req.file) {
      if (!req.file.mimetype.startsWith("image/")) {
        // If no file is provided or if it's not an image, return an error response
        return res.status(400).json({ error: "Only images are allowed." });
      }

      // Delete the old image from Cloudinary if exists
      if (article.image) {
        const publicId = article.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      // Upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      req.body.image = result.secure_url;

      // Delete temporary file from server
      fs.unlinkSync(req.file.path);
    }
    const user = await User.findById(req.user._id);
    if (user.role === "Web Editor") {
      req.body.published = false;
      req.body.publishedAt = undefined;
    }
    // Update the article in the database
    const updatedArticle = await Article.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).send(updatedArticle);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ msg: error.message });
  }
};
