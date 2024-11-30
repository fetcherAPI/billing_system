import { getCompanyUsers } from 'features/CompanyUsers/model/service/getCompanyUsers';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatchToStore } from 'shared/lib/hooks/useDisaptchToStore';
import { ServiceDetailWidget } from 'widgets/ServiceDetails';
import { mockServices } from 'widgets/ServicesTable/ServicesTable';

const mockService = {
    id: 1,
    date_created: '2024-11-30T12:00:00Z',
    destination: 'Delivery to New York',
    number: 10000000001,
    amount: 500.75,
    role: 'admin',
    payer_inn: '12345678901234',
    payer_name: 'John Doe',
    chapter_id: 1,
    splitter: 'Splitter 1',
    pay_id: 101,
    status: 1,
    payment_code: 'ABC123',
};

const ServiceDetails = () => {
    const { id } = useParams();
    const handleGetUsers = useDispatchToStore<{ id: number }>(getCompanyUsers);

    useEffect(() => {
        if (id) {
            handleGetUsers({ id: +id });
        }
    }, []);

    if (!id) return <h1>Company id is not provided</h1>;

    return <ServiceDetailWidget service={mockServices.find((el) => el.id === +id) || mockService} />;
};

export default ServiceDetails;
