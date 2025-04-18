import { useState, useRef } from 'react';
import { Button, Card, Steps, Typography } from 'antd';
import { IBaseProps } from 'shared/types';
import { RegistrationCompanyForm } from '../RegistrationForms/RegistrationCompanyForm.tsx';
import { UserRegisterForm } from '../RegistrationForms/UserRegisterForm.tsx';
import cls from './RegistrationSteps.module.scss';
import { useNavigate } from 'react-router-dom';

export interface FormRef {
    submit: () => void;
}

export const RegistrationSteps = ({ className }: IBaseProps) => {
    const [current, setCurrent] = useState(0);
    const formRef = useRef<FormRef>(null);
    const nav = useNavigate();
    const next = () => {
        if (formRef.current) {
            formRef.current.submit();
        }
    };

    const prev = () => {
        setCurrent((prev) => prev - 1);
    };

    const steps = [
        {
            title: 'Компания',
            content: <RegistrationCompanyForm ref={formRef} handleNext={() => setCurrent(current + 1)} />,
        },
        {
            title: 'Директор',
            content: (
                <UserRegisterForm
                    ref={formRef}
                    handleNext={() => setCurrent(current + 1)}
                    userRole={'manager'}
                />
            ),
        },
        {
            title: 'Завершить',
            content: (
                <Card
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 400,
                    }}
                >
                    <Typography style={{ fontSize: '200%' }}>Вы успешно прошли регистрацию!</Typography>
                </Card>
            ),
        },
    ];

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    return (
        <div className={className}>
            <Steps current={current} items={items} />
            <div className={cls.content}>{steps[current].content}</div>
            <div>
                {/* <BackButton> */}
                <>
                    {' '}
                    <br />
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={prev}>
                            Предыдущая форма
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={next}>
                            Сохранить
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => nav('../login')}>
                            Завершить
                        </Button>
                    )}
                </>
                {/* </BackButton> */}
            </div>
        </div>
    );
};
