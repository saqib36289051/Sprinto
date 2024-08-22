import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { USER_ROLES } from "../utils/Constants.js";

const Register = asyncHandler(async (req, res) => {
  const { name, email, password, role, fullName, img } = req.body;

  if (!name || !email || !password || !role || !fullName) {
    res.status(400);
    throw new Error("Please fill all fields");
    // throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ where: { email } });
  if (user) {
    res.status(400);
    throw new Error("User already exists");
    // throw new ApiError(400, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: USER_ROLES.DEVELOPER,
    fullName: name,
    img,
  });

  const payload = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    img: newUser.img,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const createdUser = {
    id: newUser.id,
    name: newUser.name,
    fullName: newUser.fullName,
    email: newUser.email,
    role: newUser.role,
    img: newUser.img,
    createdAt: newUser.createdAt,
    updatedAt: newUser.updatedAt,
    token,
  };

  return res
    .status(200)
    .json({ success: true, message: "User created successfully", createdUser });
});

export default Register;
