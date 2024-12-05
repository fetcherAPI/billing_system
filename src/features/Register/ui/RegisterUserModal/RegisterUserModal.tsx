import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button1, ThemeButton } from 'shared/ui/Button1';
import { ConfirmModal } from 'shared/ui';
import { UserRegisterForm } from 'features/Register';
import { FormRef } from 'features/Register/ui/RegistrationSteps/RegistrationSteps.tsx';
import { useParams } from 'react-router-dom';

export const RegisterUserModal = () => {
    const [t] = useTranslation('header');
    const [isOpen, setIsOpen] = useState(false);
    const formRef = useRef<FormRef>(null);
    const { id: companyId } = useParams();
    const handleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleConfirm = () => {
        if (formRef.current) {
            formRef.current.submit();
        }
    };

    return (
        <>
            <Button1 onClick={handleOpen} theme={ThemeButton.SECONDARY}>
                {t('registration')}
            </Button1>
            <ConfirmModal
                handleClose={() => setIsOpen(false)}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                title="Пользовательское соглашение"
                isOpen={isOpen}
            >
                <UserRegisterForm
                    ref={formRef}
                    userRole={'merchant'}
                    companyId={companyId}
                    handleNext={handleCancel}
                />
            </ConfirmModal>
        </>
    );
};
