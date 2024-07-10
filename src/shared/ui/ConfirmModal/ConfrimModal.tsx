import { ReactNode } from 'react';
import { Modal } from 'antd';

interface IConfirmModalProps {
    isOpen: boolean;
    title: string;
    children: ReactNode;
    onConfirm: () => any;
    handleClose: () => void;
    onCancel?: () => any;
    autoClosable?: boolean;
}

export const ConfirmModal = (props: IConfirmModalProps) => {
    const { isOpen, title, children, onConfirm, handleClose, onCancel, autoClosable } = props;
    const handleCancel = () => {
        onCancel && onCancel();
    };

    const handleOk = () => {
        onConfirm();
        autoClosable && handleClose();
    };

    return (
        <>
            <Modal
                centered
                title={title}
                open={isOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelText={'Отказываюсь'}
                okText={'Принимаю'}
            >
                {children}
            </Modal>
        </>
    );
};
