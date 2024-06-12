import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  loginStatus,
  logoutUser,
  sendAutomatedEmail,
  updateUser,
  upgradeUser,
  loginWithGoogle,
} from "../controllers/userController.js";
import {
  adminOnly,
  protect,
  EditorAndAdmin,
} from "../middleware/authMiddleware.js";
export const router = express.Router();

router.get("/logout", logoutUser);
router.get("/getUser", protect, getUser);
router.patch("/updateUser", protect, updateUser);
router.delete("/:id", protect, adminOnly, deleteUser);
router.get("/getUsers", protect, adminOnly, getUsers);
router.get("/loginStatus", loginStatus);
router.post("/upgradeUser", protect, adminOnly, upgradeUser);
router.post("/sendAutomatedEmail", protect, sendAutomatedEmail);
router.post("/google/callback", loginWithGoogle);
