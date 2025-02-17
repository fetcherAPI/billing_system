import React, { useMemo } from 'react';
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { AreaChartOutlined, BankOutlined, DollarOutlined, FormOutlined } from '@ant-design/icons';
import { ChildRoutePath } from 'shared/config/routeConfig/routeConfig.tsx';
import { NavLink, useLocation } from 'react-router-dom';
import { UserRoles } from 'shared/types/baseTypes.ts';
import { useSelector } from 'react-redux';
import { $userRole } from 'features/Auth/model/selectors';
import cls from './Navbar.module.scss';

const menuItemsMap: Map<UserRoles | undefined, Array<any>> = new Map([
    [
        'manager',
        [
            {
                key: '/manager/service',
                icon: BankOutlined,
                label: `Мои услуги`,
                path: ChildRoutePath.service,
            },
            {
                key: '/manager/paymentCodes',
                icon: DollarOutlined,
                label: `Платежи`,
                path: ChildRoutePath.paymentCodes,
            },
            {
                key: '/manager/bills',
                icon: AreaChartOutlined,
                label: `Счета`,
                path: ChildRoutePath.bills,
            },
            {
                key: '/merchant/generateCode',
                icon: FormOutlined,
                label: `Сгенерировать код`,
                path: ChildRoutePath.generateCode,
            },
            {
                key: '/merchant/users',
                icon: FormOutlined,
                label: `Сотрудники`,
                path: ChildRoutePath.users,
            },
        ],
    ],
    [
        'merchant',
        [
            {
                key: '/merchant/service',
                icon: BankOutlined,
                label: `Мои услуги`,
                path: ChildRoutePath.service,
            },
            {
                key: '/merchant/paymentCodes',
                icon: DollarOutlined,
                label: `Платежи`,
                path: ChildRoutePath.paymentCodes,
            },
            {
                key: '/merchant/bills',
                icon: AreaChartOutlined,
                label: `Счета`,
                path: ChildRoutePath.bills,
            },

            {
                key: '/merchant/generateCode',
                icon: FormOutlined,
                label: `Сгенерировать код`,
                path: ChildRoutePath.generateCode,
            },
        ],
    ],
    [
        'admin',
        [
            {
                key: '/admin/companies',
                icon: BankOutlined,
                label: `Гос орган`,
                path: ChildRoutePath.companies,
            },
            {
                key: '/admin/service',
                icon: AreaChartOutlined,
                label: `Услуги`,
                path: ChildRoutePath.service,
            },
        ],
    ],
]);

export const Navbar = () => {
    const location = useLocation();
    const userRole = useSelector($userRole);

    const its = useMemo(() => {
        return menuItemsMap.get(userRole)?.map((item) => ({
            key: item.key,
            icon: React.createElement(item.icon, {
                style: { fontSize: 25 },
            }),
            label: <NavLink to={item.path}>{item.label}</NavLink>,
            path: item.path,
        }));
    }, [userRole]);

    if (!userRole) return null;

    const currentPath = location.pathname;

    const selectedKeys = its?.filter((item) => currentPath.startsWith(item.key)).map((item) => item.key);

    return (
        <Sider className={cls.AdminNavBar}>
            <Menu
                style={{ backgroundColor: '#f4f5f7', borderRadius: 5 }}
                mode="inline"
                selectedKeys={selectedKeys}
                defaultSelectedKeys={['4']}
                items={its}
            />
        </Sider>
    );
};
