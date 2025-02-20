import { DeleteOutlined } from '@ant-design/icons';
import { Table, TableProps } from 'antd';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { $splitters } from 'entities/Service/model/selectors';
import { deleteSplitter } from 'entities/Service/model/service/deleteSplitter';
import { getSplittersByChapterId } from 'entities/Service/model/service/getSplittersByChapterId';
import { ISplitter } from 'entities/Service/model/types/splitter';
import { useSelector } from 'react-redux';

// id: number;
// account: string;
// paymentCode: string;
// amount: number;
// serviceId: number;
// serviceName: string;
// chapterId: number;

export const SplittersTable = () => {
    const splitters = useSelector($splitters);

    const dispatch = useAppDispatch();

    const handleDelete = (id: number, chapterId: number) => {
        dispatch(deleteSplitter({ splitterId: id }))
            .unwrap()
            .then(() => dispatch(getSplittersByChapterId({ id: chapterId })));
    };

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
        {
            title: 'Действия',
            dataIndex: 'amount',
            key: 'amount',
            render: (_, record) => {
                return <DeleteOutlined onClick={() => handleDelete(record.id, record.chapterId)} />;
            },
        },
    ];

    return (
        <Table columns={columns} rowKey={(record) => record.id} dataSource={splitters} pagination={false} />
    );
};

export default SplittersTable;
