import { useGetUserReviewsQuery } from "../../redux/slices/apiSlices/reviewApiSlice";
import Loader from "../../utils/loader/TextSpinnerLoader";
import { skipToken } from "@reduxjs/toolkit/query";
import styles from './style.module.scss';
import UserReview from "./userReview/UserReview";

export default function UserReviews() {
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");
    const { data: userReviews = [], isLoading, isError, isSuccess } = useGetUserReviewsQuery(userId ? userId : skipToken);

    return (
        <div className={styles.userReviews}>
            <h1>Reviews by {username}</h1>
            {isLoading && <Loader />}
            {isError && <p className={styles.errorMsg}>There was an unexpected error. Unable to display Reviews.</p>}
            {isSuccess && userReviews.length === 0 && (
                <p className={styles.errorMsg}>You have not made any reviews yet.</p>
            )}
            {isSuccess && (
                <div className={styles.reviewsGrid}>
                    {userReviews.map((review) => (
                        <UserReview review={review} />
                    ))}
                </div>
            )}
        </div>
    );
}
