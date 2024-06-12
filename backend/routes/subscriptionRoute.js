import express from "express";
import {
  subscribeUser,
  getSubscriptions,
  // unsubscribeUser,
} from "../controllers/subscriptionController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", subscribeUser);
router.get("/", protect, adminOnly, getSubscriptions);
// router.post("/unsubscribe", unsubscribeUser);

export default router;
