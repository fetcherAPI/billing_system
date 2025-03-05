import { getServiceById } from 'entities/Service/model/service/getServiceById';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { companyIdLocalStore } from 'shared/lib';
import { useDispatchToStore } from 'shared/lib/hooks/useDisaptchToStore';
import { ServiceDetailWidget } from 'widgets/ServiceDetails';

const ServiceDetails = () => {
    const handleGetUsers = useDispatchToStore<{ id: number }>(getServiceById);
    const { id } = useParams();
    const companyId = companyIdLocalStore();

    useEffect(() => {
        if (id) {
            handleGetUsers({ id: Number(id) || Number(companyId) });
        }
    }, [id, companyId]);

    if (!id && !companyId) return <p>Company id is not provided UsersListPage</p>;

    return <ServiceDetailWidget />;
};

export default ServiceDetails;
