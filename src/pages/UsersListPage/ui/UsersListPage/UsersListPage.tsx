import { RegisterUserModal } from 'features/Register';
import { CompanyUsersList } from 'widgets/CompanyUsers';

const UsersListPage = () => {
    return (
        <>
            <RegisterUserModal />
            <CompanyUsersList list={true} />
        </>
    );
};

export default UsersListPage;
