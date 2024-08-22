import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Task from "./task.model.js";

const Attachment = sequelize.define('Attachment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  taskId: {
    type: DataTypes.INTEGER,
    references: {
      model: Task,
      key: 'id',
    },
  },
  filename: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
  },
});

Task.hasMany(Attachment, { foreignKey: 'taskId' });
Attachment.belongsTo(Task, { foreignKey: 'taskId' });

export default Attachment;
