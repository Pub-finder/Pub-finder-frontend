import { apiSlice } from "./apiSlice";

export const reviewApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        review: builder.mutation({
            query: (review) => ({
                url: `/review/save`,
                method: 'POST',
                body: {
                    'pubId': review.pubId,
                    'userId': review.userId,
                    'username': review.username,
                    'rating': review.rating,
                    'toilets': review.toilets,
                    'service': review.service,
                    'volume': review.volume,
                    'review': review.review
                },
                headers: {
                  "Content-Type": "application/json",
                },
            })
        }),
        deleteReview: builder.mutation({
            query: ({ reviewId }) => ({
                url: `/review/delete/${reviewId}`,
                method: 'DELETE',
                headers: {
                  "Content-Type": "application/json",
                },
            })
        }),
        updateReview: builder.mutation({
            query: ({ id, review }) => ({
                url: `/review/edit`,
                method: 'PUT',
                body: {
                    'id': id,
                    'review': review.review,
                    'rating': review.rating,
                    'toilets': review.toiletsRating,
                    'volume': review.volume,
                    'service': review.serviceRating,
                },
                headers: {
                  "Content-Type": "application/json",
                },
            })
        }),
        getReviewsForPub: builder.query({
            query: (pubId) => ({
                url: `/review/reviews/pub/${pubId}`,
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }),
        getUserReviews: builder.query({
            query: (userId) => ({
                url: `/review/reviews/user/${userId}`,
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }),
    })
})

export const {
    useReviewMutation,
    useDeleteReviewMutation,
    useUpdateReviewMutation,
    useGetReviewsForPubQuery,
    useGetUserReviewsQuery
} = apiSlice