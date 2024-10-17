import { useState, useRef } from "react";
import { useGetPubQuery } from "../../../redux/slices/apiSlices/pubApiSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import styles from './style.module.scss';
import Review from "../../Review";
import Loader from "../../../utils/loader/TextSpinnerLoader";
import { motion } from "framer-motion"
import WriteReview from "../../writeReview/WriteReview";
import BarTab from "../../../barTab/barTab";

export default function UserReview({review}) {
    const { data: pub, isLoading, isError, isSuccess } = useGetPubQuery(review ? review.pubId : skipToken);

    const body = useRef(null);
    const dialogRef = useRef(null);

    function toggleDialog(event, info) {
        if (!dialogRef.current) {
            return
        }
        dialogRef.current.hasAttribute("open") ? dialogRef.current.close() : dialogRef.current.showModal()
    }

    return (
        <div ref={body} className={styles.userReview} key={review.id}>
            {isLoading && <div className={styles.loaderContainer}> <Loader /> </div>}
            {isError && <p className={styles.errorMsg}>There was an unexpected error. Unable to display Reviewed Pub.</p>}
            {isSuccess && (
                <>
                    <h5>{pub.name}</h5>
                </>
            )}
            <Review key={review.id} review={review} />
            {isSuccess &&
                <>
                 <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={() => {
                         console.log("edit review");
                         toggleDialog();
                     }}
                 >
                     Edit Review
                 </motion.button>

                <dialog
                    ref={dialogRef}
                    onClick={(e) => {
                        if (e.currentTarget === e.target) {
                            toggleDialog();
                        }
                    }}
                >
                    <WriteReview toggleDialog={toggleDialog} review={review} pub={pub} />
                </dialog>
                </>
            }
        </div>
    )
}