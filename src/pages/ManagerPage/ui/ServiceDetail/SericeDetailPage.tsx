import { Card, Col, Row } from 'antd';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { $service, $servicesList } from 'entities/Service/model/selectors';
import { getServiceById } from 'entities/Service/model/service/getServiceById';
import { getSplittersByChapterId } from 'entities/Service/model/service/getSplittersByChapterId';
import { CreateSplitterForm } from 'features/CreateService/ui/CreateSplitterForm';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatchToStore } from 'shared/lib/hooks/useDisaptchToStore';
import SplittersTable from 'widgets/SplittersTable/SplittersTable';

const SericeDetailPage = () => {
    const { id } = useParams();
    const service = useSelector($service);
    const servicesList = useSelector($servicesList);
    const handleGetService = useDispatchToStore<{ id: number }>(getServiceById);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!servicesList.length && id) {
            handleGetService({ id: +id });
        }
        if (id) {
            dispatch(getSplittersByChapterId({ id: +id }));
        }
    }, []);

    if (!id) return null;

    return (
        <Card>
            <Row gutter={24}>
                <Col span={12}>
                    <CreateSplitterForm defaultValue={service || servicesList.find((el) => el.id === +id)} />
                </Col>
                <Col span={12}></Col>
            </Row>

            <SplittersTable />
        </Card>
    );
};

export default SericeDetailPage;
