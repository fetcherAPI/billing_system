import { Descriptions } from 'antd';
import { useSelector } from 'react-redux';
import { BluredBackGround } from 'shared/ui';
import { $companyDetails } from 'entities/Admin';
import cls from './CompanyDetails.module.scss';

export const CompanyDetails = () => {
    const { inn, title, dateCreated, legalAddress, factAddress, workPhone } = useSelector($companyDetails);

    return (
        <BluredBackGround width={60} height={90} className={cls.blur}>
            <Descriptions title="Информация об организации" className={cls.detailsWrapper}>
                <Descriptions.Item label="Форма собственности">{inn}</Descriptions.Item>
                <Descriptions.Item label="ИНН Организации">{inn}</Descriptions.Item>
                <Descriptions.Item label="Наименование орг">{title}</Descriptions.Item>
                <Descriptions.Item label="Дата рег">{dateCreated}</Descriptions.Item>
                <Descriptions.Item label="Юр адрес">{legalAddress}</Descriptions.Item>
                <Descriptions.Item label="Факт адрес">{factAddress}</Descriptions.Item>
                <Descriptions.Item label="Рабочий тел">{workPhone}</Descriptions.Item>
            </Descriptions>
        </BluredBackGround>
    );
};
