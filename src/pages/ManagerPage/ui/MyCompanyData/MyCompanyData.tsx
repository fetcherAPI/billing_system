import { useAppDispatch } from 'app/providers/StoreProvider';
import { getCompanyDetails } from 'entities/Admin';
import { $userCompanyId } from 'features/Auth/model/selectors';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CompanyDetails } from 'widgets/CompanyDetails';

const MyCompanyData = () => {
    const companyId = useSelector($userCompanyId);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (companyId) {
            dispatch(getCompanyDetails({ id: companyId }));
        }
    }, []);
    if (!companyId) return 'id not found';

    return <CompanyDetails companyId={companyId} />;
};

export default MyCompanyData;
