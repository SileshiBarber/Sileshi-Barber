import { Router, type IRouter } from "express";
import healthRouter from "./health";
import trackRouter from "./track";

const router: IRouter = Router();

router.use(healthRouter);
router.use(trackRouter);

export default router;
