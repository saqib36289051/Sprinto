import { validate as uuidValidate } from "uuid";
import User from "../models/user.model.js";
const getCurrentUser = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: req.user,
  });
};

const updateUser = async (req, res) => {
  const { name, email, password, role, fullName, img } = req.body;
  const userId = req.user.id;

  if (!uuidValidate(userId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID format",
    });
  }
  const user = await User.findByPk(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.password = password || user.password;
  user.role = role || user.role;
  user.fullName = fullName || user.fullName;
  user.img = img || user.img;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: user,
  });
};
export { getCurrentUser, updateUser };
