import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { routes } from 'shared/config';
import { AuthOnly } from 'shared/ui/AuthOnly/AuthOnly';

interface IProps {
    path?: string;
}

export const LoginBtn = ({ path }: IProps) => {
    const { t } = useTranslation('header');

    return (
        <AuthOnly hide={true}>
            <Link to={path || routes.getLogin()}>{t('login')}</Link>
        </AuthOnly>
    );
};
