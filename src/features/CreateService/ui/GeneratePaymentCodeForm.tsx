import { Button, Form, Input, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { generatePaymentCode } from 'entities/Service/model/service/generatePaymentCode';
import { useNotif } from 'shared/lib';
import { SelectServiceParent } from './SelectServiceParant';

interface IGeneratePaymentCode {
    payerInn: string;
    payerName: string;
    destination: string;
    amount: number;
    parentId: number;
}

export const GeneratePaymentCodeForm = () => {
    const [form] = Form.useForm();
    const notif = useNotif();
    const dispatch = useAppDispatch();

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    const onFinish = ({ payerInn, payerName, destination, amount, parentId }: IGeneratePaymentCode) => {
        dispatch(
            generatePaymentCode({
                payerInn,
                payerName,
                destination,
                amount: +amount,
                chapterId: parentId,
            })
        )
            .unwrap()
            .then((res) => {
                notif.open({
                    status: 'success',
                    duration: 200,
                    description: `Ваш код оплаты ${res.paymentCode} сумма для оплаты ${res.amount} `,
                });
            })
            .catch((error) => {
                notif.open({ status: 'error', description: error });
            });
    };

    return (
        <>
            {notif.context}
            <Form
                layout={'vertical'}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                variant="filled"
            >
                <SelectServiceParent required={true} />
                <Form.Item
                    name="payerInn"
                    label="Инн"
                    rules={[{ required: true }, { min: 3, message: 'Обязательно для заполнение' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="payerName"
                    label="Название"
                    rules={[{ required: true }, { min: 3, message: 'Обязательно для заполнение' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="destination"
                    label="Описание"
                    rules={[{ required: true }, { min: 3, message: 'Обязательно для заполнение' }]}
                >
                    <TextArea rows={4} />
                </Form.Item>

                {/* <Form.Item
                    name="amount"
                    label="Сумма"
                    rules={[{ required: true }, { min: 3, message: 'Обязательно для заполнение' }]}
                >
                    <Input disabled={false} />
                </Form.Item> */}

                <Form.Item>
                    <Button htmlType="submit" type="primary">
                        Сгенерировать код оплаты
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
