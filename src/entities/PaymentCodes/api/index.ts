import { AxiosResponse } from 'axios';
import api from 'shared/api/api';
import { IResponseList } from 'shared/types';
import { IPaginationQueryParams } from 'shared/types/baseTypes';
import { IPayment } from '../model/types';

export class PaymentCodeApi {
    static async getPaymentCodes({
        first,
        rows,
    }: IPaginationQueryParams): Promise<AxiosResponse<IResponseList<IPayment>>> {
        return api.get(`/api/services/getAllService?first=${first - 1}&rows=${rows}`);
    }

    static async getPaymentCodesByServiceId(
        { first, rows }: IPaginationQueryParams,
        serviceId: number
    ): Promise<AxiosResponse<IResponseList<IPayment>>> {
        return api.get(`/api/services/getByChapter?id=${serviceId}first=${first - 1}&rows=${rows}`);
    }

    static async checkPayment(
        orderId: string
    ): Promise<AxiosResponse<Array<{ code: number; comment: string }>>> {
        return api.get(`/api/services/check/${orderId}`);
    }
}

// 4403071001000190

// 11111200

// 4402031000100533

// 14311120
