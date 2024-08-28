import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Project from "./project.model.js";

const Sprint = sequelize.define("Sprint", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  projectId: {
    type: DataTypes.UUID,
    references: {
      model: Project,
      key: "id",
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Project.hasMany(Sprint, { foreignKey: "projectId" });
Sprint.belongsTo(Project, { foreignKey: "projectId" });

export default Sprint;
