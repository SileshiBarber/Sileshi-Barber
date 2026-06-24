import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

let reqCount = 0;

app.use((req: Request, res: Response, next: NextFunction) => {
  const id = ++reqCount;
  const start = Date.now();
  res.on("finish", () => {
    logger.info({
      req: { id, method: req.method, url: req.url?.split("?")[0] },
      res: { statusCode: res.statusCode },
      responseTime: Date.now() - start,
    }, "request completed");
  });
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
