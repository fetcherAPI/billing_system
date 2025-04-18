import { useState } from 'react';
import type { GetProp, TreeSelectProps } from 'antd';
import { TreeSelect } from 'antd';
import api from 'shared/api/api.ts';
import { IResponseList } from 'shared/types';
import { IAte } from '../../types/Ate.ts';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { setRegisterProperty } from '../../model/slice/RegisterSlice.ts';

type DefaultOptionType = GetProp<TreeSelectProps, 'treeData'>[number];

export const SelectLocality = ({ initialValue }: { initialValue: string }) => {
    const [value, setValue] = useState<string>(initialValue);
    const [treeData, setTreeData] = useState<Omit<DefaultOptionType, 'label'>[]>([
        { id: 121, pId: 0, value: '121', title: 'Кыргызская Республика' },
    ]);

    const dispatch = useAppDispatch();

    const fetchChildren = async (parentId: number) => {
        const response = await api.get<IResponseList<IAte>>(
            `http://10.200.24.107:8080/dictionary/ate/children?id=${parentId}&first=0&rows=100`
        );
        return response.data.content.map((item: any) => ({
            id: item.id,
            pId: item.parentId,
            value: item.id.toString(),
            title: item.name,
            isLeaf: item.hierarchyTree !== null,
        }));
    };

    const onLoadData: TreeSelectProps['loadData'] = async (node) => {
        const { id } = node;
        const children = await fetchChildren(id);
        setTreeData((prevData) => [...prevData, ...children]);
    };

    const onChange = (newValue: string, node: any) => {
        dispatch(setRegisterProperty({ key: 'ateId', data: newValue, type: 'Company' }));
        dispatch(setRegisterProperty({ key: 'ateName', data: node.title, type: 'Company' }));
        setValue(newValue);
    };
    return (
        <TreeSelect
            placeholder={initialValue}
            treeDataSimpleMode
            style={{ width: '100%' }}
            value={value || initialValue}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            onSelect={(data, node) => onChange(data, node)}
            loadData={onLoadData}
            treeData={treeData}
        />
    );
};
