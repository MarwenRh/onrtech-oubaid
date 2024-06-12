import express from "express";
import multer from "multer";
import {
  applyForJob,
  getApplications,
  deleteApplication,
  acceptApplication,
  rejectApplication,
} from "../controllers/applicatinController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = { dest: "uploads/" };
const upload = multer({ dest: "uploads/" });

router.post("/apply", protect, upload.single("cv"), applyForJob);
router.get("/", protect, adminOnly, getApplications);
router.delete("/:id", protect, adminOnly, deleteApplication);
router.patch("/accept/:id", protect, adminOnly, acceptApplication);
router.patch("/reject/:id", protect, adminOnly, rejectApplication);

export default router;
