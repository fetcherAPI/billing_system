import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TOKEN } from '../lib/const/localstorage';

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(TOKEN) || '';
            if (token) {
                headers.set('Authorization', token);
            }
            return headers;
        },
    }),
    endpoints: (builder) => {
        console.log(builder);
        return {};
    },
});
