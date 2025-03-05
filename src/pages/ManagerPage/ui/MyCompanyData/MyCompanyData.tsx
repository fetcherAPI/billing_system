import { useAppDispatch } from 'app/providers/StoreProvider';
import { getCompanyDetails } from 'entities/Admin';
import { useEffect } from 'react';
import { companyIdLocalStore } from 'shared/lib';
import { CompanyDetails } from 'widgets/CompanyDetails';

const MyCompanyData = () => {
    const companyId = Number.parseInt(companyIdLocalStore() || '');
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
