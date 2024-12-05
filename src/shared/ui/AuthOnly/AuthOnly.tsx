import { $isAuth } from 'features/Auth/model/selectors';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';

type Props = {
    hide: boolean;
    children: ReactNode;
};

export const AuthOnly = ({ children, hide }: Props) => {
    const isAuth = useSelector($isAuth);
    if (!isAuth || hide) return null;
    return <>{children}</>;
};
