import { Divider, Table, TableProps, Tag } from 'antd';
import { useSelector } from 'react-redux';
import { $paymentCodesList, $paymentCodesTotalCount } from '../model/selectors';
import { useCallback } from 'react';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { getPaymentCodes } from '../model/service/getPaymentCodes';
import { BackButton, Pagination } from 'shared/ui';
import { IPayment } from '../model/types';
import dayjs from 'dayjs';
import { CheckPayment } from './CheckPayment';
import { useSearch } from 'shared/lib';

const columns: TableProps<IPayment>['columns'] = [
    {
        title: '№',
        dataIndex: 'number',
        key: 'number',
        sorter: (a, b) => a.number - b.number,
        render: (_, _record, index) => <p>{++index}</p>,
    },
    {
        title: 'Инн',
        dataIndex: 'payerInn',
        key: 'payerInn',
        sorter: (a, b) => a.payerInn.localeCompare(b.payerInn),
    },
    {
        title: 'Форма/соб',
        dataIndex: 'payerName',
        key: 'payerName',
        sorter: (a, b) => a.payerName.localeCompare(b.payerName),
    },
    {
        title: 'Дата генерации',
        dataIndex: 'dateCreated',
        key: 'dateCreated',
        sorter: (a, b) => dayjs(a.dateCreated).valueOf() - dayjs(b.dateCreated).valueOf(),
        render: (_, { dateCreated }) => dayjs(dateCreated).format('DD.MM.YYYY HH:mm'),
    },
    {
        title: 'Сумма',
        dataIndex: 'amount',
        key: 'amount',
        sorter: (a, b) => a.amount - b.amount,
    },
    {
        title: 'Код платежа',
        dataIndex: 'paymentCode',
        key: 'paymentCode',
    },
    {
        title: 'Статус',
        key: 'status',
        dataIndex: 'status',

        render: (_, { status }) => (
            <Tag color={'volcano'} key={status}>
                {status}
            </Tag>
        ),
    },
    {
        title: 'Проверить',
        key: 'check',
        render: (_, { orderId, status }) => <CheckPayment orderId={orderId} disabled={status !== null} />,
    },
];

export const PaymentCodesTable = () => {
    const codes = useSelector($paymentCodesList);
    const totalCount = useSelector($paymentCodesTotalCount);
    const dispatch = useAppDispatch();

    const { SearchComponent, filteredData } = useSearch(codes, [
        'payerInn',
        'splitter',
        'paymentCode',
        'payerName',
    ]);

    const handleGetPaymentCodes = useCallback(
        (page: number, size: number) => {
            dispatch(getPaymentCodes({ first: page, rows: size }));
        },
        [dispatch]
    );

    return (
        <>
            {SearchComponent}
            <Table
                columns={columns}
                dataSource={filteredData.length ? filteredData : codes}
                pagination={false}
                rowKey={(record) => record.id}
            />
            <Divider />
            <BackButton>
                <Pagination onChange={handleGetPaymentCodes} total={totalCount} />
            </BackButton>
        </>
    );
};
