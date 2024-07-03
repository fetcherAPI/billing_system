import { AdminNavBar } from 'widgets/AdminNavBar'
import cls from './AdminPage.module.scss'
import { Outlet } from 'react-router-dom'

const AdminPage = () => {
    return (
        <div className={cls.AdminPage}>
            <AdminNavBar />
            <Outlet />
        </div>
    )
}

export default AdminPage
