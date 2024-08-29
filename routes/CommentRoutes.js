import express from "express";
import { validateUserToken } from "../middleware/authenticateToken.js";
import { createComment, deleteComment, getCommentByTaskId, updateComment } from "../controllers/CommentController.js";
const router = express.Router()

router.use(validateUserToken)

router.route("/:taskId").post(createComment).get(getCommentByTaskId)
router.route("/:id").put(updateComment).delete(deleteComment)

export default router