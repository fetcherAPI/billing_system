import { RouteProps } from "react-router-dom";
import { MainPage } from "../../../pages/MainPage/ui/MainPage";
import { LoginPage } from "pages/LoginPage/ui/LoginPage";
import { RegistrationPage } from "pages/RegistrationPage/ui/RegistrationPage";

export enum AppRoutes {
  MAIN = "main",
  LOGIN = "login",
  ADMIN = "admin",
  REGISTRATION = "registration",
}

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  child?: Record<string, AppRoutesProps>;
  roles?: string[];
  preQualification?: boolean;
};

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.LOGIN]: "login",
  [AppRoutes.ADMIN]: "admin",
  [AppRoutes.REGISTRATION]: "registration",
  // последний
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
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
  [AppRoutes.REGISTRATION]: {
    path: RoutePath.registration,
    element: <RegistrationPage />,
  },
};
