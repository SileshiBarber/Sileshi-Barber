import fs from "fs";
import path from "path";
import { logger } from "./logger.js";

const DATA_DIR = path.resolve(process.cwd(), "data");
const METRICS_FILE = path.join(DATA_DIR, "metrics.json");

export interface EventEntry {
  event: string;
  ts: number;
  ua?: string;
  ref?: string;
}

export interface MetricsStore {
  visits: number;
  events: EventEntry[];
  serverStartTs: number;
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function loadMetrics(): MetricsStore {
  ensureDataDir();
  if (!fs.existsSync(METRICS_FILE)) {
    return { visits: 0, events: [], serverStartTs: Date.now() };
  }
  try {
    const raw = fs.readFileSync(METRICS_FILE, "utf-8");
    return JSON.parse(raw) as MetricsStore;
  } catch {
    logger.warn("metrics.json unreadable — resetting store");
    return { visits: 0, events: [], serverStartTs: Date.now() };
  }
}

export function saveMetrics(store: MetricsStore): void {
  ensureDataDir();
  fs.writeFileSync(METRICS_FILE, JSON.stringify(store, null, 2), "utf-8");
}

export function recordEvent(event: string, ua?: string, ref?: string): void {
  const store = loadMetrics();
  if (event === "page_view") store.visits += 1;
  store.events.push({ event, ts: Date.now(), ua, ref });
  // Keep last 10 000 events to avoid unbounded growth
  if (store.events.length > 10_000) {
    store.events = store.events.slice(-10_000);
  }
  saveMetrics(store);
}

export function getReport(sinceMs: number = 30 * 24 * 60 * 60 * 1000): {
  totalVisits: number;
  recentVisits: number;
  uptimeDays: number;
  clickCounts: Record<string, number>;
  topEvents: { event: string; count: number }[];
} {
  const store = loadMetrics();
  const since = Date.now() - sinceMs;

  const recent = store.events.filter((e) => e.ts >= since);
  const recentVisits = recent.filter((e) => e.event === "page_view").length;

  const clickCounts: Record<string, number> = {};
  for (const e of recent) {
    clickCounts[e.event] = (clickCounts[e.event] ?? 0) + 1;
  }

  const topEvents = Object.entries(clickCounts)
    .map(([event, count]) => ({ event, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const uptimeDays = (Date.now() - store.serverStartTs) / (1000 * 60 * 60 * 24);

  return {
    totalVisits: store.visits,
    recentVisits,
    uptimeDays: Math.round(uptimeDays * 10) / 10,
    clickCounts,
    topEvents,
  };
}
