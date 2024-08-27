//id,name,description,createdBy
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";

const Project = sequelize.define(
  "Projects",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

Project.belongsToMany(User, {
  through: "ProjectMembers",
  as: "members",
  foreignKey: "projectId",
});
User.belongsToMany(Project, {
  through: "ProjectMembers",
  as: "Project",
  foreignKey: "userId",
});

export default Project;
