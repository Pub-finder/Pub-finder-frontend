import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { signout, setCredentials } from "../authSlice";
import Cookies from 'js-cookie'
const apiUrl = process.env.REACT_APP_API_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: apiUrl,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("accessToken")
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
});


const baseQueryWithReauth = async (args, api, extraOptions) => {
    if (args.url.includes('null')) { // skipToken is not working in map.jsx so this is needed
        return { data: [] }
    }

    let result = await retry(() => baseQuery(args, api, extraOptions), 6);

    if (result?.error?.status == 403) {
        console.log('Sending refresh token');

        const token = Cookies.get('refresher-cookie');
        localStorage.setItem("accessToken", token);
        const refreshResult = await retryWithDelay(() => baseQuery('auth/refreshToken', api, extraOptions), 6);

        if (refreshResult?.data) {
            // Store new tokens
            localStorage.setItem("accessToken", refreshResult.data.accessToken);
            Cookies.set('refresher-cookie', refreshResult.data.refreshToken, { expires: 1 })

            // Retry the original query with the new token
            result = await retry(() => baseQuery(args, api, extraOptions), 6);
        } else {
            api.dispatch(signout());
            console.log(`Authentication failed, user logged out`);
            return { error: { status: 401, message: "Unauthorized" } };
        }
    }

    return result
}

const retry = async (fn, maxRetries) => {
    let retries = 0;
    while (retries < maxRetries) {
        const result = await fn();

        if (result?.error?.status == 500) {
            retries++;
            // Delay between retries that increase the delay time everytime
            await new Promise(resolve => setTimeout(resolve, retries * 1000));
            console.log(`Retrying request... Attempt ${retries}`);
            continue;
        }

        return result;
    }
    return { error: { status: 500, message: "Internal Server Error" } };;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})