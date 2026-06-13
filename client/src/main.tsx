import { createRoot } from "react-dom/client";
import App from "./App";
import { AdmAuthProvider } from "./contexts/AdmAuthContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <AdmAuthProvider>
    <App />
  </AdmAuthProvider>
);
