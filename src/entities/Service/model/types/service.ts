export interface ICreateServiceDto {
    name: string;
    companyId: number;
    isService: boolean;
    parentId?: number;
}

export interface IService extends ICreateServiceDto {
    name: string;
    companyId: number;
    isService: boolean;
    parentId: number;
    id: number;
    parentName: string;
    companyName: string;
}
