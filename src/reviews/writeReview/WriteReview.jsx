import { useState, useEffect } from "react";
import { Rating, Slider } from "@material-tailwind/react";
import { motion } from "framer-motion"

export default function WriteReview({ toggleDialog, pub }) {
    const [reviewInput, setReviewInput] = useState({
        rating: null,
        toiletsRating: null,
        serviceRating: null,
        volume: 50,
        review: "",
    });

    const setVolumeLevel = (e) => {
        const value = e.target.value;
        setReviewInput({
            ...reviewInput,
            volume: Math.floor(value),
        });
        console.log(reviewInput)
    };

    const handleUserInput = (name, value) => {
        setReviewInput({
            ...reviewInput,
            [name]: value,
        });
        console.log(reviewInput)
    };

    return (
        <div
            className="bg-blue-gray-900"
        >
            <h1 className="text-white">Make your review for {pub.name}</h1>
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 font-bold text-white">
                    Overall Rating:
                    <Rating
                        unratedColor="blue"
                        ratedColor="blue"
                        value={reviewInput.rating}
                        onChange={(rating) => handleUserInput("rating", rating)}
                    />
                </div>
                <div className="flex items-center gap-2 font-bold text-white">
                    Toilets Rating:
                    <Rating
                        unratedColor="blue"
                        ratedColor="blue"
                        value={reviewInput.toiletsRating}
                        onChange={(rating) => handleUserInput("toiletsRating", rating)}
                    />
                </div>
                <div className="flex items-center gap-2 font-bold text-white">
                    Service Rating:
                    <Rating
                        unratedColor="blue"
                        ratedColor="blue"
                        value={reviewInput.serviceRating}
                        onChange={(rating) => handleUserInput("serviceRating", rating)}
                    />
                </div>

                <div className="flex items-center gap-2 font-bold text-white">
                    Volume
                    <Slider
                        color="blue"
                        size="md"
                        value={reviewInput.volume}
                        onChange={setVolumeLevel}
                    />
                </div>

                <form
                    color="gray"
                    label="Review"
                    className="text-white"
                    onChange={(e) => {
                        setReviewInput({
                            ...reviewInput,
                            "review": e.target.value,
                        });
                        console.log(reviewInput)
                     }}
                />
            </div>
            <div>
                <motion.button
                    variant="text"
                    color="red"
                    onClick={toggleDialog}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </motion.button>
                <motion.button color="green" onClick={() => handleSubmit()}>
                    <span>Submit</span>
                </motion.button>
            </div>
        </div>
    );
}