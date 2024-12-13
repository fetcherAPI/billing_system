import { Divider, Table, TableProps, Tag } from 'antd';
import { useSelector } from 'react-redux';
import { $paymentCodesList, $paymentCodesTotalCount } from '../model/selectors';
import { useCallback } from 'react';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { getPaymentCodes } from '../model/service/getPaymentCodes';
import { Pagination } from 'shared/ui';
import { IPayment } from '../model/types';
import dayjs from 'dayjs';
import { CheckPayment } from './CheckPayment';

const columns: TableProps<IPayment>['columns'] = [
    {
        title: '№',
        dataIndex: 'number',
        key: 'number',
        render: (_, _record, index) => <p>{++index}</p>,
    },
    {
        title: 'Инн',
        dataIndex: 'payerInn',
        key: 'payerInn',
    },
    {
        title: 'Форма/соб',
        dataIndex: 'payerName',
        key: 'payerName',
    },
    {
        title: 'Дата генерации',
        dataIndex: 'dateCreated',
        render: (_, { dateCreated }) => dayjs(dateCreated).format('DD.MM.YYYY HH:mm'),
        key: 'dateCreated',
    },
    {
        title: 'Сумма',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Код платежа',
        dataIndex: 'paymentCode',
        key: 'paymentCode',
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
    {
        title: 'Проверить',
        key: 'chekc',
        render: (_, { orderId, status }) => <CheckPayment orderId={orderId} disabled={status !== null} />,
    },
];

export const PaymentCodesTable = () => {
    const codes = useSelector($paymentCodesList);
    const totalCount = useSelector($paymentCodesTotalCount);

    const dispatch = useAppDispatch();

    const handleGetPaymentCodes = useCallback(
        (page: number, size: number) => {
            dispatch(getPaymentCodes({ first: page, rows: size }));
        },
        [dispatch]
    );

    return (
        <>
            <Table columns={columns} dataSource={codes} pagination={false} rowKey={(record) => record.id} />
            <Divider />
            <Pagination onChange={handleGetPaymentCodes} total={totalCount} />
        </>
    );
};
