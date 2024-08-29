import express from "express";
import { validateUserToken } from "../middleware/authenticateToken.js";
import {
  createSprint,
  deleteSprint,
  getAllSprints,
  getSprintById,
  updateSprint,
} from "../controllers/SprintController.js";
const router = express.Router();

router.use(validateUserToken);

router.route("/:projectId").post(createSprint).get(getAllSprints);
router.route("/:id/GetById").get(getSprintById)
router.route("/:id").put(updateSprint).delete(deleteSprint);
export default router;
