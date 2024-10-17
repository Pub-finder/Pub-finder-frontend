import { useState, useEffect } from "react";
import { Rating, Slider } from "@material-tailwind/react";
import { motion } from "framer-motion"
import styles from './style.module.scss';
import { useReviewMutation } from "../../redux/slices/apiSlices/reviewApiSlice";

export default function WriteReview({ toggleDialog, pub }) {
    const [reviewPub] = useReviewMutation();

    const [reviewInput, setReviewInput] = useState({
        rating: null,
        toiletsRating: null,
        serviceRating: null,
        volume: null,
        review: "",
    });

    const handleUserInput = (name, value) => {
        setReviewInput({
            ...reviewInput,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        const userId = localStorage.getItem("userId");
        const username = localStorage.getItem("username");
        console.log(reviewInput)
        try {

            if (reviewInput.rating != null) {
                await reviewPub({
                    pubId: pub.id,
                    userId: userId,
                    username: username,
                    rating: reviewInput.rating,
                    toilets: reviewInput.toiletsRating,
                    service: reviewInput.serviceRating,
                    volume: reviewInput.volume,
                    review: reviewInput.review
                });
            }

            toggleDialog();
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div
            className={styles.writeReviewContainer}
        >
            <h1>Make your review for {pub.name}</h1>

            <div className={styles.ratingSection}>
                Overall Rating:
                <Rating
                    unratedColor="blue"
                    ratedColor="blue"
                    value={reviewInput.rating}
                    onChange={(rating) => handleUserInput("rating", rating)}
                />
            </div>

            <div className={styles.ratingSection}>
                Toilets Rating:
                <Rating
                    unratedColor="blue"
                    ratedColor="blue"
                    value={reviewInput.toiletsRating}
                    onChange={(rating) => handleUserInput("toiletsRating", rating)}
                />
            </div>

            <div className={styles.ratingSection}>
                Service Rating:
                <Rating
                    unratedColor="blue"
                    ratedColor="blue"
                    value={reviewInput.serviceRating}
                    onChange={(rating) => handleUserInput("serviceRating", rating)}
                />
            </div>

            <div className={styles.ratingSection}>
                Volume
                <Slider
                    color="blue"
                    size="md"
                    value={50}
                    onChange={(event) => handleUserInput("volume", Math.floor(event.target.value))}
                />
            </div>

            <textarea
                id="review"
                name="review"
                placeholder="Write your review here..."
                maxLength="250"
                value={reviewInput.review || ''}
                onChange={(event) => handleUserInput("review", event.target.value)}
            />


            <div className={styles.buttonContainer}>
                <motion.button
                    className={styles.cancelButton}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleDialog}
                >
                    Cancel
                </motion.button>
                <motion.button
                    className={styles.submitButton}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSubmit()}
                >
                    Submit
                </motion.button>
            </div>
        </div>
    );
}