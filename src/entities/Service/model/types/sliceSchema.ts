import { IService } from './service';
import { ISplitter } from './splitter';

export interface ISerivceSliceSchema {
    service?: IService;
    serivcesList: Array<IService>;
    splitters: Array<ISplitter>;
    isLoading?: boolean;
    error?: string;
    servicesTotalCount: number;
}
