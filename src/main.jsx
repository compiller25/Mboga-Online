import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // <- Use HashRouter for GitHub Pages
import App from "./App";
import "./index.css";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error(
    'Root element not found. Ensure your index.html contains: <div id="root"></div>'
  );
}

createRoot(rootEl).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);