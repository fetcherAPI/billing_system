import { useSelector } from 'react-redux';
import { Divider, Table, TableProps, Tag } from 'antd';
import { BluredBackGround, Pagination } from 'shared/ui';
import { $companiesTotalCount } from 'entities/Admin';
import { getRouteServiceDetail } from 'shared/config/routeConfig/routeConfig.tsx';
import { IService } from 'entities/Admin/type';
import { useNavigate } from 'react-router-dom';

const columns: TableProps<IService>['columns'] = [
    {
        title: '№',
        dataIndex: 'number',
        key: 'number',
        render: (_, _record, index) => <a>{++index}</a>,
    },
    {
        title: 'Инн',
        dataIndex: 'payer_inn',
        key: 'payer_inn',
    },
    {
        title: 'Наименование огрганизации',
        dataIndex: 'payer_name',
        key: 'payer_name',
    },
    {
        title: 'Форма/соб',
        dataIndex: 'destination',
        key: 'destination',
    },
    {
        title: 'Статаус',
        key: 'status',
        dataIndex: 'tags',
        render: (_, { status }) => (
            <Tag color={'volcano'} key={status}>
                {status}
            </Tag>
        ),
    },
];

export const mockServices = [
    {
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
    },
    {
        id: 2,
        date_created: '2024-11-29T10:30:00Z',
        destination: 'Warehouse B',
        number: 10000000002,
        amount: 1500.0,
        role: 'user',
        payer_inn: '98765432109876',
        payer_name: 'Jane Smith',
        chapter_id: 2,
        splitter: 'Splitter 2',
        pay_id: 102,
        status: 2,
        payment_code: 'DEF456',
    },
    {
        id: 3,
        date_created: '2024-11-28T09:45:00Z',
        destination: 'Corporate HQ',
        number: 10000000003,
        amount: 200.0,
        role: 'manager',
        payer_inn: '12312312312345',
        payer_name: 'Alice Johnson',
        chapter_id: 3,
        splitter: 'Splitter 3',
        pay_id: 103,
        status: 0,
        payment_code: 'GHI789',
    },
];

export const ServicesTable = () => {
    const companiesTotalCount = useSelector($companiesTotalCount);
    const navigate = useNavigate();
    const handleGetCompaniesList = () => {
        console.log('from table ');
    };

    return (
        <div>
            <Table
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={mockServices}
                pagination={false}
                onRow={(record) => {
                    return {
                        onClick: () => navigate(`../${getRouteServiceDetail(record.id)}`),
                    };
                }}
            />
            <Divider />
            <BluredBackGround>
                <Pagination onChange={handleGetCompaniesList} total={companiesTotalCount} />
            </BluredBackGround>
        </div>
    );
};
