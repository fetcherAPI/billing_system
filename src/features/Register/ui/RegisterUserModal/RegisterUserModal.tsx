import { useRef, useState } from 'react';
import { Button1, ThemeButton } from 'shared/ui/Button1';
import { ConfirmModal } from 'shared/ui';
import { UserRegisterForm } from 'features/Register';
import { FormRef } from 'features/Register/ui/RegistrationSteps/RegistrationSteps.tsx';

export interface IRegisterUserModalProps {
    companyId: number;
}

export const RegisterUserModal = ({ companyId }: IRegisterUserModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const formRef = useRef<FormRef>(null);
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
                Добавить пользователя
            </Button1>
            <ConfirmModal
                handleClose={() => setIsOpen(false)}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                title="Регистрация"
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
