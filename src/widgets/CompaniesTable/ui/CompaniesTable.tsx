import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Divider, Table, TableProps, Tag, Input } from 'antd';
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
import { getRouteCompanyDetail } from 'shared/config/routeConfig/routeConfig.tsx';
// import Search from 'antd/es/transfer/search';

const columns: TableProps<ICompany>['columns'] = [
    {
        title: '№',
        dataIndex: 'number',
        key: 'number',
        width: 35,
        render: (_, _record, index) => <p>{++index}</p>,
    },
    {
        title: 'Инн',
        dataIndex: 'inn',
        width: 140,
        key: 'inn',
    },
    {
        title: 'Госорган',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Статаус',
        key: 'status',
        dataIndex: 'tags',
        width: 90,
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

    const [searchValue, setSearchValue] = useState('');

    const [searchedCompanies, setSearchedCompanies] = useState<Array<ICompany>>([]);

    const handleSearch = (value: string) => {
        console.log('value', value);
        setSearchValue(value);
        setSearchedCompanies(
            companies.filter((company) => company.title.toLowerCase().includes(value.toLowerCase()))
        );
    };

    const { handleGet } = useHandleGetCompanyDetails();

    const handleGetCompaniesList = useCallback(
        (page: number, size: number) => {
            dispatch(getCompanies({ first: page, rows: size }));
        },
        [dispatch]
    );

    return (
        <div className={cls.CompaniesTable}>
            <Input.Search onSearch={handleSearch} placeholder="Поиск по названию" />

            <Table
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={searchValue ? searchedCompanies : companies}
                pagination={false}
                onRow={(record) => {
                    return {
                        onClick: () => handleGet(record.id, `../${getRouteCompanyDetail(record.id)}`),
                    };
                }}
            />
            <Divider />
            <BluredBackGround className={cls.blur}>
                <Pagination onChange={handleGetCompaniesList} total={companiesTotalCount} />
            </BluredBackGround>
        </div>
    );
};
