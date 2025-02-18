import { $userCompanyId } from 'features/Auth/model/selectors';
import { RegisterUserModal } from 'features/Register';
import { useSelector } from 'react-redux';
import { CompanyUsersList } from 'widgets/CompanyUsers';

const UsersListPage = () => {
    const companyId = useSelector($userCompanyId);
    return (
        <>
            <RegisterUserModal companyId={companyId || 0} />
            <br />
            <CompanyUsersList list={true} />
        </>
    );
};

export default UsersListPage;
