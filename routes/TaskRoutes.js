import express from "express";
import { validateUserToken } from "../middleware/authenticateToken.js";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controllers/TaskController.js";
const router = express.Router();

router.use(validateUserToken);

router.route("/:sprintId").post(createTask).get(getAllTasks);
router.route("/:id/GetById").get(getTaskById);
router.route("/:id").put(updateTask).delete(deleteTask);

export default router;
