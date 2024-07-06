import { useAppDispatch } from 'app/providers/StoreProvider';
import { getCompanyDetails } from '../model/service/getCompanies.ts';
import { useNavigate } from 'react-router-dom';
import { getRouteCompanyDetail } from 'shared/config/routeConfig/routeConfig.tsx';

export const useHandleGetCompanyDetails = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleGet = async (id: number) => {
        await dispatch(getCompanyDetails({ id: id }));
        navigate(`../${getRouteCompanyDetail(`${id}`)}`);
    };

    return {
        handleGet,
    };
};
