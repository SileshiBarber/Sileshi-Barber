import { Router, type IRouter } from "express";
import { recordEvent } from "../lib/metrics.js";
import { logger } from "../lib/logger.js";

const router: IRouter = Router();

router.post("/track", (req, res) => {
  try {
    const { event } = req.body as { event?: string };
    if (!event || typeof event !== "string" || event.length > 120) {
      res.status(400).json({ error: "Invalid event" });
      return;
    }
    const ua = (req.headers["user-agent"] ?? "").slice(0, 200);
    const ref = (req.headers["referer"] ?? "").slice(0, 200);
    // Run async so we don't block the client
    setImmediate(() => {
      try {
        recordEvent(event, ua, ref);
      } catch (err) {
        logger.error({ err }, "Failed to record event");
      }
    });
    res.status(204).end();
  } catch (err) {
    logger.error({ err }, "Track endpoint error");
    res.status(500).end();
  }
});

export default router;
