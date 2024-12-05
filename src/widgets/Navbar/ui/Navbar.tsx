import React, { useMemo } from 'react';
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { AreaChartOutlined, BankOutlined, DollarOutlined } from '@ant-design/icons';
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
        ],
    ],
    [
        'merchant',
        [
            {
                key: '/manager',
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

    return (
        <Sider className={cls.AdminNavBar}>
            <Menu
                style={{ backgroundColor: '#f4f5f7', borderRadius: 5 }}
                mode="inline"
                selectedKeys={[location.pathname]}
                defaultSelectedKeys={['4']}
                items={its}
            />
        </Sider>
    );
};
