import express from "express";
import { validateUserToken } from "../middleware/authenticateToken.js";
import {
  createAttachment,
  deleteAttachment,
} from "../controllers/AttachmentsController.js";
const router = express.Router();

router.use(validateUserToken);

router.route("/:taskId").post(createAttachment);
router.route("/:id").delete(deleteAttachment);

export default router;
