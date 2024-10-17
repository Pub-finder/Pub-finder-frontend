import { useRef } from 'react';
import { useGetReviewsForPubQuery } from "../../redux/slices/apiSlices/reviewApiSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { MdOutlineReviews } from "react-icons/md";
import Loader from "../../utils/loader/TextSpinnerLoader";
import styles from './style.module.scss';
import { motion } from "framer-motion"
import WriteReview from "../writeReview/WriteReview";
import Review from "../Review";

export default function PubReviews({ pub }) {
    const { data: reviews = [], isSuccess, isLoading, isError } = useGetReviewsForPubQuery(pub ? pub.id : skipToken);

    const body = useRef(null);
    const dialogRef = useRef(null);

    function toggleDialog(event, info) {
        if (!dialogRef.current) {
            return
        }
        dialogRef.current.hasAttribute("open") ? dialogRef.current.close() : dialogRef.current.showModal()
    }

    return (
        <div ref={body} className={styles.pubReviewsContainer}>
            <hr/>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                console.log("make review");
                toggleDialog();
              }}
            >
                <MdOutlineReviews size={20} className="mr-2" />
                Write a review
            </motion.button>
            {isLoading && <Loader />}
            {isError && <p className={styles.errorMsg}>Unable to display reviews</p>}
            {(isSuccess && reviews.length === 0) && (
                <p className={styles.errorMsg}>There is no reviews for this pubs yet.</p>
            )}
            {isSuccess && (
                reviews.map((review) => (
                    <Review key={review.id} review={review} />
                ))
            )}

            <dialog
                ref={dialogRef}
                onClick={(e) => {
                    if (e.currentTarget === e.target) {
                        toggleDialog();
                    }
                }}
            >
                <WriteReview toggleDialog={toggleDialog} pub={pub} />
            </dialog>
        </div>
    );
}