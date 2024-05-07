import { RouteProps } from "react-router-dom";
import { MainPage } from "../../../pages/MainPage/ui/MainPage";
import { LoginPage } from "pages/LoginPage/ui/LoginPage";

export enum AppRoutes {
  MAIN = "main",
  LOGIN = "login",
  ADMIN = "admin",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.LOGIN]: "login",
  [AppRoutes.ADMIN]: "admin",
  // последний
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    element: <LoginPage />,
  },
  [AppRoutes.ADMIN]: {
    path: RoutePath.admin,
    element: <h1>admin</h1>,
  },
};
