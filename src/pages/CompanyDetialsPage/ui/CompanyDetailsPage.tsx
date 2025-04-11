import { CompanyDetails, CompanyDetailsControl } from 'widgets/CompanyDetails';
import { useParams } from 'react-router-dom';
import { Col, Divider, Row } from 'antd';
import { CompanyUsersList } from 'widgets/CompanyUsers';
import { useDispatchToStore } from 'shared/lib/hooks/useDisaptchToStore';
import { useEffect } from 'react';
import { companyIdLocalStore } from 'shared/lib';
import { getCompanyUsers } from 'entities/user';

const CompanyDetailsPage = () => {
    const handleGetUsers = useDispatchToStore<{ id: number }>(getCompanyUsers);
    useEffect(() => {
        if (id) {
            handleGetUsers({ id: +id });
        }
    }, []);

    const { id } = useParams();
    const companyId = companyIdLocalStore();

    if (!id && !companyId) return <p>Company id is not provided UsersListPage</p>;

    return (
        <Row gutter={16}>
            <Col span={16}>
                <CompanyDetailsControl />
                <br />
                <CompanyDetails companyId={Number(id) || Number(companyId)} />
                <Divider />
            </Col>
            <Col span={8}>
                <CompanyUsersList companyId={Number(id) || Number(companyId)} />
            </Col>
        </Row>
    );
};

export default CompanyDetailsPage;
