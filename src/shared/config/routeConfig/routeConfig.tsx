import { Outlet, RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage/ui/MainPage';
import { LoginPage } from 'pages/LoginPage/ui/LoginPage';
import { RegistrationPageLazy } from 'pages/RegistrationPage';
import { AdminPageAsync, CompaniesAsync } from 'pages/AdminPage';
import { CompanyDetailsAsync } from 'pages/CompanyDetialsPage';

export enum AppRoutes {
    MAIN = 'main',
    ADMIN = 'admin',
    PUBLIC = 'public',
}

export enum ChildRoutes {
    REGISTRATION = 'registration',
    LOGIN = 'login',
    COMPANY = 'company',
    COMPANIES = 'companies',
    COMPANY_DETAILS = 'companyDetails',
    PAYMENTS = 'payments',
}

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    child?: Record<string, AppRoutesProps>;
    roles?: string[];
    preQualification?: boolean;
};

export const getRouteCompanyDetail = (param: string) => `${ChildRoutes.COMPANIES}/${param}`;
export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ADMIN]: 'admin',
    [AppRoutes.PUBLIC]: 'public',
    // последний
};

export const ChildRoutePath: Record<ChildRoutes, string> = {
    [ChildRoutes.REGISTRATION]: 'registration',
    [ChildRoutes.LOGIN]: 'login',
    [ChildRoutes.COMPANY]: 'company',
    [ChildRoutes.COMPANIES]: ChildRoutes.COMPANIES,
    [ChildRoutes.PAYMENTS]: ChildRoutes.PAYMENTS,
    [ChildRoutes.COMPANY_DETAILS]: getRouteCompanyDetail(':id'),

    // последний
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },

    [AppRoutes.ADMIN]: {
        path: RoutePath.admin,
        element: <AdminPageAsync />,
        // roles: ['admin'],
        // authOnly: true,
        child: {
            [ChildRoutes.COMPANIES]: {
                path: ChildRoutePath.companies,
                element: <CompaniesAsync />,
            },
            [ChildRoutes.COMPANY_DETAILS]: {
                path: ChildRoutePath.companyDetails,
                element: <CompanyDetailsAsync />,
            },
            [ChildRoutes.PAYMENTS]: {
                path: ChildRoutePath.payments,
                element: <h1>payments </h1>,
            },
        },
    },

    [AppRoutes.PUBLIC]: {
        path: AppRoutes.PUBLIC,
        element: <Outlet />,
        child: {
            [ChildRoutes.REGISTRATION]: {
                path: ChildRoutePath.registration,
                element: <RegistrationPageLazy />,
                child: {
                    ['type']: {
                        path: ':type',
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
