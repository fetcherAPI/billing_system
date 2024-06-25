import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "./app/providers/ErrorBoundary";
import { StoreProvider } from "./app/providers/StoreProvider";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import { App } from "./app/App";
import "./shared/config/i18n/i18n";
import "./app/styles/index.scss";
import "./index.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
dayjs.extend(relativeTime);
root.render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <h1>{dayjs("2024-05-29T11:19:14.174Z").fromNow()}</h1>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>
);
