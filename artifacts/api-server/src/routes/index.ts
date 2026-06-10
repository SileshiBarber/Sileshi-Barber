import { Router, type IRouter } from "express";
import healthRouter from "./health";
import trackRouter from "./track";
import reportRouter from "./report";

const router: IRouter = Router();

router.use(healthRouter);
router.use(trackRouter);
router.use(reportRouter);

export default router;
