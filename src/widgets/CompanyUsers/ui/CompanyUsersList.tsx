import { BluredBackGround } from 'shared/ui';
import { useSelector } from 'react-redux';
import { $companyUsers } from 'features/CompanyUsers/model/selectors';
import { CompanyUserItem } from './CompanyUserItem.tsx';
import { Table, TableProps, Tag } from 'antd';
import { IUser } from 'shared/types/user.ts';
import { useSearch } from 'shared/lib/index.ts';
import { useEffect } from 'react';
import { useAppDispatch } from 'app/providers/StoreProvider/index.ts';
import { getCompanyUsers } from 'features/CompanyUsers/model/service/getCompanyUsers.ts';
import { $userCompanyId } from 'features/Auth/model/selectors/index.ts';
import { ActivateUser, DeactivateUser } from 'features/CompanyUsers/index.ts';
import { ThemeButton } from 'shared/ui/Button1/index.ts';
import cls from './CompanyUser.module.scss';

interface ICompanyUsersList {
    list?: boolean;
}

const columns: TableProps<IUser>['columns'] = [
    {
        title: '№',
        dataIndex: 'number',
        key: 'number',
        width: 35,
        render: (_, _record, index) => <p>{++index}</p>,
    },
    {
        title: 'Ф.И.О',
        dataIndex: 'fullName',
        key: 'fullName',
    },
    {
        title: 'Логин',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Эл.адрес',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Статаус',
        key: 'status',
        dataIndex: 'tags',
        render: (_, { status }) => (
            <Tag color={status === 'ACTIVE' ? 'green' : 'volcano'} key={status}>
                {status === 'ACTIVE' ? 'активен' : 'блокирован'}
            </Tag>
        ),
    },
    {
        title: 'Статаус',
        key: 'status',
        dataIndex: 'tags',
        width: 90,
        render: (_, { id, status }) => (
            <>
                {status === 'ACTIVE' ? (
                    <DeactivateUser id={id} icon them={ThemeButton.CLEAR} />
                ) : (
                    <ActivateUser id={id} icon them={ThemeButton.CLEAR} />
                )}
            </>
        ),
    },
];

export const CompanyUsersList = ({ list }: ICompanyUsersList) => {
    const users = useSelector($companyUsers);
    const dispatch = useAppDispatch();
    const companyId = useSelector($userCompanyId);

    const { SearchComponent, filteredData } = useSearch<IUser>(users, [
        'companyName',
        'fullName',
        'position',
        'username',
    ]);

    useEffect(() => {
        if (!users.length) {
            dispatch(getCompanyUsers({ id: companyId || 0 }));
        }
    }, []);

    if (!users.length) return null;

    if (list) {
        return (
            <>
                {SearchComponent}
                <Table
                    columns={columns}
                    rowKey={(record) => record.id}
                    dataSource={filteredData?.length ? filteredData : users}
                    pagination={false}
                />
            </>
        );
    } else {
        return (
            <BluredBackGround className={cls.blur}>
                {users.map((user) => (
                    <CompanyUserItem key={user.id} {...user} />
                ))}
            </BluredBackGround>
        );
    }
};
