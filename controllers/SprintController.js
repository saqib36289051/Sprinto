import Validator from "../utils/Validator.js";
import Project from "../models/project.model.js";
import { validate as uuidValidate } from "uuid";
import Sprint from "../models/sprint.model.js";

const createSprint = async (req, res) => {
  const { name, startDate, endDate } = req.body;
  const projectId = req.params.projectId;

  const validate = Validator(
    {
      name: "Please provide a valid name",
      startDate: "Please provide a valid start date",
      endDate: "Please provide a valid end date",
    },
    req.body
  );

  if (Object.keys(validate).length > 0) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields",
      fields: validate,
    });
  }

  if (!uuidValidate(projectId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid project ID format",
    });
  }

  const project = await Project.findByPk(projectId);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  const newSprint = await Sprint.create({
    projectId,
    name,
    startDate,
    endDate,
  });

  return res.status(201).json({
    success: true,
    message: "Sprint created successfully",
    data: newSprint,
  });
};

//TODO : GET ALL Sprint
const getAllSprints = async (req, res) => {
  const projectId = req.params.projectId;

  if (!uuidValidate(projectId)) {
    res.status(400).json({
      success: false,
      message: "Invalid project ID format",
    });
  }

  const sprints = await Sprint.findAll({
    where: {
      projectId,
    },
  });

  return res.status(200).json({
    success: true,
    message: "Sprints retrieved successfully",
    data: sprints,
  });
};

//TODO: GET BY ID
const getSprintById = async (req, res) => {
  const sprintId = req.params.id;

  if (!uuidValidate(sprintId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid sprint ID format",
    });
  }

  const sprint = await Sprint.findByPk(sprintId);

  if (!sprint) {
    return res.status(404).json({
      success: false,
      message: "Sprint not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Sprint retrieved successfully",
    data: sprint,
  });
};

const updateSprint = async (req, res) => {
  const { name, startDate, endDate } = req.body;
  const sprintId = req.params.id;

  if (!uuidValidate(sprintId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid project ID format",
    });
  }

  const sprint = await Sprint.findByPk(sprintId);

  sprint.name = name || sprint.name;
  sprint.startDate = startDate || sprint.startDate;
  sprint.endDate = endDate || sprint.endDate;

  await sprint.save();

  return res.status(200).json({
    success: true,
    message: "Sprint updated successfully",
    data: sprint,
  });
};

const deleteSprint = async (req, res) => {
  const sprintId = req.params.id;

  if (!uuidValidate(sprintId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid project ID format",
    });
  }

  const sprint = await Sprint.findByPk(sprintId);

  if (!sprint) {
    return res.status(404).json({
      success: false,
      message: "Sprint not found",
    });
  }

  await sprint.destroy();

  return res.status(200).json({
    success: true,
    message: "Sprint deleted successfully",
  });
};

export {
  createSprint,
  updateSprint,
  deleteSprint,
  getAllSprints,
  getSprintById,
};
