import { StateSchema } from 'app/providers/StoreProvider';

export const $servicesList = (s: StateSchema) => s.service.serivcesList || [];

export const $servicesTotalCount = (s: StateSchema) => s.service.servicesTotalCount;

export const $service = (s: StateSchema) => s.service.service;
