import { useEffect, useState } from 'react';
import type { GetProp, TreeSelectProps } from 'antd';
import { Form, TreeSelect } from 'antd';
// import { useAppDispatch } from 'app/providers/StoreProvider';
import { ServiceApi } from 'entities/Service/api';
import { IService } from 'entities/Service/model/types/service';

type DefaultOptionType = GetProp<TreeSelectProps, 'treeData'>[number];

export const SelectServiceParent = () => {
    const [value, setValue] = useState<string>();
    const [treeData, setTreeData] = useState<Omit<DefaultOptionType, 'label'>[]>([]);

    // const dispatch = useAppDispatch();

    const fetchChildren = async (parentId?: number) => {
        const response = await ServiceApi.getSerivcesTree(parentId);
        return response.data.content.map((item: IService) => ({
            id: item.id,
            pId: item.parentId,
            value: item.id.toString(),
            title: item.name,
            isLeaf: item.isService,
        }));
    };

    const onLoadData: TreeSelectProps['loadData'] = async (node) => {
        const { id } = node;
        const children = await fetchChildren(id);
        setTreeData((prevData) => [...prevData, ...children]);
    };

    const onChange = (newValue: string) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (!treeData.length) {
            const asyncFunc = async () => {
                const firstLevel = await fetchChildren();
                setTreeData(firstLevel);
            };
            asyncFunc();
        }
    }, []);

    return (
        <Form.Item
            name="parentId"
            label="Название услуги"
            // rules={[{ required: true }, { min: 3, message: 'Обязательно для заполнение' }]}
        >
            <TreeSelect
                treeDataSimpleMode
                style={{ width: '100%' }}
                value={value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Выбрать папку"
                onChange={onChange}
                loadData={onLoadData}
                treeData={treeData}
            />
        </Form.Item>
    );
};
