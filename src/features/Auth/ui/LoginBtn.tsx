import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { routes } from 'shared/config';
import { $isAuth } from '../model/selectors';

interface IProps {
    path?: string;
}

export const LoginBtn = ({ path }: IProps) => {
    const { t } = useTranslation('header');
    const isAuth = useSelector($isAuth);
    if (isAuth) return null;
    return <Link to={path || routes.getLogin()}>{t('login')}</Link>;
};
