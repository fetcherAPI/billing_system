import { Suspense, useCallback, useMemo } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppRoutesProps, routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'shared/ui/PageLoader/PageLoader';
import { useSelector } from 'react-redux';
import { $isAuth, $userRole } from 'features/Auth/model/selectors';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = <Suspense fallback={<PageLoader />}>{route.element}</Suspense>;
        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth roles={route.roles}>{element}</RequireAuth> : element}
            >
                {route.child ? Object.values(route.child).map((child) => renderWithWrapper(child)) : null}
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
    const auth = useSelector($isAuth) || Boolean(localStorage.getItem('token'));
    const location = useLocation();
    const userRoles = useSelector($userRole);

    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true;
        }
        return roles.some((requiredRole) => {
            return userRoles?.includes(requiredRole);
        });
    }, [roles, userRoles]);

    if (!auth) {
        return <Navigate to={'/'} state={{ from: location }} replace />;
    }

    if (!hasRequiredRoles) {
        return <h1>403 access denided</h1>;
    }
    return children;
}

export default AppRouter;
