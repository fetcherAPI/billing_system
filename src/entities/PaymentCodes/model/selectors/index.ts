import { StateSchema } from 'app/providers/StoreProvider';

export const $paymentCodesList = (s: StateSchema) => s.paymentCode.paymentCodes || [];

export const $paymentCodesTotalCount = (s: StateSchema) => s.paymentCode.totalCount;

export const $isLoading = (s: StateSchema) => s.paymentCode.isLoading;
