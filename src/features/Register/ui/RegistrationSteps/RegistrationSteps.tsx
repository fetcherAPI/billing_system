import { useState, useRef } from 'react';
import { Button, message, Steps } from 'antd';
import { IBaseProps } from 'shared/types';
import {
    RegistrationCompanyForm,
    RegistrationCompanyFormRef,
} from '../RegistrationForms/RegistrationCompanyForm.tsx';
import cls from './RegistrationSteps.module.scss';
import { BackButton } from 'shared/ui';
import { CompanyManagerForm, CompanyManagerFormRef } from '../RegistrationForms/CompanyManagerForm.tsx';

export const RegistrationSteps = ({ className }: IBaseProps) => {
    const [current, setCurrent] = useState(0);
    const formRef = useRef<RegistrationCompanyFormRef | CompanyManagerFormRef>(null);

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
            title: 'First',
            content: (
                <RegistrationCompanyForm
                    ref={formRef}
                    handleNext={() => setCurrent(current + 1)}
                />
            ),
        },
        {
            title: 'Second',
            content: <CompanyManagerForm ref={formRef} handleNext={() => setCurrent(current + 1)} />,
        },
        {
            title: 'Last',
            content: 'Last-content',
        },
    ];

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    return (
        <div className={className}>
            <Steps current={current} items={items} />
            <div className={cls.content}>{steps[current].content}</div>
            <div style={{ marginTop: 24 }}>
                <BackButton>
                    <>
                        {current < steps.length - 1 && (
                            <Button type="primary" onClick={next}>
                                Next
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button
                                type="primary"
                                onClick={() => message.success('Processing complete!')}
                            >
                                Done
                            </Button>
                        )}
                        {current > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={prev}>
                                Previous
                            </Button>
                        )}
                    </>
                </BackButton>
            </div>
        </div>
    );
};
