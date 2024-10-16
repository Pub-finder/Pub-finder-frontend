import { apiSlice } from "./apiSlice";

export const visitedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        visit: builder.mutation({
            query: (visitData) => ({
                url: `/visited/save`,
                method: 'POST',
                body: {
                    'userId': visitData.userId,
                    'pubId': visitData.pubId,
                    'username': visitData.username,
                },
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }),
        deleteVisit: builder.mutation({
            query: ({ pubId, userId }) => ({
                url: `/visited/delete/${userId}/${pubId}`,
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }),
        getVisitedPubs: builder.query({
            query: (userId) => ({
                url: `/visited/visits/${userId}`,
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }),
    })
})

export const {
    useVisitMutation,
    useDeleteVisitMutation,
    useGetVisitedPubsQuery
} = apiSlice