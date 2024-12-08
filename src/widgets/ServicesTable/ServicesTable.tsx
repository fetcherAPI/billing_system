import { useSelector } from 'react-redux';
import { Divider, Table, TableProps } from 'antd';
import { getRouteServiceDetail } from 'shared/config/routeConfig/routeConfig.tsx';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IService } from 'entities/Service/model/types/service';
import { $selectNodesByParentId, $servicesList } from 'entities/Service/model/selectors';
import { useEffect } from 'react';
import { RootState, useAppDispatch } from 'app/providers/StoreProvider';
import cls from './Service.module.scss';
import filePng from 'shared/assets/folder.png';
import cardPng from 'shared/assets/card.png';
import { getServicesByParentId } from 'entities/Service/model/service/getServicesByParentId';

const columns: TableProps<IService>['columns'] = [
    {
        title: '№',
        dataIndex: 'number',
        key: 'number',
        render: (_, _record, index) => <p>{++index}</p>,
    },
    {
        title: 'Название усулуги',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Название родителя',
        dataIndex: 'parentName',
        key: 'parentName',
    },
    {
        title: 'Название организации',
        dataIndex: 'companyName',
        key: 'companyName',
    },
];

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
    const servicesList = useSelector($servicesList);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const parentId = searchParams.get('parentId');

    const nodes = useSelector((state: RootState) => $selectNodesByParentId(parentId)(state));
    useEffect(() => {
        dispatch(getServicesByParentId({ first: 0, rows: 100, parentId: parentId }));
    }, [parentId]);

    return (
        <div>
            {/* <Table
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={servicesList}
                pagination={false}
                onRow={(record) => {
                    return {
                        onClick: () => navigate(`../${getRouteServiceDetail(record.id)}`),
                    };
                }}
            />
            <Divider /> */}
            <div className={cls.servicesWrapper}>
                {nodes?.map((el) => (
                    <Tree key={el.id} isService={el.isService} name={el.name} id={el.id} />
                ))}
            </div>

            {/* <Tree /> */}
            {/* <BluredBackGround>
                <Pagination onChange={handleGetServicesByParentId} total={servicesTotalCount} />
            </BluredBackGround> */}
        </div>
    );
};
