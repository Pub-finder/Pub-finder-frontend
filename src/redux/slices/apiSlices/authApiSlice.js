import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/user/login',
                method: 'POST',
                body: {
                    'username': credentials.username,
                    'password': credentials.password,
                },
                headers: {
                  "Content-Type": "application/json",
                },
            })
        }),
        signup: builder.mutation({
            query: credentials => ({
                url: '/user/register',
                method: 'POST',
                body: {
                    'firstname': credentials.firstname,
                    'lastname': credentials.lastname,
                    'username': credentials.username,
                    'email': credentials.email,
                    'password': credentials.password,
                },
                headers: {
                  "Content-Type": "application/json",
                },
            }),
            transformResponse: (response, meta) => {
                console.log("response: ",response);
                console.log("meta: ", meta);
                if (meta?.response?.status == 201) {
                    return {
                        userId: meta.response.headers.get('X-User-Id'),
                        accessToken: meta.response.headers.get('X-ACCESS-TOKEN'),
                        refreshToken: meta.response.headers.get('X-REFRESH-TOKEN'),
                        message: 'User registered successfully',
                    };
                }
            }
        }),
        logout: builder.mutation({
            query: credentials => ({
                url: '/user/logout',
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                },
            })
        }),
    })
})

export const {
    useLoginMutation,
    useSignupMutation,
    useLogoutMutation,
} = apiSlice