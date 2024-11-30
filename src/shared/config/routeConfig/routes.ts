import { AppRoutes, ChildRoutes } from './routeConfig';

export const getRouteRegistration = (param?: string) => {
    return `${AppRoutes.PUBLIC}/${ChildRoutes.REGISTRATION}/${param ? param : ''}`;
};

export const getRegisterType = (param: string) => param;

export const getLogin = () => `${AppRoutes.PUBLIC}/${ChildRoutes.LOGIN}`;
