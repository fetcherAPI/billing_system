import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, Col, Descriptions, Row, Skeleton as SkeletonAnt } from 'antd';
import { BackButton, ConfirmModal } from 'shared/ui';
import { $companyDetails, useHandleGetCompanyDetails } from 'entities/Admin';
import cls from './CompanyDetails.module.scss';
import { Button1, ThemeButton } from 'shared/ui/Button1';
import { RegistrationCompanyForm } from 'features/Register';
import { FormRef } from 'features/Register/ui/RegistrationSteps/RegistrationSteps';

export const CompanyDetails = () => {
    const [isOpen, setIsOpen] = useState(false);

    const formRef = useRef<FormRef>(null);

    const next = () => {
        if (formRef.current) {
            formRef.current.submit();
        }
    };

    const handleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleConfirm = () => {
        next();
    };
    const { id } = useParams();
    const { handleGet, isLoading } = useHandleGetCompanyDetails();
    const {
        inn,
        dateCreated,
        legalAddress,
        factAddress,
        workPhone,
        ateId,
        website,
        managerName,
        managerInn,
        title,
        managerPosition,
    } = useSelector($companyDetails);

    useEffect(() => {
        if (!inn && id) {
            handleGet(+id).then((r) => console.log(r));
        }
    }, []);

    if (!id) return null;

    return (
        <>
            <>
                {isLoading ? (
                    <Skeleton />
                ) : (
                    <Card>
                        <ConfirmModal
                            handleClose={() => setIsOpen(false)}
                            onConfirm={handleConfirm}
                            onCancel={handleCancel}
                            title="Регистрация"
                            isOpen={isOpen}
                        >
                            <RegistrationCompanyForm
                                ref={formRef}
                                companyId={+id}
                                defaultValue={{
                                    inn,
                                    legalAddress,
                                    title,
                                    factAddress,
                                    workPhone,
                                    ateId,
                                    website,
                                    managerName,
                                    managerInn,
                                    managerPosition,
                                    notes: '',
                                }}
                            />
                        </ConfirmModal>
                        <Row>
                            <Col span={18}>
                                <Descriptions
                                    title="Информация об организации"
                                    className={cls.detailsWrapper}
                                >
                                    <Descriptions.Item label="Форма собственности">{inn}</Descriptions.Item>
                                    <Descriptions.Item label="ИНН Организации">{inn}</Descriptions.Item>
                                    <Descriptions.Item label="Наименование орг">{title}</Descriptions.Item>
                                    <Descriptions.Item label="Дата рег">{dateCreated}</Descriptions.Item>
                                    <Descriptions.Item label="Юр адрес">{legalAddress}</Descriptions.Item>
                                    <Descriptions.Item label="Факт адрес">{factAddress}</Descriptions.Item>
                                    <Descriptions.Item label="Рабочий тел">{workPhone}</Descriptions.Item>
                                    <Descriptions.Item label="">
                                        <BackButton />
                                    </Descriptions.Item>
                                </Descriptions>
                            </Col>
                            <Col>
                                <Button1 theme={ThemeButton.PRIMARY} onClick={handleOpen}>
                                    Редактировать
                                </Button1>
                            </Col>
                        </Row>
                    </Card>
                )}
            </>
        </>
    );
};

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
