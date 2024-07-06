import React from 'react';
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { AreaChartOutlined, BankOutlined } from '@ant-design/icons';
import cls from './AdminNavBar.module.scss';
import { ChildRoutePath } from '../../../shared/config/routeConfig/routeConfig.tsx';
import { useNavigate } from 'react-router-dom';

const menuItems = [
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
];

const items = menuItems.map((item) => ({
    key: item.key,
    icon: React.createElement(item.icon),
    label: item.label,
    path: item.path,
}));
export const AdminNavBar = () => {
    const navigate = useNavigate();
    return (
        <Sider className={cls.AdminNavBar}>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['4']}
                items={items}
                //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
                onSelect={(value) => navigate(value.item?.props?.path)}
            />
        </Sider>
    );
};
