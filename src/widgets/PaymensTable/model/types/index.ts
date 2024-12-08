export interface IPayment {
    id: number;
    date_created: string;
    destination: string;
    number: number;
    amount: number;
    role: string;
    payer_inn: string;
    payer_name: string;
    chapter_id: number;
    splitter: string;
    pay_id: number;
    status: number;
    payment_code: string;
}
