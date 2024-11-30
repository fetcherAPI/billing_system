import { Button, Divider, Form, Input, message, Modal } from 'antd';
import { useState } from 'react';

export const AddBill = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = () => {
        message.success('Submit success!');
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Добавить
            </Button>
            <Divider />
            <Modal title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Form
                    layout={'vertical'}
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    variant="filled"
                >
                    <Form.Item
                        name="name"
                        label="Название услуги"
                        rules={[{ required: true }, { min: 3, message: 'Обязательно для заполнение' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit" type="primary">
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
