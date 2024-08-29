import { validate as uuidValidate } from "uuid";
import Task from "../models/task.model.js";

const createComment = async (req, res) => {
  const { comment, userId } = req.body;
  const taskId = req.params.taskId;

  if (!uuidValidate(taskId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Task ID format",
    });
  }

  const task = await Task.findByPk(taskId);
  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  const newComment = await task.createComment({
    taskId,
    userId,
    comment,
  });

  return res.status(201).json({
    success: true,
    message: "Comment created successfully",
    data: newComment,
  });
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  if (!uuidValidate(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Comment ID format",
    });
  }

  const commentToUpdate = await Comment.findByPk(id);
  if (!commentToUpdate) {
    return res.status(404).json({
      success: false,
      message: "Comment not found",
    });
  }

  commentToUpdate.comment = comment;

  await commentToUpdate.save();

  return res.status(200).json({
    success: true,
    message: "Comment updated successfully",
    data: commentToUpdate,
  });
};

const deleteComment = async (req, res) => {
  const { id } = req.params;

  if (!uuidValidate(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Comment ID format",
    });
  }

  const commentToDelete = await Comment.findByPk(id);
  if (!commentToDelete) {
    return res.status(404).json({
      success: false,
      message: "Comment not found",
    });
  }

  await commentToDelete.destroy();

  return res.status(200).json({
    success: true,
    message: "Comment deleted successfully",
  });
};

const getCommentByTaskId = async (req, res) => {
  const { taskId } = req.params;

  if (!uuidValidate(taskId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Task ID format",
    });
  }

  const task = await Task.findByPk(taskId);
  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  const comments = await Comment.findAll({
    where: { taskId },
  });

  return res.status(200).json({
    success: true,
    message: "Comments retrieved successfully",
    data: comments,
  });
};

export { createComment, updateComment, deleteComment, getCommentByTaskId };
