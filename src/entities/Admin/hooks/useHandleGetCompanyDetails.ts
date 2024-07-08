import { useAppDispatch } from 'app/providers/StoreProvider';
import { getCompanyDetails } from '../model/service/getCompanies.ts';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { $isLoading } from '../model/selector';

export const useHandleGetCompanyDetails = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector($isLoading);
    const handleGet = async (id: number, navigatePath?: string) => {
        await dispatch(getCompanyDetails({ id: id }));
        navigatePath && navigate(navigatePath);
    };

    return {
        handleGet,
        isLoading,
    };
};
