import { useSelector } from 'react-redux';
import { getRouteServiceDetail } from 'shared/config/routeConfig/routeConfig.tsx';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { $selectNodesByParentId } from 'entities/Service/model/selectors';
import { useEffect } from 'react';
import { RootState, useAppDispatch } from 'app/providers/StoreProvider';
import { getServicesByParentId } from 'entities/Service/model/service/getServicesByParentId';
import { EmptyData } from 'shared/ui/EmtyData/EmptyData';
import { BackButton } from 'shared/ui';
import { useServiceForm } from 'pages/ManagerPage/ui/Services/Services';
import { IService } from 'entities/Service/model/types/service';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import cardPng from 'shared/assets/card.png';
import filePng from 'shared/assets/folder.png';
import cls from './Service.module.scss';
import { deleteService } from 'entities/Service';

interface ITreeProps {
    service: IService;
    handleDelete: (id: number, e: React.MouseEvent<HTMLSpanElement>) => void;
    onClick: (id: number) => void;
}

const Tree = ({ service, onClick, handleDelete }: ITreeProps) => {
    const { showModal, FormWithModal } = useServiceForm(service);

    const handleAlert = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        showModal();
    };
    return (
        <>
            {FormWithModal}
            <div className={cls.serviceCard} onClick={() => onClick(service.id)}>
                <div>
                    <p>{service.isService ? 'Услуга' : 'Папка'}</p>
                    <p className={cls.serviceName}>{service.name}</p>
                </div>
                <div className={cls.actions}>
                    <img src={service.isService ? cardPng : filePng} alt="" />
                    <Row gutter={14}>
                        <Col>
                            <FormOutlined onClick={(e) => handleAlert(e)} />
                        </Col>
                        <DeleteOutlined onClick={(e) => handleDelete(service.id, e)} />
                    </Row>
                </div>
            </div>
        </>
    );
};

export const ServicesTable = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const parentId = searchParams.get('parentId');

    const nodes = useSelector((state: RootState) => $selectNodesByParentId(parentId)(state));

    const handleClick = (id: number) => {
        searchParams.set('parentId', String(id));
        setSearchParams(searchParams);
    };

    const handleNavigate = (id: number) => {
        navigate(`../${getRouteServiceDetail(id)}`);
    };

    const handleDelete = (id: number, e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        dispatch(deleteService({ id }))
            .unwrap()
            .then(() => {
                getServicesByParentId({
                    first: 0,
                    rows: 100,
                    parentId: parentId,
                    updated: true,
                });
            });
    };

    useEffect(() => {
        dispatch(getServicesByParentId({ first: 0, rows: 100, parentId: parentId }));
    }, [parentId]);

    return (
        <>
            <div className={cls.servicesWrapper}>
                {nodes?.length ? (
                    nodes?.map((el) => (
                        <Tree
                            key={el.id}
                            service={el}
                            onClick={el.isService ? handleNavigate : handleClick}
                            handleDelete={handleDelete}
                        />
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
