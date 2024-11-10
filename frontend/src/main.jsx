import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { OptionChainProvider } from "./context/OptionChainProvider.jsx";

createRoot(document.getElementById("root")).render(
  <OptionChainProvider>
    <App />
  </OptionChainProvider>
);
