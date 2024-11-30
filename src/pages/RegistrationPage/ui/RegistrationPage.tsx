import { Link, useParams } from 'react-router-dom';
import { routes } from 'shared/config';
import cls from './RegistrationPage.module.scss';
import { RegistrationSteps } from 'features/Register';

const RegistrationPage = () => {
    const { type } = useParams();
    return (
        <div className={cls.wrapper}>
            {type === '1' ? (
                <RegistrationSteps className={cls.wrapper} />
            ) : type === '2' ? (
                <h1>Client register</h1>
            ) : (
                <div className={cls.inner}>
                    <Link to={routes.getRegisterType('1')} className={cls.type}>
                        Госорган
                    </Link>
                    <Link to={routes.getRegisterType('2')} className={cls.type}>
                        Клиент
                    </Link>
                </div>
            )}
        </div>
    );
};

export default RegistrationPage;
