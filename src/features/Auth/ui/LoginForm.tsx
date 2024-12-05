import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { ILogin } from '../types/LoginType';
import { login } from '../model/service/LoginService';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { $userRole } from '../model/selectors';
import { useEffect } from 'react';
import { BluredBackGround } from '../../../shared/ui';
import cls from './style.module.scss';

export const LoginForm = () => {
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const userRole = useSelector($userRole);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleFinish = async (values: ILogin) => {
        await dispatch(login(values));
    };

    useEffect(() => {
        userRole && navigate(`../../${userRole}`);
    }, [navigate, userRole]);
    return (
        <BluredBackGround width={40} height={50} className={cls.blur}>
            <Form layout={'vertical'} form={form} className={cls.form} onFinish={handleFinish}>
                <Form.Item
                    name={'username'}
                    label={t('username')}
                    rules={[{ required: true, message: t('loginUsernameRuleText') }]}
                >
                    <Input placeholder="input placeholder" />
                </Form.Item>
                <Form.Item
                    name={'password'}
                    label={t('password')}
                    rules={[{ required: true, message: t('loginPassRuleText') }]}
                >
                    <Input.Password placeholder="input placeholder" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {t('login')}
                    </Button>
                </Form.Item>
            </Form>
        </BluredBackGround>
    );
};
