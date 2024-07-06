import { BluredBackGround } from 'shared/ui';
import { ActivateCompany } from 'features/ActivateCompany';
import cls from './CompanyDetails.module.scss';

export const CompanyDetailsControl = () => {
    return (
        <BluredBackGround width={10.3} height={90} className={cls.blur}>
            <div className={cls.controlBtnWrapper}>
                <ActivateCompany />
                <br />
                <ActivateCompany />
                <br />
                <ActivateCompany />
                <br />
                <ActivateCompany />
            </div>
        </BluredBackGround>
    );
};
