import { Outlet, RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage/ui/MainPage';
import { LoginPage } from 'pages/LoginPage/ui/LoginPage';
import { RegistrationPageLazy } from 'pages/RegistrationPage';
import { AdminPageAsync, CompaniesAsync, ServicesAsync } from 'pages/AdminPage';
import { CompanyDetailsAsync } from 'pages/CompanyDetialsPage';
import { ServiceDetailsAsync } from 'pages/AdminPage/Services/ServiceDetails.async';
import {
    ManagerBillsPageAsync,
    ManagerPageAsync,
    ManagerServiceDetailPageAsync,
    ManagerServicesAsync,
} from 'pages/ManagerPage';

export enum AppRoutes {
    MAIN = 'main',
    ADMIN = 'admin',
    PUBLIC = 'public',
    MANAGER = 'manager',
}

export enum ChildRoutes {
    REGISTRATION = 'registration',
    LOGIN = 'login',
    COMPANY = 'company',
    COMPANIES = 'companies',
    COMPANY_DETAILS = 'companyDetails',
    SERVICE = 'service',
    SERVICE_DETAILS = 'serviceDetails',
    BILLS = 'bills',
}

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    child?: Record<string, AppRoutesProps>;
    roles?: string[];
    preQualification?: boolean;
};

export const getRouteCompanyDetail = (param: string | number) => `${ChildRoutes.COMPANIES}/${param}`;
export const getRouteServiceDetail = (param: string | number) => `${ChildRoutes.SERVICE}/${param}`;

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ADMIN]: 'admin',
    [AppRoutes.PUBLIC]: 'public',
    [AppRoutes.MANAGER]: 'manager',
    // последний
};

export const ChildRoutePath: Record<ChildRoutes, string> = {
    [ChildRoutes.REGISTRATION]: 'registration',
    [ChildRoutes.LOGIN]: 'login',
    [ChildRoutes.COMPANY]: 'company',
    [ChildRoutes.COMPANIES]: ChildRoutes.COMPANIES,
    [ChildRoutes.SERVICE]: ChildRoutes.SERVICE,
    [ChildRoutes.COMPANY_DETAILS]: getRouteCompanyDetail(':id'),
    [ChildRoutes.SERVICE_DETAILS]: getRouteServiceDetail(':id'),
    [ChildRoutes.BILLS]: 'bills',

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
            [ChildRoutes.SERVICE]: {
                path: ChildRoutePath.service,
                element: <ServicesAsync />,
            },
            [ChildRoutes.SERVICE_DETAILS]: {
                path: ChildRoutePath.serviceDetails,
                element: <ServiceDetailsAsync />,
            },
        },
    },

    [AppRoutes.MANAGER]: {
        path: RoutePath.manager,
        element: <ManagerPageAsync />,
        // roles: ['admin'],
        // authOnly: true,
        child: {
            [ChildRoutes.SERVICE]: {
                path: ChildRoutePath.service,
                element: <ManagerServicesAsync />,
            },
            [ChildRoutes.SERVICE_DETAILS]: {
                path: ChildRoutePath.serviceDetails,
                element: <ManagerServiceDetailPageAsync />,
            },
            [ChildRoutes.BILLS]: {
                path: ChildRoutePath.bills,
                element: <ManagerBillsPageAsync />,
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
