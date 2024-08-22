import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Task from "./task.model.js";
import User from "./user.model.js";

const Comment = sequelize.define('Comment', {
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
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  comment: {
    type: DataTypes.TEXT,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Task.hasMany(Comment, { foreignKey: 'taskId' });
Comment.belongsTo(Task, { foreignKey: 'taskId' });
User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

export default Comment;