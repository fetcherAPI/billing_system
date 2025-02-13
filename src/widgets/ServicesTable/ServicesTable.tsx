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
import { FormOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import cardPng from 'shared/assets/card.png';
import filePng from 'shared/assets/folder.png';
import cls from './Service.module.scss';

const Tree = (props: IService) => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const handleClick = () => {
        searchParams.set('parentId', String(props.id));
        setSearchParams(searchParams);
    };

    const { showModal, FormWithModal } = useServiceForm(props);

    const handleNavigate = () => {
        navigate(`../${getRouteServiceDetail(props.id)}`);
    };

    const onClick = props.isService ? handleNavigate : handleClick;
    const handleAlert = (e: any) => {
        e.stopPropagation();
        showModal();
    };
    return (
        <>
            {FormWithModal}
            <div className={cls.serviceCard} onClick={onClick}>
                <div>
                    <p>{props.isService ? 'Услуга' : 'Папка'}</p>
                    <p className={cls.serviceName}>{props.name}</p>
                </div>
                <div className={cls.actions}>
                    <img src={props.isService ? cardPng : filePng} alt="" />
                    <Row gutter={14}>
                        <Col>
                            <FormOutlined onClick={(e) => handleAlert(e)} />
                        </Col>
                        {/* <DeleteOutlined /> */}
                    </Row>
                </div>
            </div>
        </>
    );
};

export const ServicesTable = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    const parentId = searchParams.get('parentId');

    const nodes = useSelector((state: RootState) => $selectNodesByParentId(parentId)(state));

    useEffect(() => {
        dispatch(getServicesByParentId({ first: 0, rows: 100, parentId: parentId }));
    }, [parentId]);

    return (
        <>
            <div className={cls.servicesWrapper}>
                {nodes?.length ? nodes?.map((el) => <Tree key={el.id} {...el} />) : <EmptyData />}
            </div>
            <br />
            <BackButton />
        </>
    );
};
