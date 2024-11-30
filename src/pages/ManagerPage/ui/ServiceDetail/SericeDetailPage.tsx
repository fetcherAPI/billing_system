import { Button, Card, Col, Row } from 'antd';
import { CreateServiceForm } from 'features/CreateService/ui/CreateServiceForm';
import { useParams } from 'react-router-dom';
import { mockServices } from 'widgets/ServicesTable/ServicesTable';

const SericeDetailPage = () => {
    const { id } = useParams();
    if (!id) return null;
    return (
        <Card>
            <Row gutter={240}>
                <Col span={12}>
                    <CreateServiceForm defaultValue={mockServices.find((el) => el.id === +id)} />
                </Col>
                <Col style={{ marginTop: 30 }}>
                    <Button>Сгенерировать код оплаты</Button>
                </Col>
            </Row>
        </Card>
    );
};

export default SericeDetailPage;
