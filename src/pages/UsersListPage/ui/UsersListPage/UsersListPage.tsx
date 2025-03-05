import { RegisterUserModal } from 'features/Register';
import { useParams } from 'react-router-dom';
import { companyIdLocalStore } from 'shared/lib';
import { CompanyUsersList } from 'widgets/CompanyUsers';

const UsersListPage: React.FC = () => {
    const { id } = useParams();
    const companyId = companyIdLocalStore();

    if (!id && !companyId) return <p>Company id is not provided UsersListPage</p>;

    return (
        <>
            <RegisterUserModal companyId={Number(id) || Number(companyId)} />
            <br />
            <CompanyUsersList companyId={Number(id) || Number(companyId)} list={true} />
        </>
    );
};

export default UsersListPage;
