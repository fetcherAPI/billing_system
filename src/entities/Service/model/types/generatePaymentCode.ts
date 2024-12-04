export interface IGeneratePaymentCodeDto {
    payerInn: string;
    payerName: string;
    destination: string;
    amount?: number;
    chapterId: number;
}

export interface IGeneratePaymentCode extends IGeneratePaymentCodeDto {
    id: 0;
    splitter: string;
    number: 0;
    dateCreated: string;
    chapterName: string;
    paymentCode: string;
}
