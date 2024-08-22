//id,name,description,createdBy
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./user.model.js";

const Project = sequelize.define(
  "projects",
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
      type: DataTypes.STRING,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);

Project.belongsToMany(User, {
  through: "ProjectMembers",
  as: "members",
  foreignKey: "projectId",
});
User.belongsToMany(Project, {
  through: "ProjectMembers",
  as: "projects",
  foreignKey: "userId",
});

export default Project;
