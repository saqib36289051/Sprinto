import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
// import sequelize from "./config/db";
// import errorHandler from "./middleware/errorHandler";
dotenv.config();

const app = express();

// sequelize
//   .authenticate()
//   .then(() => console.log("Database connected..."))
//   .catch((err) => console.error("Unable to connect to the database:", err));

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

export default app;
