import { Button, Divider, Modal } from 'antd';
import { IService } from 'entities/Service/model/types/service';
import { CreateServiceForm } from 'features/CreateService/ui/CreateServiceForm';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ServicesTable } from 'widgets/ServicesTable/ServicesTable';

const Services = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchParams] = useSearchParams();

    const parentId = searchParams.get('parentId');

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            {!parentId && (
                <>
                    <Button type="primary" onClick={showModal}>
                        Добавить услугу
                    </Button>
                    <Divider />
                    <Modal title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                        <CreateServiceForm isInModal callbackAfterSuccesCreate={handleOk} />
                    </Modal>
                </>
            )}

            <ServicesTable />
        </>
    );
};

export default Services;

export const useServiceForm = (defaultValue: IService) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const FormWithModal = (
        <Modal title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <CreateServiceForm isInModal callbackAfterSuccesCreate={handleOk} defaultValue={defaultValue} />
        </Modal>
    );

    return {
        showModal,
        FormWithModal,
    };
};
