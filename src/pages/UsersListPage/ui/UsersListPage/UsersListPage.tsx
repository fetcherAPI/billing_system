import { RegisterUserModal } from 'features/Register';
import { useParams } from 'react-router-dom';
import { CompanyUsersList } from 'widgets/CompanyUsers';

const UsersListPage = () => {
    const { id } = useParams();
    if (!id) return 'Company id is not provided';
    return (
        <>
            <RegisterUserModal companyId={+id} />
            <br />
            <CompanyUsersList companyId={+id} list={true} />
        </>
    );
};

export default UsersListPage;
