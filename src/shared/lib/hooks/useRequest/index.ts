import { useState } from 'react';

export const useRequest = <T = undefined, P = undefined>() => {
    const [response, setResponse] = useState<P | null>(null);
    const [error, setError] = useState<string>('');
    const [status, setStatus] = useState<number | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const request = async (
        params: T,
        requestService: (params: T) => Promise<{ data: P; status: number }>
    ) => {
        setIsLoading(true);
        setError('');
        try {
            const res = await requestService(params);
            setResponse(res?.data ?? null);
            setStatus(res?.status);
        } catch (err) {
            setError(`${err}`);
            setResponse(null);
        } finally {
            setIsLoading(false);
        }
    };
    return { response, error, isLoading, request, status };
};
