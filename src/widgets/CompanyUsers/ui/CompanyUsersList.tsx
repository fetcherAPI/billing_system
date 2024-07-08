import { BluredBackGround } from 'shared/ui';
import { useSelector } from 'react-redux';
import { $companyUsers } from 'features/CompanyUsers/model/selectors';
import { CompanyUserItem } from './CompanyUserItem.tsx';
import cls from './CompanyUser.module.scss';

export const CompanyUsersList = () => {
    const users = useSelector($companyUsers);
    if (!users.length) return null;
    return (
        <BluredBackGround className={cls.blur}>
            {users.map((user) => (
                <CompanyUserItem key={user.id} {...user} />
            ))}
        </BluredBackGround>
    );
};
