import { validate as uuidValidate } from "uuid";
import Task from "../models/task.model.js";
import Validator from "../utils/Validator.js";
import Sprint from "../models/sprint.model.js";
import User from "../models/user.model.js";

const createTask = async (req, res) => {
  const { title, description, assignedTo, status, priority } = req.body;
  const sprintId = req.params.sprintId;
  if (!uuidValidate(sprintId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Sprint ID format",
    });
  }

  const findSprint = await Sprint.findByPk(sprintId);

  if (!findSprint) {
    return res.status(404).json({
      success: false,
      message: "Sprint not found",
    });
  }

  const validate = Validator(
    {
      title: "Please provide a valid title",
    },
    req.body
  );

  if (Object.keys(validate).length > 0) {
    return res.status(400).json({
      success: false,
      message: "Please fill following fields",
      fields: validate,
    });
  }

  const newTask = await Task.create({
    sprintId,
    title,
    description,
    assignedTo,
    status,
    priority,
  });

  return res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: newTask,
  });
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, assignedTo, status, priority } = req.body;
  if (!uuidValidate(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Task ID format",
    });
  }

  const validate = Validator(
    {
      title: "Please provide a valid title",
    },
    req.body
  );

  if (Object.keys(validate).length > 0) {
    return res.status(400).json({
      success: false,
      message: "Please fill following fields",
      fields: validate,
    });
  }

  const task = await Task.findByPk(id);
  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.assignedTo = assignedTo || task.assignedTo;
  task.status = status || task.status;
  task.priority = priority || task.priority;

  await task.save();

  return res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: task,
  });
};

const getAllTasks = async (req, res) => {
  const { sprintId } = req.params;
  if (!uuidValidate(sprintId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Sprint ID format",
    });
  }

  const tasks = await Task.findAll({
    where: { sprintId },
    include: [{ model: User, attributes: ["id", "name"] }],
  });
  return res.status(200).json({
    success: true,
    data: tasks,
  });
};

const getTaskById = async (req, res) => {
  const { id } = req.params;

  if (!uuidValidate(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Task ID format",
    });
  }

  const task = await Task.findByPk(id, {
    include: [{ model: User, attributes: ["id", "name"] }],
  });

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }
  return res.status(200).json({
    success: true,
    data: task,
  });
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!uuidValidate(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Task ID format",
    });
  }

  const task = await Task.findByPk(id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  await task.destroy();
  return res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
};

export { createTask, updateTask, deleteTask, getAllTasks, getTaskById };
