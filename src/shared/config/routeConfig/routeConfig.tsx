import { Outlet, RouteProps } from "react-router-dom";
import { MainPage } from "pages/MainPage/ui/MainPage";
import { LoginPage } from "pages/LoginPage/ui/LoginPage";
import { RegistrationPageLazy } from "pages/RegistrationPage";

export enum AppRoutes {
  MAIN = "main",
  ADMIN = "admin",
  PUBLIC = "public",
}

export enum ChildRoutes {
  REGISTRATION = "registration",
  LOGIN = "login",
  COMPANY = "company",
}

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  child?: Record<string, AppRoutesProps>;
  roles?: string[];
  preQualification?: boolean;
};

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.ADMIN]: "admin",
  [AppRoutes.PUBLIC]: "public",
  // последний
};

export const ChildRoutePath: Record<ChildRoutes, string> = {
  [ChildRoutes.REGISTRATION]: "registration",
  [ChildRoutes.LOGIN]: "login",
  [ChildRoutes.COMPANY]: "company",
  // последний
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },

  [AppRoutes.ADMIN]: {
    path: RoutePath.admin,
    element: <h1>admin</h1>,
  },

  [AppRoutes.PUBLIC]: {
    path: "public",
    element: <Outlet />,
    child: {
      [ChildRoutes.REGISTRATION]: {
        path: ChildRoutePath.registration,
        element: <RegistrationPageLazy />,
        child: {
          ["type"]: {
            path: ":type",
            element: <RegistrationPageLazy />,
          },
        },
      },
      [ChildRoutes.LOGIN]: {
        path: ChildRoutePath.login,
        element: <LoginPage />,
      },
    },
  },
};
