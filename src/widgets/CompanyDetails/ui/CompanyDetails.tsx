import { memo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Descriptions, Row, Skeleton as SkeletonAnt } from 'antd';
import { BackButton, ConfirmModal } from 'shared/ui';
import { $companyDetails, useHandleGetCompanyDetails } from 'entities/Admin';
import { Button1, ThemeButton } from 'shared/ui/Button1';
import { RegistrationCompanyForm } from 'features/Register';
import { FormRef } from 'features/Register/ui/RegistrationSteps/RegistrationSteps';
import cls from './CompanyDetails.module.scss';

interface ICompanyDetails {
    companyId: number;
}

export const CompanyDetails = ({ companyId }: ICompanyDetails) => {
    const { handleGet, isLoading } = useHandleGetCompanyDetails();
    const companyDetails = useSelector($companyDetails);

    useEffect(() => {
        if (!companyDetails.inn) {
            handleGet(companyId);
        }
    }, []);

    return (
        <>
            {isLoading ? (
                <Skeleton />
            ) : (
                <Card>
                    <Row>
                        <Col span={18}>
                            <Descriptions title="Информация об организации" className={cls.detailsWrapper}>
                                {[
                                    { label: 'Форма собственности', value: companyDetails.inn },
                                    { label: 'ИНН Организации', value: companyDetails.inn },
                                    { label: 'Место', value: companyDetails.ateName },
                                    { label: 'Наименование орг', value: companyDetails.title },
                                    { label: 'Должность', value: companyDetails.managerPosition },
                                    { label: 'Дата рег', value: companyDetails.dateCreated },
                                    { label: 'Юр адрес', value: companyDetails.legalAddress },
                                    { label: 'Факт адрес', value: companyDetails.factAddress },
                                    { label: 'Рабочий тел', value: companyDetails.workPhone },
                                ].map(({ label, value }) => (
                                    <Descriptions.Item key={label} label={label}>
                                        {value}
                                    </Descriptions.Item>
                                ))}
                                <Descriptions.Item label="">
                                    <BackButton />
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col>
                            <UpdateModal companyId={companyId} />
                        </Col>
                    </Row>
                </Card>
            )}
        </>
    );
};

const UpdateModal = memo(({ companyId }: { companyId: number }) => {
    const [isOpen, setIsOpen] = useState(false);
    const formRef = useRef<FormRef>(null);
    const companyDetails = useSelector($companyDetails);

    const toggleModal = () => setIsOpen((prev) => !prev);
    const handleConfirm = () => formRef.current?.submit();
    return (
        <>
            <ConfirmModal
                handleClose={toggleModal}
                onConfirm={handleConfirm}
                onCancel={toggleModal}
                title="Регистрация"
                isOpen={isOpen}
            >
                <RegistrationCompanyForm
                    ref={formRef}
                    companyId={companyId}
                    handleNext={toggleModal}
                    defaultValue={{ ...companyDetails, notes: '' }}
                />
            </ConfirmModal>
            <Button1 theme={ThemeButton.PRIMARY} onClick={toggleModal}>
                Редактировать
            </Button1>
        </>
    );
});

UpdateModal.displayName = 'UpdateModal';

const Skeleton = () => {
    return (
        <Descriptions title="Информация об организации" className={cls.detailsWrapper}>
            <Descriptions.Item label="Форма собственности">
                <SkeletonAnt.Input />
            </Descriptions.Item>
            <Descriptions.Item label="ИНН Организации">
                <SkeletonAnt.Input />
            </Descriptions.Item>
            <Descriptions.Item label="Наименование орг">
                <SkeletonAnt.Input />
            </Descriptions.Item>
            <Descriptions.Item label="Дата рег">
                <SkeletonAnt.Input />
            </Descriptions.Item>
            <Descriptions.Item label="Юр адрес">
                <SkeletonAnt.Input />
            </Descriptions.Item>
            <Descriptions.Item label="Факт адрес">
                <SkeletonAnt.Input />
            </Descriptions.Item>
            <Descriptions.Item label="Рабочий тел">
                <SkeletonAnt.Input />
            </Descriptions.Item>
        </Descriptions>
    );
};
