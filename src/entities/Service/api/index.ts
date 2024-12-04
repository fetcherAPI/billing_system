import { ISplitter } from './../model/types/splitter';
import { ICreateServiceDto, IService } from './../model/types/service';
import { AxiosResponse } from 'axios';
import api from 'shared/api/api';
import { IResponseList } from 'shared/types';
import { IPaginationQueryParams } from 'shared/types/baseTypes';
import { ISplitterCreateDto } from '../model/types/splitter';
import { IGeneratePaymentCode, IGeneratePaymentCodeDto } from '../model/types/generatePaymentCode';

export class ServiceApi {
    static async getServices({
        first,
        rows,
    }: IPaginationQueryParams): Promise<AxiosResponse<IResponseList<IService>>> {
        return api.get(`/api/chapter?first=${first - 1}&rows=${rows}`);
    }

    static async createService(param: ICreateServiceDto): Promise<AxiosResponse<IService>> {
        return api.post(`/api/chapter/create`, param);
    }

    static async createSplitter(param: ISplitterCreateDto): Promise<AxiosResponse<ISplitter>> {
        return api.post(`/api/chapter/splitter/create`, param);
    }

    static async generatePaymentCode(
        param: IGeneratePaymentCodeDto
    ): Promise<AxiosResponse<IGeneratePaymentCode>> {
        return api.post(`/api/chapter/generateService`, param);
    }

    static async getServiceById(id: number): Promise<AxiosResponse<IService>> {
        return api.get(`api/chapter/${id}`);
    }
}

// 4403071001000190

// 11111200

// 4402031000100533

// 14311120
