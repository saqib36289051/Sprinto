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


app.use("/api/auth", AuthRoutes);
// app.use('/api/users', userRoutes);

app.use(errorHandler);

export default app;
