import { Input, Button, Form, message, Row, Col, Checkbox } from 'antd';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { createSplitter } from 'entities/Service/model/service/createSplitter';
import { IService } from 'entities/Service/model/types/service';
import { useEffect, useState } from 'react';
import { useNotif } from 'shared/lib';
import { BackButton } from 'shared/ui';

interface IProps {
    isInModal?: boolean;
    defaultValue?: IService;
    callbackAfterSuccesCreate?: () => void;
}

interface ICreateSplitter {
    account: string;
    paymentCode: string;
    amount: number;
}

export const CreateSplitterForm = ({ defaultValue, callbackAfterSuccesCreate }: IProps) => {
    const [disabledAmountField, setDisabledAmountField] = useState(false);
    const [form] = Form.useForm();
    const notif = useNotif();
    const dispatch = useAppDispatch();

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    const onFinish = ({ account, paymentCode, amount }: ICreateSplitter) => {
        if (!defaultValue?.id) {
            notif.open({ status: 'error', description: 'айди услиги не найден' });
        } else {
            dispatch(
                createSplitter({
                    account,
                    paymentCode,
                    amount,
                    chapterId: defaultValue?.id,
                })
            )
                .unwrap()
                .then(() => {
                    notif.open({ status: 'success' });
                    callbackAfterSuccesCreate && callbackAfterSuccesCreate();
                })
                .catch((error) => {
                    notif.open({ status: 'error', description: error });
                });
        }
    };

    const handleChangeCheckBox = () => {
        setDisabledAmountField((prev) => !prev);
    };

    useEffect(() => {
        if (defaultValue) {
            form.setFieldsValue(defaultValue);
        } else {
            form.resetFields();
        }
    }, [defaultValue, form]);

    return (
        <>
            {notif.context}
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
                    name="account"
                    label="Счет"
                    rules={[{ required: true }, { min: 3, message: 'Обязательно для заполнение' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="paymentCode"
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
                        >
                            <Input disabled={false} />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Checkbox
                            checked={disabledAmountField}
                            onChange={handleChangeCheckBox}
                            style={{ marginTop: 10 }}
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
        </>
    );
};
