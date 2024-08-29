import { validate as uuidValidate } from "uuid";
import Task from "../models/task.model.js";
import Attachment from "../models/attachments.model.js";

const createAttachment = async (req, res) => {
  const taskId = req.params.taskId;
  const { filename, url } = req.body;
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

  const newAttachment = await task.createAttachment({
    taskId,
    filename,
    url,
  });

  return res.status(201).json({
    success: true,
    message: "Attachment created successfully",
    data: newAttachment,
  });
};

const deleteAttachment = async (req, res) => {
  const { id } = req.params;
  if (!uuidValidate(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Attachment ID format",
    });
  }

  const attachment = await Attachment.findByPk(id);
  if (!attachment) {
    return res.status(404).json({
      success: false,
      message: "Attachment not found",
    });
  }

  await attachment.destroy();
  return res.status(200).json({
    success: true,
    message: "Attachment deleted successfully",
  });
};

export  { createAttachment, deleteAttachment };
