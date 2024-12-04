import { Card, Descriptions, Divider } from 'antd';
import { $service } from 'entities/Service/model/selectors';
import { useSelector } from 'react-redux';
import { BackButton } from 'shared/ui';

export const ServiceDetailWidget = () => {
    const service = useSelector($service);

    return (
        <>
            <Card title={`Service Details - ID: ${service?.id}`} bordered={true}>
                <Descriptions bordered column={2}>
                    <Descriptions.Item label="Destination">{service?.companyId}</Descriptions.Item>
                    <Descriptions.Item label="Number">{service?.companyName}</Descriptions.Item>
                    <Descriptions.Item label="Amount">${service?.name}</Descriptions.Item>
                </Descriptions>
            </Card>
            <Divider />
            <BackButton />
        </>
    );
};
