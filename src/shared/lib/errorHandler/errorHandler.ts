import { AxiosError } from 'axios';
import { RESPONSE_ERRORS } from '../const/error';

export const errorHandler = (error: AxiosError<any | unknown>): string => {
    const message = error.response?.data.message;
    const errors = new Map<number, string>([
        [400, message || RESPONSE_ERRORS.BAD_REQUEST],
        [401, message || RESPONSE_ERRORS.UN_AUTH],
        [403, message || RESPONSE_ERRORS.PERMISSION_DENIED],
        [404, message || RESPONSE_ERRORS.NOT_FOUND],
        [406, message || RESPONSE_ERRORS.NOT_ACCEPTABLE],
        [406, message || RESPONSE_ERRORS.CONFLICT],
        [409, message || RESPONSE_ERRORS.CONFLICT],
        [500, message || RESPONSE_ERRORS.SERVER_ERROR],
    ]);
    if (error.response?.status) {
        return errors.get(error.response?.status) || RESPONSE_ERRORS.UNEXPECTED_ERROR;
    } else {
        return RESPONSE_ERRORS.UNEXPECTED_ERROR;
    }
};
