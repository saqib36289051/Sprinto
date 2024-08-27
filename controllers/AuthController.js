import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { USER_ROLES } from "../utils/Constants.js";
import Validator from "../utils/Validator.js";

const Register = asyncHandler(async (req, res) => {
  const { name, email, password, role, fullName, img } = req.body;

  if (!name || !email || !password || !role || !fullName) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const user = await User.findOne({ where: { email } });
  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    fullName,
    img,
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
  };

  return res
    .status(200)
    .json({ success: true, message: "User created successfully", createdUser });
});

const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const validate = Validator(
    {
      email: "Please provide a valid email",
      password: "Please provide a valid password",
    },
    req.body
  );
  if (Object.keys(validate).length > 0) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields",
      fields: validate,
    });
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    res.status(400);
    throw new Error("User does not exist");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    img: user.img,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const loginUser = {
    id: user.id,
    name: user.name,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    img: user.img,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    token,
  };

  return res
    .status(200)
    .json({ success: true, message: "User logged in successfully", loginUser });
});

export { Register, Login };
