import { Button1, ThemeButton } from 'shared/ui/Button1';
import { useAppDispatch } from '../../../app/providers/StoreProvider';
import { getCompanyUsers } from '../model/service/getCompanyUsers.ts';
import { useSelector } from 'react-redux';
import { $isLoading } from '../model/selectors';

const useDispatchToStore = <T = undefined>(
    serviceParam: T,
    service: (param: T) => any,
) => {
    const dispatch = useAppDispatch();

    return () => {
        dispatch(service(serviceParam));
    };
};

interface IProps {
    id: number;
}

export const GetCompanyUsers = ({ id }: IProps) => {
    const handleGetUsers = useDispatchToStore<{ id: number }>({ id }, getCompanyUsers);
    const isLoading = useSelector($isLoading);
    return <Button1 theme={ThemeButton.PRIMARY}
                    onClick={handleGetUsers}>{isLoading ? 'load..' : 'Сотрудники'}</Button1>;
};


