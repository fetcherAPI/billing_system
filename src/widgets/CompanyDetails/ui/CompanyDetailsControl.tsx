import { useParams } from 'react-router-dom';
import { BluredBackGround } from 'shared/ui';
import { ActivateCompany } from 'features/ActivateCompany';
import cls from './CompanyDetails.module.scss';

export const CompanyDetailsControl = () => {
    const { id } = useParams();

    if (!id) return null;

    return (
        <BluredBackGround className={cls.blur}>
            <div className={cls.controlBtnWrapper}>
                <ActivateCompany id={id} />
            </div>
        </BluredBackGround>
    );
};
