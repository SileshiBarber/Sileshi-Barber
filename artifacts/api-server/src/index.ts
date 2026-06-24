import app from "./app";
import { logger } from "./lib/logger";
import { startReporter } from "./lib/reporter";

export default app;

const rawPort = process.env["PORT"];

if (rawPort) {
  const port = Number(rawPort);

  if (Number.isNaN(port) || port <= 0) {
    throw new Error(`Invalid PORT value: "${rawPort}"`);
  }

  app.listen(port, () => {
    logger.info({ port }, "Server listening");
    startReporter();
  });
}
