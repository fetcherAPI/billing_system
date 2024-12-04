import { Button, Card, Col, Row } from 'antd';
import { $service, $servicesList } from 'entities/Service/model/selectors';
import { getServiceById } from 'entities/Service/model/service/getServiceById';
import { CreateSplitterForm } from 'features/CreateService/ui/CreateSplitterForm';
import { GeneratePaymentCode } from 'features/CreateService/ui/GeneratePaymentCodeForm';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatchToStore } from 'shared/lib/hooks/useDisaptchToStore';

const SericeDetailPage = () => {
    const { id } = useParams();
    const service = useSelector($service);
    const servicesList = useSelector($servicesList);
    const handleGetService = useDispatchToStore<{ id: number }>(getServiceById);

    useEffect(() => {
        if (!servicesList.length && id) {
            handleGetService({ id: +id });
        }
    }, []);

    if (!id) return null;

    return (
        <Card>
            <Row gutter={24}>
                <Col span={12}>
                    <CreateSplitterForm defaultValue={service || servicesList.find((el) => el.id === +id)} />
                </Col>
                <Col span={12}>
                    <GeneratePaymentCode chapterId={+id} />
                </Col>
            </Row>
        </Card>
    );
};

export default SericeDetailPage;
