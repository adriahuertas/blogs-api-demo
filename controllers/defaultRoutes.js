import express from "express";

const defaultRoutesRouter = express.Router();

defaultRoutesRouter.get("/", (request, response) => {
  response.send(
    "<h1>API Blogs</h1> \
  <p>This is a demo API build in express. <br>Main endpoint: /api/blogs</p>"
  );
});

export default defaultRoutesRouter;
