import { Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import cls from './Header.module.scss';
import { useSelector } from 'react-redux';
import { $userRole } from 'features/Auth/model/selectors';

const hideForRoles = ['admin'];

export const HeaderLinks = () => {
    const { t } = useTranslation('header');

    const userRole = useSelector($userRole);

    if (hideForRoles.includes(userRole || '')) return null;

    return (
        <Row justify={'center'} className={cls.links} style={{ columnGap: 30 }}>
            <Link to="#">{t('service')}</Link>
            <Link to="#">{t('client')}</Link>
            <Link to="#">{t('about')}</Link>
        </Row>
    );
};
