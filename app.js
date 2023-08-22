import * as config from "./utils/config.js";
import express from "express";
import cors from "cors";
import blogsRouter from "./controllers/blogs.js";
import defaultRoutesRouter from "./controllers/defaultRoutes.js";
import * as middleware from "./utils/middleware.js";
import * as logger from "./utils/logger.js";
import mongoose from "mongoose";

const app = express();

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);
app.use("/", defaultRoutesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
