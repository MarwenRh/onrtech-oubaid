import express from "express";
import {
  getJobs,
  postJob,
  findJobById,
  updateJobById,
  deleteJobById,
  getPublishedJobs,
  getUnpublishedJobs,
  approveJobById,
  getEditorJobs,
  hideJobById,
} from "../controllers/jobController.js";
import {
  adminOnly,
  protect,
  EditorAndAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// get all jobs
router.get("/getJobs", protect, adminOnly, getJobs);
// get all jobs
router.get("/getPublishedJobs", getPublishedJobs);
// get Unverifeid jobs
router.get("/getUnpublishedJobs", protect, adminOnly, getUnpublishedJobs);
// post a new job into the database
router.post("/PostJob", protect, EditorAndAdmin, postJob);
// get job by it's id
router.get("/getJob/:id", findJobById);
// update a job by it's id
router.put("/updateJob/:id", protect, EditorAndAdmin, updateJobById);
// delete a job by it's id
router.delete("/:id", protect, EditorAndAdmin, deleteJobById);
// approve a Job
router.patch("/approveJob/:id", protect, adminOnly, approveJobById);
// Route for hedding a job by its id
router.patch("/hideJob/:id", protect, adminOnly, hideJobById);
// Route for getting an article by its id
router.get("/editor/:editorId", protect, EditorAndAdmin, getEditorJobs);
export default router;
