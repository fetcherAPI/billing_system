import { Input, Button, Form, message, Radio } from 'antd';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { createService } from 'entities/Service';
import { IService } from 'entities/Service/model/types/service';
import { $userCompanyId } from 'features/Auth/model/selectors';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNotif } from 'shared/lib';
import { BackButton } from 'shared/ui';
import { SelectServiceParent } from './SelectServiceParant';

interface IProps {
    isInModal?: boolean;
    defaultValue?: IService;
    callbackAfterSuccesCreate?: () => void;
}

interface ICreateService {
    name: string;
    parentId: number;
    isService: boolean;
}

export const CreateServiceForm = ({ defaultValue, callbackAfterSuccesCreate }: IProps) => {
    const [form] = Form.useForm();
    const notif = useNotif();
    const userCompanyId = useSelector($userCompanyId) || 2801;
    const dispatch = useAppDispatch();

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    const onFinish = (values: ICreateService) => {
        const { parentId, isService, name } = values;
        dispatch(
            createService({
                name,
                companyId: userCompanyId,
                parentId,
                isService,
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
                <SelectServiceParent />
                <Form.Item name="isService" rules={[{ required: true }]}>
                    <Radio.Group>
                        <Radio key={'service'} value={true}>
                            Услуга
                        </Radio>
                        <Radio key={'folder'} value={false}>
                            Папка
                        </Radio>
                    </Radio.Group>
                </Form.Item>
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
