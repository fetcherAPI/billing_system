import { onFailedLogin } from 'shared/lib/sideEffects/sideEffects';
import { Button1 } from 'shared/ui/Button1';
import { AuthOnly } from 'shared/ui/AuthOnly/AuthOnly';

export const LogoutBtn = () => {
    const handleLogOut = () => {
        onFailedLogin();
        const url = window.location.origin;
        window.location.replace(`${url}`);
        return;
    };

    return (
        <AuthOnly>
            <Button1 onClick={handleLogOut}>Выйти</Button1>
        </AuthOnly>
    );
};
