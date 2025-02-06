import { useSelector } from 'react-redux';
import { getRouteServiceDetail } from 'shared/config/routeConfig/routeConfig.tsx';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { $selectNodesByParentId } from 'entities/Service/model/selectors';
import { useEffect } from 'react';
import { RootState, useAppDispatch } from 'app/providers/StoreProvider';
import cls from './Service.module.scss';
import filePng from 'shared/assets/folder.png';
import cardPng from 'shared/assets/card.png';
import { getServicesByParentId } from 'entities/Service/model/service/getServicesByParentId';
import { EmptyData } from 'shared/ui/EmtyData/EmptyData';
import { BackButton } from 'shared/ui';

const Tree = ({ isService, name, id }: { isService: boolean; name: string; id: number }) => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const handleClick = () => {
        searchParams.set('parentId', String(id));
        setSearchParams(searchParams);
    };

    const handleNavigate = () => {
        navigate(`../${getRouteServiceDetail(id)}`);
    };

    const onClick = isService ? handleNavigate : handleClick;

    return (
        <div className={cls.serviceCard} onClick={onClick}>
            <p>{isService ? 'Услуга' : 'Папка'}</p>
            <p className={cls.serviceName}>{name}</p>
            <img src={isService ? cardPng : filePng} alt="" />
        </div>
    );
};

export const ServicesTable = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    const parentId = searchParams.get('parentId');

    const nodes = useSelector((state: RootState) => $selectNodesByParentId(parentId)(state));
    console.log('nodes', nodes);
    useEffect(() => {
        dispatch(getServicesByParentId({ first: 0, rows: 100, parentId: parentId }));
    }, [parentId]);

    return (
        <>
            <div className={cls.servicesWrapper}>
                {nodes?.length ? (
                    nodes?.map((el) => (
                        <Tree key={el.id} isService={el.isService} name={el.name} id={el.id} />
                    ))
                ) : (
                    <EmptyData />
                )}
            </div>
            <br />
            <BackButton />
        </>
    );
};
