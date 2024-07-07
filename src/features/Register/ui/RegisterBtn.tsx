import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { routes } from 'shared/config';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { ConfirmModal } from 'shared/ui';
import { Button1, ThemeButton } from 'shared/ui/Button1';

export const RegisterBtn = () => {
    const { t } = useTranslation('header');
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(routes.getRouteRegistration(''));
    };

    const handleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    const handleCancel = () => {
        navigate(RoutePath.main);
        setIsOpen(false);
    };

    return (
        <>
            <Button1 onClick={handleOpen} theme={ThemeButton.CLEAR}>
                {t('registration')}
            </Button1>
            <ConfirmModal
                handleClose={() => setIsOpen(false)}
                onConfirm={handleNavigate}
                onCancel={handleCancel}
                title="Пользовательское соглашение"
                isOpen={isOpen}
            >
                <h1>ИНФО</h1>
            </ConfirmModal>
        </>
    );
};
