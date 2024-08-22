import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { USER_ROLES } from "../utils/Constants.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(
        USER_ROLES.ADMIN,
        USER_ROLES.PROJECT_MANAGER,
        USER_ROLES.DEVELOPER
      ),
      defaultValue: USER_ROLES.DEVELOPER,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

export default User;
