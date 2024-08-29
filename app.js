import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

import AuthRoutes from "./routes/AuthRoutes.js";
import ProjectRoutes from "./routes/ProjectRoutes.js";
import SprintRoutes from "./routes/SprintRoutes.js";
import TaskRoutes from "./routes/TaskRoutes.js";
import CommentRoutes from "./routes/CommentRoutes.js";
import AttachmentsRoutes from "./routes/AttachmentsRoutes.js";

app.use("/api/auth", AuthRoutes);
app.use("/api/project", ProjectRoutes);
app.use("/api/sprint", SprintRoutes);
app.use("/api/task", TaskRoutes);
app.use("/api/comment", CommentRoutes);
app.use("/api/attachments", AttachmentsRoutes);

app.use(errorHandler);

export default app;
