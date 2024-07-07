import { ChangeEvent, forwardRef, useEffect, useImperativeHandle } from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { classNames } from 'shared/lib/classNames/classNames';
import { fieldsMaker } from 'shared/lib/fieldsMaker/fieldsMaker.ts';
import { keyOfUserRegister } from 'features/Register/types/SliceSchema';
import { $registerUserData } from '../../model/selectors';
import { registerUser } from '../../model/service/registerCompany.ts';
import { Inn } from '../FormFields/Inn.tsx';
import cls from './style.module.scss';
import { setRegisterProperty } from '../../model/slice/RegisterSlice.ts';

interface IProps {
    className?: string;
    handleNext: () => void;
}

export interface CompanyManagerFormRef {
    submit: () => void;
}

export const CompanyManagerForm = forwardRef<CompanyManagerFormRef, IProps>(
    ({ className, handleNext }, ref) => {
        const { t } = useTranslation('registration');
        const [form] = Form.useForm();
        const dispatch = useAppDispatch();

        const formFields = useSelector($registerUserData);
        // const createdCompanyId = useSelector($createdCompanyId);

        useImperativeHandle(ref, () => ({
            submit() {
                form.submit();
            },
        }));

        const handleFinish = () => {
            dispatch(registerUser({ param: formFields })).then(
                (res) => res.meta.requestStatus === 'fulfilled' && handleNext(),
            );
        };

        useEffect(() => {
            form.setFieldValue('title', formFields.username);
        }, [formFields]);

        const handleChangeInput = (e: ChangeEvent<HTMLInputElement>, key: keyOfUserRegister) => {
            dispatch(setRegisterProperty({ key, data: e.target.value, type: 'User' }));
        };

        return (
            <Form
                initialValues={formFields}
                fields={fieldsMaker(formFields)}
                layout={'vertical'}
                form={form}
                onFinish={handleFinish}
                className={classNames(cls.from, {}, [className])}
            >
                <Row gutter={200} className={cls.row}>
                    <Col style={{ width: '50%' }}>
                        <Inn label={'ПИН руководителя'} inputName={'userInn'} fieldForSetResponse={'fullName'}
                             type={'User'} />


                        <Form.Item
                            name={'position'}
                            label={t('position')}
                            rules={[{ required: true, message: t('loginPassRuleText') }]}
                        >
                            <Input
                                placeholder="input placeholder"
                                onChange={(e) => handleChangeInput(e, 'position')}
                            />
                        </Form.Item>
                        <Form.Item
                            name={'cellPhone'}
                            label={t('Сотовый телефон')}
                            rules={[{ required: true, message: t('loginPassRuleText') }]}
                        >
                            <Input
                                placeholder="input placeholder"
                                onChange={(e) => handleChangeInput(e, 'cellPhone')}
                            />
                        </Form.Item>
                        <Form.Item
                            name={'username'}
                            label={t('Имя пользователя (логин)')}
                            rules={[{ required: true, message: t('loginPassRuleText') }]}
                        >
                            <Input
                                placeholder="input placeholder"
                                onChange={(e) => handleChangeInput(e, 'username')}
                            />
                        </Form.Item>
                    </Col>

                    <Col style={{ width: '50%' }}>
                        <Form.Item
                            name={'fullName'}
                            label={t('ФИО руководителя')}
                            initialValue={formFields.fullName}
                            rules={[
                                {
                                    required: true,
                                    message: t('loginUsernameRuleText'),
                                },
                            ]}
                        >
                            <Input placeholder="input placeholder" disabled={true} />
                        </Form.Item>
                        <Form.Item
                            name={''}
                            label={t('Рабочий телефон')}
                            rules={[
                                {
                                    required: true,
                                    message: t('loginUsernameRuleText'),
                                },
                            ]}
                        >
                            <Input placeholder="input placeholder"
                                   onChange={(e) => handleChangeInput(e, 'workPhone')} />
                        </Form.Item>
                        <Form.Item
                            name={'email'}
                            label={t('Электронный адрес')}
                            rules={[
                                {
                                    required: true,
                                    message: t('loginUsernameRuleText'),
                                },
                            ]}
                        >
                            <Input placeholder="input placeholder"
                                   onChange={(e) => handleChangeInput(e, 'email')} />
                        </Form.Item>
                        <Form.Item
                            name={'password'}
                            label={t('Пароль')}
                            rules={[{ required: true, message: t('loginPassRuleText') }]}
                        >
                            <Input
                                placeholder="input placeholder"
                                onChange={(e) => handleChangeInput(e, 'password')}
                            />
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
    },
);
