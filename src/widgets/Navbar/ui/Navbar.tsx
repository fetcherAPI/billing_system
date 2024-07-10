import React from 'react';
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { AreaChartOutlined, BankOutlined } from '@ant-design/icons';
import { ChildRoutePath } from 'shared/config/routeConfig/routeConfig.tsx';
import { useNavigate } from 'react-router-dom';
import { UserRoles } from '../../../shared/types/baseTypes.ts';
import { useSelector } from 'react-redux';
import { $userRole } from '../../../features/Login/model/selectors';
import cls from './Navbar.module.scss';

const menuItemsMap: Map<UserRoles, Array<any>> = new Map([
    [
        'manager',
        [
            {
                key: 'gov-org',
                icon: BankOutlined,
                label: `Гос орган`,
                path: ChildRoutePath.companies,
            },
            {
                key: 'payments',
                icon: AreaChartOutlined,
                label: `Платежи`,
                path: ChildRoutePath.payments,
            },
        ],
    ],
    [
        'merchant',
        [
            {
                key: 'gov-org',
                icon: BankOutlined,
                label: `merchant`,
                path: ChildRoutePath.companies,
            },
            {
                key: 'payments',
                icon: AreaChartOutlined,
                label: `Платежи`,
                path: ChildRoutePath.payments,
            },
        ],
    ],
    [
        'admin',
        [
            {
                key: 'gov-org',
                icon: BankOutlined,
                label: `Гос орган`,
                path: ChildRoutePath.companies,
            },
            {
                key: 'payments',
                icon: AreaChartOutlined,
                label: `Платежи`,
                path: ChildRoutePath.payments,
            },
        ],
    ],
]);

export const Navbar = () => {
    const navigate = useNavigate();
    const userRole = useSelector($userRole);

    if (!userRole) return null;

    const its = menuItemsMap.get(userRole)?.map((item) => ({
        key: item.key,
        icon: React.createElement(item.icon),
        label: item.label,
        path: item.path,
    }));

    return (
        <Sider className={cls.AdminNavBar}>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['4']}
                items={its}
                //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
                onSelect={(value) => navigate(value.item?.props?.path)}
            />
        </Sider>
    );
};
