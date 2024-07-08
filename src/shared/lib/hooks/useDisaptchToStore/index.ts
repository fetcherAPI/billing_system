import { useAppDispatch } from 'app/providers/StoreProvider';

export const useDispatchToStore = <T = undefined>(service: (param: T) => any) => {
    const dispatch = useAppDispatch();

    return (serviceParam: T) => {
        dispatch(service(serviceParam));
    };
};
