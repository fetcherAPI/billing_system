import { useSelector } from 'react-redux';
import { onFailedLogin } from 'shared/lib/sideEffects/sideEffects';
import { Button1 } from 'shared/ui/Button1';
import { $isAuth } from '../model/selectors';

export const LogoutBtn = () => {
    const handleLogOut = () => {
        onFailedLogin();
        const url = window.location.origin;
        window.location.replace(`${url}`);
        return;
    };

    const isAuth = useSelector($isAuth);
    console.log('isAuth', isAuth);
    if (!isAuth) return null;
    return <Button1 onClick={handleLogOut}>Выйти</Button1>;
};
