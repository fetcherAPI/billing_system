import { IService } from './service';
import { ISplitter } from './splitter';

interface ITreeNode {
    id: number;
    name: string;
    parentId: number | null;
    isService: boolean;
    companyId: number;
    children?: ITreeNode[]; // Вложенные элементы
}

export interface ISerivceSliceSchema {
    service?: IService;
    serivcesList: Array<IService>;
    splitters: Array<ISplitter>;
    isLoading?: boolean;
    error?: string;
    servicesTotalCount: number;
    nodes: Record<string, ITreeNode>;
}
