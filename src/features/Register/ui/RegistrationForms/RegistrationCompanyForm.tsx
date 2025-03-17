import { ChangeEvent, forwardRef, useEffect, useImperativeHandle } from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { classNames } from 'shared/lib/classNames/classNames';
import { fieldsMaker } from 'shared/lib/fieldsMaker/fieldsMaker.ts';
import { setRegisterProperty } from 'features/Register/model/slice/RegisterSlice';
import { keyOfRegisterSliceSchema } from 'features/Register/types/SliceSchema';
import { $createdCompanyId, $registerData } from '../../model/selectors';
import { SelectLocality } from '../FormFields/SelectLocality.tsx';
import { registerCompany, updateCompany } from '../../model/service/registerCompany.ts';
import { Inn } from '../FormFields/Inn.tsx';
import cls from './style.module.scss';
import { FormRef } from '../RegistrationSteps/RegistrationSteps.tsx';
import { ICompany, ICompanyRegister } from 'shared/types/company.ts';
import { useNotif } from 'shared/lib/index.ts';
import { getCompanyDetails } from 'entities/Admin/index.ts';

interface IProps {
    handleNext?: () => void;
    className?: string;
    defaultValue?: ICompany | ICompanyRegister;
    companyId?: number;
}

export const RegistrationCompanyForm = forwardRef<FormRef, IProps>(
    ({ className, handleNext, defaultValue, companyId }, ref) => {
        const { t } = useTranslation('registration');
        const [form] = Form.useForm();
        const dispatch = useAppDispatch();
        const notif = useNotif();

        const formFields = useSelector($registerData);
        const createdCompanyId = useSelector($createdCompanyId);
        useImperativeHandle(ref, () => ({
            submit() {
                form.submit();
            },
        }));
        console.log('formFields', defaultValue);

        const handleFinish = (values) => {
            const action = defaultValue?.inn
                ? updateCompany({ param: values, companyId: companyId || 0 })
                : registerCompany({ param: formFields });

            createdCompanyId && handleNext
                ? handleNext()
                : dispatch(action)
                      .unwrap()
                      .then(() =>
                          notif.open({
                              status: 'success',
                              description: `Успешно ${defaultValue?.inn ? 'обновлено' : 'создано'}`,
                          })
                      )
                      .then(() => {
                          if (defaultValue?.inn) dispatch(getCompanyDetails({ id: companyId || 0 }));
                      })
                      .then(() => handleNext && handleNext());
        };

        useEffect(() => {
            if (!defaultValue?.title) {
                form.setFieldValue('title', formFields.title);
            }
        }, [form, formFields]);

        const handleChangeInput = (e: ChangeEvent<HTMLInputElement>, key: keyOfRegisterSliceSchema) => {
            dispatch(setRegisterProperty({ key, data: e.target.value, type: 'Company' }));
        };

        return (
            <Form
                initialValues={defaultValue || formFields}
                fields={fieldsMaker(formFields)}
                layout={'vertical'}
                form={form}
                onFinish={handleFinish}
                className={classNames(cls.from, {}, [className])}
            >
                {notif.context}
                <Row gutter={20} className={cls.row}>
                    <Col style={{ width: '50%' }}>
                        <Inn
                            label={'companyInn'}
                            inputName={'inn'}
                            fieldForSetResponse={'title'}
                            type={'Company'}
                        />
                        <Inn
                            label={t('companyPin')}
                            inputName={'managerInn'}
                            fieldForSetResponse={'managerName'}
                            type={'Company'}
                        />

                        <Form.Item
                            name={'managerPosition'}
                            label={t('position')}
                            rules={[{ required: true, message: t('loginPassRuleText') }]}
                        >
                            <Input onChange={(e) => handleChangeInput(e, 'managerPosition')} />
                        </Form.Item>
                        <Form.Item name={'website'} label={t('site')}>
                            <Input onChange={(e) => handleChangeInput(e, 'website')} />
                        </Form.Item>
                        <Form.Item
                            name={'workPhone'}
                            label={t('workPhone')}
                            rules={[{ required: true, message: t('loginPassRuleText') }]}
                        >
                            <Input onChange={(e) => handleChangeInput(e, 'workPhone')} />
                        </Form.Item>
                    </Col>

                    <Col style={{ width: '50%' }}>
                        <Form.Item
                            name={'title'}
                            label={t('companyName')}
                            rules={[
                                {
                                    required: true,
                                    message: t('loginUsernameRuleText'),
                                },
                            ]}
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            name={'managerName'}
                            label={t('headFullname')}
                            rules={[
                                {
                                    required: true,
                                    message: t('loginUsernameRuleText'),
                                },
                            ]}
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            name={'ateId'}
                            label={t('locality')}
                            initialValue={defaultValue?.ateName}
                            rules={[
                                {
                                    required: true,
                                    message: t('loginUsernameRuleText'),
                                },
                            ]}
                        >
                            <SelectLocality initialValue={defaultValue?.ateName || ''} />
                        </Form.Item>
                        <Form.Item
                            name={'factAddress'}
                            label={t('actualAddress')}
                            rules={[{ required: true, message: t('loginPassRuleText') }]}
                        >
                            <Input onChange={(e) => handleChangeInput(e, 'factAddress')} />
                        </Form.Item>
                        <Form.Item
                            name={'legalAddress'}
                            label={t('legalAddress')}
                            rules={[{ required: true, message: t('loginPassRuleText') }]}
                        >
                            <Input onChange={(e) => handleChangeInput(e, 'legalAddress')} />
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
