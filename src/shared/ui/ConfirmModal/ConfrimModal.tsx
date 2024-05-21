import React, { ReactNode } from "react";
import { Modal } from "antd";

interface IConfirmModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onConfirm: () => any;
  handleClose: () => void;
  onCancel?: () => any;
}

export const ConfirmModal: React.FC<IConfirmModalProps> = ({
  isOpen,
  title,
  children,
  onConfirm,
  handleClose,
  onCancel,
}) => {
  const handleCancel = () => {
    onCancel && onCancel();
  };

  const handleOk = () => {
    onConfirm();
    handleClose();
  };

  return (
    <>
      <Modal
        centered
        title={title}
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText={"Отказываюсь"}
        okText={"Принимаю"}
      >
        {children}
      </Modal>
    </>
  );
};
