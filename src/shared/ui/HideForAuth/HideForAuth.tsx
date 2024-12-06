import { $isAuth } from 'features/Auth/model/selectors';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';

type Props = {
    children: ReactNode;
};

export const HideForAuth = ({ children }: Props) => {
    const isAuth = useSelector($isAuth);
    if (isAuth) return null;
    return <>{children}</>;
};
