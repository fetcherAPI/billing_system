import { Outlet, RouteProps } from 'react-router-dom'
import { MainPage } from 'pages/MainPage/ui/MainPage'
import { LoginPage } from 'pages/LoginPage/ui/LoginPage'
import { RegistrationPageLazy } from 'pages/RegistrationPage'
import { AdminPageAsync } from '../../../pages/AdminPage'

export enum AppRoutes {
    MAIN = 'main',
    ADMIN = 'admin',
    PUBLIC = 'public',
}

export enum ChildRoutes {
    REGISTRATION = 'registration',
    LOGIN = 'login',
    COMPANY = 'company',
    GOV_ORGANIZATIONS = 'gov-organizations',
    PAYMENTS = 'payments',
}

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean
    child?: Record<string, AppRoutesProps>
    roles?: string[]
    preQualification?: boolean
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ADMIN]: 'admin',
    [AppRoutes.PUBLIC]: 'public',
    // последний
}

export const ChildRoutePath: Record<ChildRoutes, string> = {
    [ChildRoutes.REGISTRATION]: 'registration',
    [ChildRoutes.LOGIN]: 'login',
    [ChildRoutes.COMPANY]: 'company',
    [ChildRoutes.GOV_ORGANIZATIONS]: ChildRoutes.GOV_ORGANIZATIONS,
    [ChildRoutes.PAYMENTS]: ChildRoutes.PAYMENTS,

    // последний
}

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },

    [AppRoutes.ADMIN]: {
        path: RoutePath.admin,
        element: <AdminPageAsync />,
        child: {
            [ChildRoutes.GOV_ORGANIZATIONS]: {
                path: ChildRoutePath['gov-organizations'],
                element: <h1>Children of admin</h1>,
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
}
