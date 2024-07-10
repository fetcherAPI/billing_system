import { Navbar } from 'widgets/Navbar';
import { Outlet } from 'react-router-dom';
import cls from './AdminPage.module.scss';

const AdminPage = () => {
    return (
        <div className={cls.AdminPage}>
            <Navbar />
            <div className={cls.content}>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminPage;
