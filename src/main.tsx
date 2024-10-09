import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

const manifestUrl = "https://buendio.github.io/ton_front/manifest.json";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>
);
