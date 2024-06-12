import express from "express";
import {
  deleteForm,
  getForm,
  postForm,
} from "../controllers/FormController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/", protect, adminOnly, getForm);
router.post("/", postForm);
router.delete("/:id", protect, adminOnly, deleteForm);
export default router;
