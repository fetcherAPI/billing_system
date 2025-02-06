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
import { registerCompany } from '../../model/service/registerCompany.ts';
import { Inn } from '../FormFields/Inn.tsx';
import cls from './style.module.scss';
import { FormRef } from '../RegistrationSteps/RegistrationSteps.tsx';

interface IProps {
    className?: string;
    handleNext: () => void;
}

export const RegistrationCompanyForm = forwardRef<FormRef, IProps>(({ className, handleNext }, ref) => {
    const { t } = useTranslation('registration');
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const formFields = useSelector($registerData);
    const createdCompanyId = useSelector($createdCompanyId);

    useImperativeHandle(ref, () => ({
        submit() {
            form.submit();
        },
    }));

    const handleFinish = () => {
        createdCompanyId
            ? handleNext()
            : dispatch(registerCompany({ param: formFields })).then(
                  (res) => res.meta.requestStatus === 'fulfilled' && handleNext()
              );
    };

    useEffect(() => {
        form.setFieldValue('title', formFields.title);
    }, [form, formFields]);

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>, key: keyOfRegisterSliceSchema) => {
        dispatch(setRegisterProperty({ key, data: e.target.value, type: 'Company' }));
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
                        <Input
                            placeholder="input placeholder"
                            onChange={(e) => handleChangeInput(e, 'managerPosition')}
                        />
                    </Form.Item>
                    <Form.Item name={'website'} label={t('site')}>
                        <Input
                            placeholder="input placeholder"
                            onChange={(e) => handleChangeInput(e, 'website')}
                        />
                    </Form.Item>
                    <Form.Item
                        name={'workPhone'}
                        label={t('workPhone')}
                        rules={[{ required: true, message: t('loginPassRuleText') }]}
                    >
                        <Input
                            placeholder="input placeholder"
                            onChange={(e) => handleChangeInput(e, 'workPhone')}
                        />
                    </Form.Item>
                </Col>

                <Col style={{ width: '50%' }}>
                    <Form.Item
                        name={'title'}
                        label={t('companyName')}
                        initialValue={formFields.title}
                        rules={[
                            {
                                required: true,
                                message: t('loginUsernameRuleText'),
                            },
                        ]}
                    >
                        <Input placeholder="input placeholder" disabled={false} />
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
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item
                        name={'ateId'}
                        label={t('locality')}
                        rules={[
                            {
                                required: true,
                                message: t('loginUsernameRuleText'),
                            },
                        ]}
                    >
                        <SelectLocality />
                    </Form.Item>
                    <Form.Item
                        name={'factAddress'}
                        label={t('actualAddress')}
                        rules={[{ required: true, message: t('loginPassRuleText') }]}
                    >
                        <Input
                            placeholder="input placeholder"
                            onChange={(e) => handleChangeInput(e, 'factAddress')}
                        />
                    </Form.Item>
                    <Form.Item
                        name={'legalAddress'}
                        label={t('legalAddress')}
                        rules={[{ required: true, message: t('loginPassRuleText') }]}
                    >
                        <Input
                            placeholder="input placeholder"
                            onChange={(e) => handleChangeInput(e, 'legalAddress')}
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
});
