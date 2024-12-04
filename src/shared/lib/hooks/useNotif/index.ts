import { notification } from 'antd';

type notifType = {
    status: 'success' | 'error';
    title?: string;
    description?: string;
    placement?: 'topRight' | 'topLeft';
    duration?: number;
};
export const useNotif = () => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = ({ status, description, duration, title, placement }: notifType) => {
        api[status]({
            message: title ? title : status === 'success' ? 'Успешно' : 'Ошибка',
            description: description
                ? description
                : status === 'success'
                ? 'Детали сообщения'
                : 'Детали ошибки',
            placement: placement || 'topRight',
            duration: duration || 3,
            role: 'status',
            style: {
                background: status === 'success' ? 'D9F8D1' : '#ffF',
            },
        });
    };

    return {
        context: contextHolder,
        open: openNotification,
    };
};
