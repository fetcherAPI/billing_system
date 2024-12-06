import { Table, TableProps } from 'antd';
import { $splitters } from 'entities/Service/model/selectors';
import { ISplitter } from 'entities/Service/model/types/splitter';
import { useSelector } from 'react-redux';

// id: number;
// account: string;
// paymentCode: string;
// amount: number;
// serviceId: number;
// serviceName: string;
// chapterId: number;

const columns: TableProps<ISplitter>['columns'] = [
    {
        title: '№',
        dataIndex: 'number',
        key: 'number',
        render: (_, _record, index) => <p>{++index}</p>,
    },
    {
        title: 'Счет',
        dataIndex: 'account',
        key: 'account',
    },
    {
        title: 'Эконом классификация',
        dataIndex: 'paymentCode',
        key: 'paymentCode',
    },
    {
        title: 'Сумма',
        dataIndex: 'amount',
        key: 'amount',
    },
];

export const SplittersTable = () => {
    const splitters = useSelector($splitters);

    return (
        <Table columns={columns} rowKey={(record) => record.id} dataSource={splitters} pagination={false} />
    );
};

export default SplittersTable;
