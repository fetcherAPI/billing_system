import { Button, Divider, Modal } from 'antd';
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
