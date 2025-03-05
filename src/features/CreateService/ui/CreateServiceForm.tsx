import { Input, Button, Form, message, Radio } from 'antd';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { createService } from 'entities/Service';
import { IService } from 'entities/Service/model/types/service';

import { useEffect } from 'react';

import { companyIdLocalStore, useNotif } from 'shared/lib';
import { BackButton } from 'shared/ui';
import { SelectServiceParent } from './SelectServiceParant';
import { updateService } from 'entities/Service/model/service/createService';
import { getServicesByParentId } from 'entities/Service/model/service/getServicesByParentId';

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
    const userCompanyId = Number.parseInt(companyIdLocalStore() || '');
    const dispatch = useAppDispatch();

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    const onFinish = (values: ICreateService) => {
        const { parentId, isService, name } = values;

        if (defaultValue?.id) {
            dispatch(
                updateService({
                    name,
                    id: defaultValue.id,
                    parentId,
                    isService,
                })
            )
                .unwrap()
                .then(() => {
                    notif.open({ status: 'success' });
                    callbackAfterSuccesCreate && callbackAfterSuccesCreate();
                })
                .then(() => {
                    dispatch(
                        getServicesByParentId({
                            first: 0,
                            rows: 100,
                            parentId: parentId?.toString(),
                            updated: true,
                        })
                    );
                })
                .catch((error) => {
                    notif.open({ status: 'error', description: `${error}` });
                });
        } else {
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
                    dispatch(
                        getServicesByParentId({
                            first: 0,
                            rows: 100,
                            parentId: parentId?.toString(),
                            updated: true,
                        })
                    );
                })
                .then(() => {
                    notif.open({ status: 'success' });
                    callbackAfterSuccesCreate && callbackAfterSuccesCreate();
                })
                .catch((error) => {
                    notif.open({ status: 'error', description: `${error}` });
                });
        }
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
                <SelectServiceParent defaultValue={defaultValue?.parentId?.toString()} />
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
                            {defaultValue?.id ? 'Обновить' : 'Сохранить'}
                        </Button>
                    </Form.Item>
                </BackButton>
            </Form>
        </>
    );
};
