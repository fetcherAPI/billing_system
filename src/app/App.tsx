import { classNames } from "shared/lib/classNames/classNames.ts";
import { Theme, useTheme } from "./providers/ThemeProvider";
import { AppRouter } from "./providers/router";
import { Header } from "widgets/Header";
import "./App.css";

export const App = () => {
  const { theme } = useTheme();
  return (
    <div className={classNames("app", {}, [theme || Theme.LIGHT])}>
      <Header />

      <AppRouter />
    </div>
  );
};
