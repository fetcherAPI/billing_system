import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Descriptions, Skeleton as SkeletonAnt } from 'antd';
import { BluredBackGround } from 'shared/ui';
import { $companyDetails, useHandleGetCompanyDetails } from 'entities/Admin';
import cls from './CompanyDetails.module.scss';

export const CompanyDetails = () => {
    const { id } = useParams();
    const { handleGet, isLoading } = useHandleGetCompanyDetails();
    const { inn, title, dateCreated, legalAddress, factAddress, workPhone } = useSelector($companyDetails);

    useEffect(() => {
        if (!inn && id) {
            handleGet(+id).then((r) => console.log(r));
        }
    }, []);

    if (!id) return null;

    return (
        <BluredBackGround className={cls.blur}>
            {isLoading ? (
                <Skeleton />
            ) : (
                <Descriptions title="Информация об организации" className={cls.detailsWrapper}>
                    <Descriptions.Item label="Форма собственности">{inn}</Descriptions.Item>
                    <Descriptions.Item label="ИНН Организации">{inn}</Descriptions.Item>
                    <Descriptions.Item label="Наименование орг">{title}</Descriptions.Item>
                    <Descriptions.Item label="Дата рег">{dateCreated}</Descriptions.Item>
                    <Descriptions.Item label="Юр адрес">{legalAddress}</Descriptions.Item>
                    <Descriptions.Item label="Факт адрес">{factAddress}</Descriptions.Item>
                    <Descriptions.Item label="Рабочий тел">{workPhone}</Descriptions.Item>
                </Descriptions>
            )}
        </BluredBackGround>
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
