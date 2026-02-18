import "./load-env";
import { createApp } from "./app";
import { config } from "./config/env";
import { logger } from "./lib/logger";

const app = createApp();
console.log("AZURE containerName:");
app.listen(config.port, () => {
  logger.info(`Indomie Moments API running on port ${config.port}`);
});
