import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { TokenProvider } from "./context/TokenContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TokenProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TokenProvider>
);