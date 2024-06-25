import { classNames } from "shared/lib/classNames/classNames.ts";
import { Theme, useTheme } from "./providers/ThemeProvider";
import { AppRouter } from "./providers/router";
import { Header } from "widgets/Header";
import cls from "./App.module.scss";
import "./App.css";

export const App = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames(cls.app, {}, [theme || Theme.LIGHT])}>
      <Header />
      <div className={cls.wrapper}>
        <AppRouter />
      </div>
    </div>
  );
};
