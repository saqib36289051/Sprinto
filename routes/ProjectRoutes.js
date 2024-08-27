import express from "express";
import {
  createNewProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../controllers/ProjectController.js";
import { validateUserToken } from "../middleware/authenticateToken.js";

const router = express.Router();
router.use(validateUserToken)

router.route("/").post(createNewProject).get(getAllProjects);
router
  .route("/:id")
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject);
export default router;
