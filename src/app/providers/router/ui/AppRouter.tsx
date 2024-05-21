import { Suspense, useCallback, useMemo } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  AppRoutesProps,
  routeConfig,
} from "shared/config/routeConfig/routeConfig";
import { PageLoader } from "shared/ui/PageLoader/PageLoader";

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
    );
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? (
            <RequireAuth roles={route.roles}>{element}</RequireAuth>
          ) : (
            element
          )
        }
      >
        {route.child &&
          Object.values(route.child).map((child) => renderWithWrapper(child))}
      </Route>
    );
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

interface RequireAuthProps {
  children: JSX.Element;
  roles?: string[];
  preQualification?: boolean;
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
  const auth = true;
  const location = useLocation();
  const userRoles = "user";

  const hasRequiredRoles = useMemo(() => {
    if (!roles) {
      return true;
    }
    return roles.some((requiredRole) => {
      const hasRole = userRoles?.includes(requiredRole);
      return hasRole;
    });
  }, [roles, userRoles]);

  if (!auth) {
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }

  if (!hasRequiredRoles) {
    return <h1>403 access denided</h1>;
  }

  return children;
}

export default AppRouter;
