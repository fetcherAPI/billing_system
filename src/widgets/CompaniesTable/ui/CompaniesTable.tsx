import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Divider, Table, TableProps, Tag } from 'antd';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { ICompany } from 'entities/Admin/type';
import { BluredBackGround, Pagination } from 'shared/ui';
import {
    $companiesList,
    $companiesTotalCount,
    getCompanies,
    useHandleGetCompanyDetails,
} from 'entities/Admin';
import cls from './CompaniesTable.module.scss';

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
        title: 'Форма/соб',
        dataIndex: 'companyName',
        key: 'companyName',
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
    const { handleGet } = useHandleGetCompanyDetails();

    const handleGetCompaniesList = useCallback(
        (page: number, size: number) => {
            dispatch(getCompanies({ first: page, row: size }));
        },
        [dispatch]
    );

    return (
        <div className={cls.CompaniesTable}>
            <Table
                columns={columns}
                dataSource={companies}
                pagination={false}
                onRow={(record) => {
                    return {
                        onClick: () => handleGet(record.id),
                    };
                }}
            />
            <Divider />
            <BluredBackGround width={15} height={10} className={cls.blur}>
                <Pagination onChange={handleGetCompaniesList} total={companiesTotalCount} />
            </BluredBackGround>
        </div>
    );
};
