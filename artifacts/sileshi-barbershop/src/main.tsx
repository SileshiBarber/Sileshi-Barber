import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initTracker } from "./lib/tracker";

initTracker();

createRoot(document.getElementById("root")!).render(<App />);
