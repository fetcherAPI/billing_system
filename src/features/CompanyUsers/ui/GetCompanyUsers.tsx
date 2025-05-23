import { useSelector } from 'react-redux';
import { Button1, ThemeButton } from 'shared/ui/Button1';
import { useDispatchToStore } from 'shared/lib/hooks/useDisaptchToStore';
import { $isLoading, getCompanyUsers } from 'entities/user';

interface IProps {
    id: number;
}

export const GetCompanyUsers = ({ id }: IProps) => {
    const handleGetUsers = useDispatchToStore<{ id: number }>(getCompanyUsers);
    const isLoading = useSelector($isLoading);

    return (
        <Button1 theme={ThemeButton.PRIMARY} onClick={() => handleGetUsers({ id })}>
            {isLoading ? 'load..' : 'пользователи'}
        </Button1>
    );
};
