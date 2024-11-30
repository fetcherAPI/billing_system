import { Card, Descriptions, Divider } from 'antd';
import { IService } from 'entities/Admin/type';
import { BackButton } from 'shared/ui';

export const ServiceDetailWidget = ({ service }: { service: IService }) => {
    return (
        <>
            <Card title={`Service Details - ID: ${service.id}`} bordered={true}>
                <Descriptions bordered column={2}>
                    <Descriptions.Item label="Date Created">
                        {new Date(service.date_created).toLocaleString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Destination">{service.destination}</Descriptions.Item>
                    <Descriptions.Item label="Number">{service.number}</Descriptions.Item>
                    <Descriptions.Item label="Amount">${service.amount.toFixed(2)}</Descriptions.Item>
                    <Descriptions.Item label="Role">{service.role}</Descriptions.Item>
                    <Descriptions.Item label="Payer INN">{service.payer_inn}</Descriptions.Item>
                    <Descriptions.Item label="Payer Name">{service.payer_name}</Descriptions.Item>
                    <Descriptions.Item label="Chapter ID">{service.chapter_id}</Descriptions.Item>
                    <Descriptions.Item label="Splitter">{service.splitter}</Descriptions.Item>
                    <Descriptions.Item label="Pay ID">{service.pay_id}</Descriptions.Item>
                    <Descriptions.Item label="Status">
                        {service.status === 1 ? 'Completed' : service.status === 2 ? 'Canceled' : 'Pending'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Payment Code">{service.payment_code}</Descriptions.Item>
                </Descriptions>
            </Card>
            <Divider />
            <BackButton />
        </>
    );
};
