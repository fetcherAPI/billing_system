import { Button1, ThemeButton } from 'shared/ui/Button1';
import { useDispatchToStore } from 'shared/lib/hooks/useDisaptchToStore';
import { activateCompany } from 'entities/Admin';

interface IProps {
    id: string;
}

export const ActivateCompany = ({ id }: IProps) => {
    const handleActivateCompany = useDispatchToStore<{ id: string }>(activateCompany);
    return (
        <Button1
            theme={ThemeButton.PRIMARY}
            style={{ alignSelf: 'flex-start' }}
            onClick={() => handleActivateCompany({ id })}
        >
            Активировать
        </Button1>
    );
};
