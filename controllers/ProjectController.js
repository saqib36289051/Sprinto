import { validate as uuidValidate } from "uuid";
import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import Validator from "../utils/Validator.js";
//TODO: POST
const createNewProject = async (req, res) => {
  const { name, description } = req.body;
  const createdBy = req.user.id;

  const validate = Validator(
    {
      name: "Please Provide Project Name",
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

  const newProject = await Project.create({
    name,
    description,
    createdBy,
  });

  return res.status(201).json({
    success: true,
    message: "Project created successfully",
    data: newProject,
  });
};

//TODO: GET
const getAllProjects = async (req, res) => {
  const projects = await Project.findAll({
    include: [
      {
        model: User,
        as: "members",
        attributes: ["id", "name"],
      },
    ],
  });

  return res.status(200).json({
    success: true,
    data: projects,
  });
};

//TODO: PUT
const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!uuidValidate(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid project ID format",
    });
  }

  const project = await Project.findByPk(id);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  project.name = name || project.name;
  project.description = description || project.description;

  await project.save();

  return res.status(200).json({
    success: true,
    message: "Project updated successfully",
    data: project,
  });
};

//TODO: DELETE
const deleteProject = async (req, res) => {
  const { id } = req.params;
  if (!uuidValidate(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid project ID format",
    });
  }
  const project = await Project.findByPk(id);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  await project.destroy();

  return res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
};

//TODO: GET BY ID
const getProjectById = async (req, res) => {
  const { id } = req.params;
  if (!uuidValidate(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid project ID format",
    });
  }
  const singleProject = await Project.findByPk(id, {
    include: [
      {
        model: User,
        as: "members",
        attributes: ["id", "name"],
      },
    ],
  });

  if (!singleProject) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: singleProject,
  });
};

export {
  createNewProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
