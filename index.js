import * as logger from "./utils/logger.js";
import * as config from "./utils/config.js";
import http from "http";
import app from "./app.js";

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
