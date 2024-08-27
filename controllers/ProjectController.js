import Project from "../models/project.model.js";
import Validator from "../utils/Validator.js";
//TODO: POST
const createNewProject = (req, res) => {
  const { name, description } = req.body;
  console.log("USER",req.user);
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

  const newProject = Project.create({
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
const getAllProjects = (req, res) => {};

//TODO: PUT
const updateProject = (req, res) => {};

//TODO: DELETE
const deleteProject = (req, res) => {};

//TODO: GET BY ID
const getProjectById = (req, res) => {};

export {
  createNewProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
