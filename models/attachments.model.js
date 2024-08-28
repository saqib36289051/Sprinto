import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Task from "./task.model.js";

const Attachment = sequelize.define("Attachment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  taskId: {
    type: DataTypes.UUID,
    references: {
      model: Task,
      key: "id",
    },
  },
  filename: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
  },
});

Task.hasMany(Attachment, { foreignKey: "taskId" });
Attachment.belongsTo(Task, { foreignKey: "taskId" });

export default Attachment;
