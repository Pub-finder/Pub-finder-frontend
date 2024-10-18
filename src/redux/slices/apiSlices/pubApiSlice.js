import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPubs: builder.query({
            query: (geocode) => ({
                url: `/pub/getPubs/${geocode.latitude}/${geocode.longitude}/${geocode.radius}`,
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }),
        getPub: builder.query({
            query: (pubId) => ({
                url: `/pub/getPub/${pubId}`,
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }),
        searchForPub: builder.query({
            query: (term) => ({
                url: `/pub/searchPubs/${term}`,
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }),
        getAdditionalInfo: builder.query({
            query: (id) => ({
                url: `/pub/info/${id}`,
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }),
        getRatingForPub: builder.query({
            query: (id) => ({
                url: `/review/rating/${id}`,
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }),
    })
})

export const {
    useGetPubsQuery,
    useGetPubQuery,
    useSearchForPubQuery,
    useGetAdditionalInfoQuery,
    useGetRatingForPubQuery,
} = apiSlice