import { Button1, ThemeButton } from 'shared/ui/Button1';
import { useDispatchToStore } from 'shared/lib/hooks/useDisaptchToStore';
import { activateUser, deactivateUser } from '../model/service/activateUser.ts';

interface IProps {
    id: number;
}

export const ActivateUser = ({ id }: IProps) => {
    const handleActivate = useDispatchToStore<{ id: number }>(activateUser);

    return (
        <Button1 onClick={() => handleActivate({ id })} theme={ThemeButton.SECONDARY}>
            Активировать
        </Button1>
    );
};

export const DeactivateUser = ({ id }: IProps) => {
    const handleDeactivate = useDispatchToStore<{ id: number }>(deactivateUser);

    return (
        <Button1 onClick={() => handleDeactivate({ id })} theme={ThemeButton.PRIMARY}>
            Блокировать
        </Button1>
    );
};
