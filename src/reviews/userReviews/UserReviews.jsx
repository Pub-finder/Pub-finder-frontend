import { useGetUserReviewsQuery } from "../../redux/slices/apiSlices/reviewApiSlice";
import { useGetPubQuery } from "../../redux/slices/apiSlices/pubApiSlice";
import Loader from "../../utils/loader/TextSpinnerLoader";
import { skipToken } from "@reduxjs/toolkit/query";
import styles from './style.module.scss';
import Review from "../Review";

export default function UserReviews() {
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");
    const { data: userReviews = [], isLoading, isError, isSuccess } = useGetUserReviewsQuery(userId ? userId : skipToken);

    return (
        <div className={styles.userReviews}>
            <h2>Reviews by {username}</h2>
            {isLoading && <Loader />}
            {isError && <p className={styles.errorMsg}>There was an unexpected error. Unable to display Reviews.</p>}
            {isSuccess && userReviews.length === 0 && (
                <p className={styles.errorMsg}>You have not made any reviews yet.</p>
            )}
            {isSuccess && (
                <div className={styles.pubsGrid}>
                    {userReviews.map((review) => (
                        <Asd review={review} />
                    ))}
                </div>
            )}
        </div>
    );
}

function Asd({review}) {
    const { data: pub, isLoading, isError, isSuccess } = useGetPubQuery(review ? review.pubId : skipToken);

    return (
        <div key={review.id}>
            {isLoading && <Loader />}
            {isError && <p className={styles.errorMsg}>There was an unexpected error. Unable to display Reviewed Pub.</p>}
            {isSuccess && (
                <p>{pub.name}</p>
            )}
            <Review key={review.id} review={review} />
        </div>
    )
}