import { useParams } from 'react-router-dom';
import { BluredBackGround } from 'shared/ui';
import { ActivateCompany } from 'features/ActivateCompany';
import { GetCompanyUsers } from 'features/GetCompanyUsers';
import cls from './CompanyDetails.module.scss';

export const CompanyDetailsControl = () => {
    const { id } = useParams();

    if (!id) return null;

    return (
        <BluredBackGround width={10.3} height={90} className={cls.blur}>
            <div className={cls.controlBtnWrapper}>
                <ActivateCompany />
                <br />
                <GetCompanyUsers id={+id} />
                <br />
                <ActivateCompany />
                <br />
                <ActivateCompany />
            </div>
        </BluredBackGround>
    );
};
