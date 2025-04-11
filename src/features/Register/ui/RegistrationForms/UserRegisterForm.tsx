import { ChangeEvent, forwardRef, useEffect, useImperativeHandle } from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { classNames } from 'shared/lib/classNames/classNames';
import { fieldsMaker } from 'shared/lib/fieldsMaker/fieldsMaker.ts';
import { UserRoles } from 'shared/types/baseTypes.ts';
import { keyOfUserRegister } from 'features/Register/types/SliceSchema';
import { $registerUserData } from '../../model/selectors';
import { Inn } from '../FormFields/Inn.tsx';
import { setRegisterProperty } from '../../model/slice/RegisterSlice.ts';
import cls from './style.module.scss';
import { FormRef } from '../RegistrationSteps/RegistrationSteps.tsx';
import { IUser } from 'shared/types/user.ts';
import { getCompanyUsers, registerUser, updateUser } from 'entities/user/index.ts';

interface IProps {
    className?: string;
    handleNext?: () => void;
    userRole: UserRoles;
    companyId?: number;
    defaultValue?: IUser;
}

export const UserRegisterForm = forwardRef<FormRef, IProps>(
    ({ className, handleNext, companyId, userRole, defaultValue }, ref) => {
        const { t } = useTranslation('registration');
        const [form] = Form.useForm();
        const dispatch = useAppDispatch();
        const formFields = useSelector($registerUserData);

        // const isUserRoleManager = userRole === 'manager';

        useImperativeHandle(ref, () => ({
            submit() {
                form.submit();
            },
        }));

        const handleRegister = () => {
            dispatch(registerUser({ param: formFields, userRole }))
                .unwrap()
                .then(() => {
                    if (companyId) dispatch(getCompanyUsers({ id: companyId }));
                    handleNext && handleNext();
                });
        };

        const handleUpdate = () => {
            dispatch(updateUser({ param: formFields, userId: defaultValue?.id || 0 }))
                .unwrap()
                .then(() => {
                    handleNext && handleNext();
                });
        };

        const handleFinish = () => {
            if (!defaultValue?.id) {
                handleRegister();
            } else {
                handleUpdate();
            }
        };
        const handleChangeInput = (e: ChangeEvent<HTMLInputElement>, key: keyOfUserRegister) => {
            dispatch(setRegisterProperty({ key, data: e.target.value, type: 'User' }));
        };

        useEffect(() => {
            form.setFieldValue('title', formFields.username);
        }, [formFields]);

        useEffect(() => {
            if (companyId || Number.isInteger(companyId)) {
                dispatch(setRegisterProperty({ key: 'companyId', data: companyId, type: 'User' }));
            }
        }, []);

        return (
            <Form
                initialValues={defaultValue || formFields}
                fields={!defaultValue?.id ? fieldsMaker(formFields) : []}
                layout={'vertical'}
                form={form}
                onFinish={handleFinish}
                className={classNames(cls.from, {}, [className])}
            >
                <Row className={cls.row} gutter={20}>
                    <Col span={12}>
                        <Inn
                            label={'ПИН пользователя'}
                            inputName={'userInn'}
                            fieldForSetResponse={'fullName'}
                            type={'User'}
                        />

                        <Form.Item
                            name={'position'}
                            label={t('position')}
                            rules={[{ required: true, message: t('required') }]}
                        >
                            <Input onChange={(e) => handleChangeInput(e, 'position')} />
                        </Form.Item>
                        <Form.Item
                            name={'cellPhone'}
                            label={t('Сотовый телефон')}
                            rules={[{ required: true, message: t('required') }]}
                        >
                            <Input onChange={(e) => handleChangeInput(e, 'cellPhone')} />
                        </Form.Item>
                        <Form.Item
                            name={'username'}
                            label={t('Имя пользователя (логин)')}
                            rules={[{ required: true, message: t('required') }]}
                        >
                            <Input onChange={(e) => handleChangeInput(e, 'username')} />
                        </Form.Item>
                    </Col>

                    <Col style={{ width: '50%' }}>
                        <Form.Item
                            name={'fullName'}
                            label={t('ФИО пользователя')}
                            initialValue={formFields.fullName}
                            rules={[
                                {
                                    required: true,
                                    message: t('required'),
                                },
                            ]}
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            name={'workPhone'}
                            label={t('Рабочий телефон')}
                            rules={[
                                { required: true, message: t('required') },
                                { min: 6, message: t(`min_rule_text`, { length: 6 }) },
                            ]}
                        >
                            <Input onChange={(e) => handleChangeInput(e, 'workPhone')} />
                        </Form.Item>
                        <Form.Item
                            name={'email'}
                            label={t('Электронный адрес')}
                            rules={[
                                {
                                    required: true,
                                    message: t('required'),
                                },
                                {
                                    type: 'email',
                                    message: t('email_rule_text'),
                                },
                            ]}
                        >
                            <Input onChange={(e) => handleChangeInput(e, 'email')} />
                        </Form.Item>
                        <Form.Item
                            name={'password'}
                            label={t('Пароль')}
                            rules={[{ required: true, message: t('required') }]}
                        >
                            <Input onChange={(e) => handleChangeInput(e, 'password')} />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item style={{ display: 'none' }}>
                    <Button type="primary" htmlType="submit">
                        {t('login')}
                    </Button>
                </Form.Item>
            </Form>
        );
    }
);
