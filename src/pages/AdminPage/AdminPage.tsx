import { AdminNavBar } from 'widgets/AdminNavBar';
import { Outlet } from 'react-router-dom';
import cls from './AdminPage.module.scss';

const AdminPage = () => {
    return (
        <div className={cls.AdminPage}>
            <AdminNavBar />
            <div className={cls.content}>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminPage;
