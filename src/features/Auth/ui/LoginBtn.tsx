import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { routes } from 'shared/config';

interface IProps {
    path?: string;
}

export const LoginBtn = ({ path }: IProps) => {
    const { t } = useTranslation('header');
    return <Link to={path || routes.getLogin()}>{t('login')}</Link>;
};
