import { useSelector } from 'react-redux';
import { $isAuth, $userName } from '../model/selectors';
import { Button1 } from 'shared/ui/Button1';
import { UserOutlined } from '@ant-design/icons';

export const UserName = () => {
    const isAuth = useSelector($isAuth);
    const userName = useSelector($userName);
    console.log('userName', userName);
    if (!isAuth) return null;
    return (
        <Button1>
            {userName}
            <UserOutlined style={{ color: '#83899f', fontSize: 20 }} />
        </Button1>
    );
};
