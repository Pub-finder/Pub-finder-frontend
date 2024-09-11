import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { signout, setCredentials } from "../authSlice";
import Cookies from 'js-cookie'
const apiUrl = process.env.REACT_APP_API_URL;

const baseQuery = retry(fetchBaseQuery({
    baseUrl: apiUrl,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("accessToken")
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
}), {maxRetries: 8, });

const reauthBaseQuery = retry(fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = Cookies.get('refresher-cookie')

        if (token) {
            headers.set('Authorization', `${token}`)
        }
        return headers
    }
}), {maxRetries: 8, });

const baseQueryWithReauth = async (args, api, extraOptions) => {
    if (args.url.includes('null')) { // skipToken is not working in map.jsx so this is needed
        return { data: [] }
    }

    let result = await baseQuery(args, api, extraOptions);

    console.log(result);
    /*
    if (result?.error?.status != "FETCH_ERROR") {
        retry.fail(result.error);
    }
    */
    if (result?.error?.status == 403) {
        console.log('sending refresh token')

        const refreshResult = await reauthBaseQuery('user/refreshToken', api, extraOptions);

        console.log("refreshResult: ", refreshResult)

        if (refreshResult?.data) {
            // store new token
            localStorage.setItem("accessToken", refreshResult.data.accessToken);
            Cookies.set('refresher-cookie', refreshResult.data.refreshToken, { expires: 1 })

            // retry orginal query with new token
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(signout())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})