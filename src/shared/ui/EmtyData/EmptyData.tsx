import { Card } from 'antd';
import cls from './EmptyDate.module.scss';
import png from '../../assets/empty.png';
export const EmptyData = () => {
    return (
        <Card className={cls.wrapper}>
            <img src={png} alt="empty data" />
            <h1>Нет данных</h1>
        </Card>
    );
};
