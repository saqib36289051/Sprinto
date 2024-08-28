//id,name,description,createdBy
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";

const Project = sequelize.define(
  "Projects",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    createdBy: {
      type: DataTypes.UUID,
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
