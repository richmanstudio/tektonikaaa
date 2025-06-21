// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";      // ← меняем импорт
import AppRoutes from "./routes";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>                                   {/* ← и компонент */}
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
