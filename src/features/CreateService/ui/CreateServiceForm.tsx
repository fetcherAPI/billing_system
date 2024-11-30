import { Input, Button, Form, message, Row, Col, Checkbox } from 'antd';
import { IService } from 'entities/Admin/type';
import { useState } from 'react';
import { BackButton } from 'shared/ui';

interface IProps {
    isInModal?: boolean;
    defaultValue?: IService;
}

export const CreateServiceForm = ({ isInModal, defaultValue }: IProps) => {
    const [form] = Form.useForm();
    const [disabledAmountField, setDisabledAmountField] = useState(!isInModal);
    const onFinish = () => {
        message.success('Submit success!');
    };

    const handleChangeCheckBox = () => {
        setDisabledAmountField((prev) => !prev);
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };
    return (
        <Form
            layout={'vertical'}
            form={form}
            initialValues={defaultValue}
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
            <Form.Item
                name="bill"
                label="Счет"
                rules={[{ required: true }, { min: 3, message: 'Обязательно для заполнение' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="region"
                label="Регион"
                rules={[{ required: true }, { min: 3, message: 'Обязательно для заполнение' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="econom"
                label="Эконом классификация"
                rules={[{ required: true }, { min: 3, message: 'Обязательно для заполнение' }]}
            >
                <Input />
            </Form.Item>

            <Row gutter={16} align="middle" justify="start">
                <Col span={21}>
                    <Form.Item
                        name="amount"
                        label="Сумма"
                        rules={[{ required: true }, { min: 3, message: 'Обязательно для заполнение' }]}
                        // Убираем нижний отступ, чтобы они были на одном уровне
                    >
                        <Input disabled={disabledAmountField} />
                    </Form.Item>
                </Col>
                <Col span={3}>
                    <Checkbox
                        checked={disabledAmountField}
                        onChange={handleChangeCheckBox}
                        style={{ marginTop: 10 }} // Немного отступаем для выравнивания с полем
                    ></Checkbox>
                </Col>
            </Row>

            <BackButton>
                <Form.Item>
                    <Button htmlType="submit" type="primary">
                        Сохранить
                    </Button>
                </Form.Item>
            </BackButton>
        </Form>
    );
};
