import { IService } from './service';

export interface ISerivceSliceSchema {
    service?: IService;
    serivcesList: Array<IService>;
    isLoading?: boolean;
    error?: string;
    servicesTotalCount: number;
}
