import { Navbar } from 'widgets/Navbar';
import { Outlet } from 'react-router-dom';
import cls from './ManagerPage.module.scss';

const ManagerPage = () => {
    return (
        <div className={cls.AdminPage}>
            <Navbar />
            <div className={cls.content}>
                <Outlet />
            </div>
        </div>
    );
};

export default ManagerPage;
