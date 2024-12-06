import { Card, Table, TableProps, Typography } from 'antd';

const mockBills = [
    {
        bill: 3434545,
    },
    {
        bill: 1232433,
    },
    {
        bill: 5432325,
    },
    {
        bill: 5432325,
    },
];

interface IProps {
    title: string;
}
export const Bills = ({ title }: IProps) => {
    const columns: TableProps<{ bill: number }>['columns'] = [
        {
            title: '№',
            dataIndex: 'number',
            key: 'number',
            render: (_, _record, index) => <p>{++index}</p>,
        },
        {
            title: title,
            dataIndex: 'bill',
            key: 'bill',
        },
    ];

    return (
        <Card>
            <Typography>{title}</Typography>
            <Table columns={columns} dataSource={mockBills} pagination={false} />
        </Card>
    );
};
