import axios from 'axios';

import { baseUrl } from '../constants';

/** Shared HTTP client: every request targets the API and sends the auth cookie. */
const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

/** Extracts a human readable message from an API (axios) error. */
export const getErrorMessage = (error, fallback = 'Something went wrong. Please try again.') =>
    error?.response?.data?.message ?? fallback;

export default api;
