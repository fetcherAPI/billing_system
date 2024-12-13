import { Button } from 'antd';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { checkPayment } from '../model/service/checkPayment';
import { useNotif } from 'shared/lib';

interface IProps {
    orderId: string;
    disabled: boolean;
}

export const CheckPayment = ({ disabled, orderId }: IProps) => {
    const dispatch = useAppDispatch();
    const notif = useNotif();

    const handleClick = () => {
        dispatch(checkPayment({ orderId }))
            .unwrap()
            .then((res) => {
                notif.open({
                    status: 'success',
                    duration: 2000,
                    description: `Статус оплаты ${res[0].code}, ${res[0].comment}`,
                });
            })
            .catch(() => notif.open({ status: 'error' }));
    };

    return (
        <>
            {notif.context}
            <Button disabled={disabled} onClick={handleClick}>
                Проверить
            </Button>
        </>
    );
};
