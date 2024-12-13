export interface IPayment {
    id: number;
    dateCreated: string;
    destination: string;
    number: number;
    amount: number;
    role: string;
    payerInn: string;
    payerName: string;
    chapterId: number;
    splitter: string;
    payId: number;
    status: number;
    orderId: string;
    paymentCode: string;
}
