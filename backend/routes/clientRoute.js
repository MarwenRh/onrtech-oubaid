import express from "express";
import multer from "multer";
import { EditorAndAdmin, protect } from "../middleware/authMiddleware.js";
import {
  createClient,
  deleteClientById,
  getClients,
} from "../controllers/clientController.js";
const router = express.Router();
const upload = multer({ dest: "uploads/" });
router.get("/", protect, EditorAndAdmin, getClients);
router.post(
  "/",
  protect,
  EditorAndAdmin,
  upload.single("companyLogo"),
  createClient
);
router.delete("/:id", protect, EditorAndAdmin, deleteClientById);
export default router;
