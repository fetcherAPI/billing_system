import { useTranslation } from 'react-i18next';
import { GlobalOutlined } from '@ant-design/icons';
import { Button1 } from '../Button1';

export const LangSwitcher = () => {
    const { t, i18n } = useTranslation();

    const toggle = () => {
        function getLanguage(key: string) {
            switch (key) {
                case 'ru':
                    return 'en';
                case 'en':
                    return 'ru';
                case 'en-US':
                    return 'ru';
                default:
                    break;
            }
        }
        i18n.changeLanguage(getLanguage(i18n.language));
    };
    return (
        <Button1 onClick={toggle} style={{ display: 'flex', gap: 5 }}>
            {t('lang')}

            <GlobalOutlined style={{ color: '#83899f', fontSize: 20 }} />
        </Button1>
    );
};
