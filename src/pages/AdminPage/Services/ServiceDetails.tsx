import { getServiceById } from 'entities/Service/model/service/getServiceById';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatchToStore } from 'shared/lib/hooks/useDisaptchToStore';
import { ServiceDetailWidget } from 'widgets/ServiceDetails';

const ServiceDetails = () => {
    const { id } = useParams();
    const handleGetUsers = useDispatchToStore<{ id: number }>(getServiceById);

    useEffect(() => {
        if (id) {
            handleGetUsers({ id: +id });
        }
    }, [id]);

    if (!id) return <h1>Company id is not provided</h1>;

    return <ServiceDetailWidget />;
};

export default ServiceDetails;
