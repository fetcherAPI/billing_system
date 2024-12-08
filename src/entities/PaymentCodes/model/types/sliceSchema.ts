import { IPayment } from '.';

export interface IPaymentCodesSliceSchema {
    isLoading: boolean;
    error: string | undefined;
    paymentCodes: Array<IPayment>;
    totalCount: number;
}
