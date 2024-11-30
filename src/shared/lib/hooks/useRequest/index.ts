import axios from 'axios';
import { useState } from 'react';
import { errorHandler } from '../../errorHandler/errorHandler';

export const useRequest = <T = undefined, P = undefined>() => {
    const [response, setResponse] = useState<P | string>();

    const [error, setError] = useState<string>('');

    const [status, setStatus] = useState<number>();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const request = async (params: T, requestService: any) => {
        setIsLoading(true);
        try {
            const res = await requestService(params);

            if (!res.data) {
                setResponse('no data');
            } else {
                setResponse(res.data);
            }
            setIsLoading(false);
            setStatus(res.status);
            setError('');
            return res;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(errorHandler(err));
                setStatus(err.response?.status);
            } else {
                setError('An unexpected error occurred.');
            }
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };
    return { response, error, isLoading, request, status };
};
