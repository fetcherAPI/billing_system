import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { routes } from 'shared/config';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { ConfirmModal } from 'shared/ui';
import { Button1 } from 'shared/ui/Button1';
import { HideForAuth } from 'shared/ui/HideForAuth/HideForAuth';

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
        <HideForAuth>
            <Button1 onClick={handleOpen}>{t('registration')}</Button1>
            <ConfirmModal
                autoClosable={true}
                handleClose={() => setIsOpen(false)}
                onConfirm={handleNavigate}
                onCancel={handleCancel}
                title="Пользовательское соглашение"
                isOpen={isOpen}
            >
                <h1>ИНФО</h1>
            </ConfirmModal>
        </HideForAuth>
    );
};
