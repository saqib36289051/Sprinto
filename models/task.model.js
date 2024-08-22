import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Sprint from "./sprint.model.js";
import User from "./user.model.js";
const { STATUSES, PRIORITIES } = require("../utils/Constants.js");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sprintId: {
    type: DataTypes.INTEGER,
    references: {
      model: Sprint,
      key: "id",
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  assignedTo: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  status: {
    type: DataTypes.ENUM(STATUSES.TODO, STATUSES.IN_PROGRESS, STATUSES.DONE),
    defaultValue: STATUSES.TODO,
  },
  priority: {
    type: DataTypes.ENUM(PRIORITIES.LOW, PRIORITIES.MEDIUM, PRIORITIES.HIGH),
    defaultValue: PRIORITIES.MEDIUM,
  },
});

Sprint.hasMany(Task, { foreignKey: "sprintId" });
Task.belongsTo(Sprint, { foreignKey: "sprintId" });
User.hasMany(Task, { foreignKey: "assignedTo" });
Task.belongsTo(User, { foreignKey: "assignedTo" });

export default Task;
