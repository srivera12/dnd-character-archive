import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./components/ArchiveApp";
import { EuiProvider } from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_light.css";
import { CharacterProvider } from "./utils/CharacterContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <CharacterProvider>
    <EuiProvider colorMode="light">
      <App />
    </EuiProvider>
  </CharacterProvider>
);
