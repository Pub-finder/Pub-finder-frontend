import { useState } from 'react';
import { Rating } from "@material-tailwind/react";
import styles from './style.module.scss';
import { formatTimestamp } from "../utils/utils";
import { motion } from "framer-motion"

export default function Review({ review }) {
    const isMoreToShow = review.toilets !== 0 || review.service !== 0 || review.volume !== null || review.review.length !== 0;
    const [showMore, setShowMore] = useState(false);

    return (
        <div className={styles.reviewContainer}>
            <div className={styles.header}>
                <h2>{review.username}</h2>
                <p>{formatTimestamp(review.reviewDate)}</p>
            </div>
            <ReviewRating label="Rating" value={review.rating} />

            {showMore && (
                <>
                    {review.toilets !== 0 && <ReviewRating label="Toilets" value={review.toilets} />}
                    {review.service !== 0 && <ReviewRating label="Service" value={review.service} />}
                    {review.volume !== null && (
                        <p className={styles.volumeText} style={{ color: "blue-gray" }}>
                            Volume: {review.volume}
                        </p>
                    )}
                    {review.review.length !== 0 && (
                        <p className={styles.reviewText}>
                            {review.review}
                        </p>
                    )}
                </>
            )}

            {isMoreToShow && (
                <motion.p
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        setShowMore(!showMore);
                    }}
                    className={styles.showMore}
                >
                    {showMore ? "Show less" : "Show more"}
                </motion.p>
            )}
        </div>
    );
}

function ReviewRating({ label, value }) {
    return (
        <div className={styles.reviewRating}>
            {label}:
            <Rating value={value} readonly />
        </div>
    );
}