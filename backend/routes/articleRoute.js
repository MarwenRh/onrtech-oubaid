import express from "express";
import multer from "multer";
import {
  createArticle,
  deleteArticleById,
  getArticleById,
  getArticles,
  getPublishedArticles,
  getUnpublishedArticles,
  updateArticleById,
  approveArticleById,
  getTopThreeNewestArticles,
  getEditorArticles,
} from "../controllers/articleController.js";
import {
  adminOnly,
  protect,
  EditorAndAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Routes configuration
// Route for getting all articles
router.get("/", protect, adminOnly, getArticles);
// Route for getting only current published articles
router.get("/published", getPublishedArticles);
// Route for getting Unpublished articles
router.get("/unpublished", protect, adminOnly, getUnpublishedArticles);
// get top three newest articles
router.get("/newestArticles", getTopThreeNewestArticles);
// Route for getting an article by its id
router.get("/editor/:editorId", protect, EditorAndAdmin, getEditorArticles);
// Route for getting an article by its id
router.get("/:id", getArticleById);

// Route for creating an article
router.post(
  "/",
  protect,
  EditorAndAdmin,
  upload.single("image"),
  createArticle
);
// Route for deleting an article
router.delete("/:id", protect, EditorAndAdmin, deleteArticleById);
// Route for updating an article
router.put(
  "/:id",
  protect,
  EditorAndAdmin,
  upload.single("image"),
  updateArticleById
);
router.patch("/approveArticle/:id", protect, adminOnly, approveArticleById);

// Routes for web editor

export default router;
