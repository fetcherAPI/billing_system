import { Button1, ThemeButton } from 'shared/ui/Button1';
import { useDispatchToStore } from 'shared/lib/hooks/useDisaptchToStore';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { activateUser, deactivateUser } from 'entities/user';

interface IProps {
    id: number;
    them?: ThemeButton;
    icon?: boolean;
}

export const ActivateUser = ({ id, them, icon }: IProps) => {
    const handleActivate = useDispatchToStore<{ id: number }>(activateUser);

    return (
        <Button1 onClick={() => handleActivate({ id })} theme={them || ThemeButton.SECONDARY}>
            {icon ? (
                <CloseCircleTwoTone twoToneColor="tomato" style={{ fontSize: '22px' }} />
            ) : (
                'Активировать'
            )}
        </Button1>
    );
};

export const DeactivateUser = ({ id, them, icon }: IProps) => {
    const handleDeactivate = useDispatchToStore<{ id: number }>(deactivateUser);

    return (
        <Button1 onClick={() => handleDeactivate({ id })} theme={them || ThemeButton.PRIMARY}>
            {icon ? (
                <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '22px' }} />
            ) : (
                'Блокировать'
            )}
        </Button1>
    );
};
