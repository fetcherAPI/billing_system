import { CompanyDetails, CompanyDetailsControl } from 'widgets/CompanyDetails';
import { useParams } from 'react-router-dom';
import { Col, Divider, Row } from 'antd';
import { CompanyUsersList } from 'widgets/CompanyUsers';
import { useDispatchToStore } from 'shared/lib/hooks/useDisaptchToStore';
import { getCompanyUsers } from 'features/CompanyUsers/model/service/getCompanyUsers.ts';
import { useEffect } from 'react';
import { BackButton } from 'shared/ui/index.ts';

const CompanyDetailsPage = () => {
    const { id } = useParams();
    const handleGetUsers = useDispatchToStore<{ id: number }>(getCompanyUsers);
    useEffect(() => {
        if (id) {
            handleGetUsers({ id: +id });
        }
    }, []);
    if (!id) return <h1>Company id is not provided</h1>;

    return (
        <Row gutter={16}>
            <Col span={17}>
                <CompanyDetailsControl />
                <br />
                <CompanyDetails />
                <Divider />
                <BackButton />
            </Col>
            <Col span={7}>
                <CompanyUsersList />
            </Col>
        </Row>
    );
};

export default CompanyDetailsPage;
