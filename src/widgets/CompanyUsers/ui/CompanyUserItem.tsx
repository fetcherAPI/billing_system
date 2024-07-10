import { IUser } from 'shared/types';
import { Badge, Descriptions, Row } from 'antd';
import cls from './CompanyUser.module.scss';
import { ActivateUser, DeactivateUser } from 'features/CompanyUsers';

export const CompanyUserItem = (props: IUser) => {
    const { id, userInn, fullName, position, cellPhone, email, username, status } = props;
    const isUserActive = status === 'ACTIVE';
    return (
        <Badge.Ribbon
            color={isUserActive ? 'green' : 'red'}
            text={isUserActive ? 'активный' : 'заблокированный '}
        >
            <Row className={cls.item}>
                <Descriptions title="Сотрудник">
                    <Descriptions.Item label="ИНН пользователя">{userInn}</Descriptions.Item>
                    <Descriptions.Item label="ФИО">{fullName}</Descriptions.Item>
                    <Descriptions.Item label="Должность ">{position}</Descriptions.Item>
                    <Descriptions.Item label="Контакты">{cellPhone}</Descriptions.Item>
                    <Descriptions.Item label="Почта">{email}</Descriptions.Item>
                    <Descriptions.Item label="Логин">{username}</Descriptions.Item>
                </Descriptions>
                {isUserActive ? <DeactivateUser id={id} /> : <ActivateUser id={props.id} />}
            </Row>
        </Badge.Ribbon>
    );
};
