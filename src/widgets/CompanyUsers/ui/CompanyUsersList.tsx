import { BluredBackGround } from 'shared/ui';
import { useSelector } from 'react-redux';
import { CompanyUserItem } from './CompanyUserItem.tsx';
import { Col, Row, Table, TableProps, Tag } from 'antd';
import { IUser } from 'shared/types/user.ts';
import { useSearch } from 'shared/lib/index.ts';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'app/providers/StoreProvider/index.ts';
import { ActivateUser, DeactivateUser } from 'features/CompanyUsers/index.ts';
import { Button1, ThemeButton } from 'shared/ui/Button1/index.ts';
import { EditOutlined } from '@ant-design/icons';
import { UpdateUserModal } from 'features/Register/ui/RegisterUserModal/RegisterUserModal.tsx';
import { $companyUsers, getCompanyUsers } from 'entities/user/index.ts';
import cls from './CompanyUser.module.scss';

interface ICompanyUsersList {
    list?: boolean;
    companyId: number;
}

export const CompanyUsersList = ({ list, companyId }: ICompanyUsersList) => {
    const users = useSelector($companyUsers);
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editUser, setEditUser] = useState<IUser | null>(null);
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
            title: 'Статус',
            key: 'status',
            dataIndex: 'tags',
            render: (_, { status }) => (
                <Tag color={status === 'ACTIVE' ? 'green' : 'volcano'} key={status}>
                    {status === 'ACTIVE' ? 'активен' : 'блокирован'}
                </Tag>
            ),
        },
        {
            title: 'Действия',
            key: 'action',
            dataIndex: 'tags',
            width: 200,
            render: (_, record) => (
                <Row gutter={12}>
                    <Col>
                        {record.status === 'ACTIVE' ? (
                            <DeactivateUser id={record.id} icon them={ThemeButton.CLEAR} />
                        ) : (
                            <ActivateUser id={record.id} icon them={ThemeButton.CLEAR} />
                        )}
                    </Col>
                    <Col>
                        <Button1 theme={ThemeButton.CLEAR}>
                            <EditOutlined
                                style={{ fontSize: '20px' }}
                                onClick={() => handleEditUser(record)}
                            />
                        </Button1>
                    </Col>
                </Row>
            ),
        },
    ];

    const handleEditUser = (user: IUser) => {
        setEditUser(user);
        handleOpenModal();
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloaseModal = () => {
        setIsModalOpen(false);
    };

    const { SearchComponent, filteredData } = useSearch<IUser>(users, [
        'companyName',
        'fullName',
        'position',
        'username',
    ]);

    useEffect(() => {
        if (!users.length) {
            dispatch(getCompanyUsers({ id: companyId }));
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
                />
                <UpdateUserModal
                    user={editUser}
                    isOpen={isModalOpen}
                    closeModal={handleCloaseModal}
                    companyId={companyId}
                />
            </>
        );
    } else {
        return (
            <BluredBackGround className={cls.blur}>
                {users.map((user) => <CompanyUserItem key={user.id} {...user} />).reverse()}
            </BluredBackGround>
        );
    }
};
