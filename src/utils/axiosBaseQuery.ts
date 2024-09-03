import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

interface AxiosBaseQueryArgs {
    url: string;
    method: AxiosRequestConfig['method'];
    data?: any;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL || '';

const axiosBaseQuery: BaseQueryFn<AxiosBaseQueryArgs, unknown, unknown> = async (
    { url, method, data }, // args: includes url, method, and data
    api, // api: includes things like dispatch, getState
    extraOptions // extraOptions: any additional options
) => {
    try {
        const token = Cookies.get('dtr-token');
        const result = await axios({
            url: BASE_URL + url,
            method,
            data,
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        });

        return { data: result.data };
    } catch (error) {
        const axiosError = error as AxiosError;

        return {
            error: {
                status: axiosError.response?.status,
                data: axiosError.response?.data || axiosError.message,
            },
        };
    }
};

export default axiosBaseQuery;
