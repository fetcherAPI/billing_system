import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Table, TableProps, Tag } from 'antd';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { ICompany } from 'entities/Admin/type';
import { getCompanies } from 'entities/Admin/model/service/getCompanies.ts';
import { $companiesList, $companiesTotalCount } from 'entities/Admin/model/selector';
import { Pagination } from 'shared/ui';

const columns: TableProps<ICompany>['columns'] = [
    {
        title: '№',
        dataIndex: 'number',
        key: 'number',
        render: (_, _record, index) => <a>{++index}</a>,
    },
    {
        title: 'Инн',
        dataIndex: 'inn',
        key: 'inn',
    },
    {
        title: 'managerФорма/собPosition',
        dataIndex: 'managerPosition',
        key: 'managerPosition',
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

export const CompaniesTable = () => {
    const dispatch = useAppDispatch();
    const companies = useSelector($companiesList);
    const companiesTotalCount = useSelector($companiesTotalCount);

    const handleGetCompaniesList = useCallback(
        (page: number, size: number) => {
            dispatch(getCompanies({ first: page, row: size }));
        },
        [dispatch]
    );

    return (
        <div>
            <Table columns={columns} dataSource={companies} pagination={false} />
            <Pagination onChange={handleGetCompaniesList} total={companiesTotalCount} />
        </div>
    );
};
