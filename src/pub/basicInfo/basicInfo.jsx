import { React, useState } from "react";
import { useDeleteVisitMutation, useVisitMutation } from "@redux/slices/apiSlices/visitApiSlice";
import { correctEncoding, formatLocation, formatOpeningHoursForToday } from "@utils/utils";
import { Rating } from "@material-tailwind/react";

import { WiTime1 } from "react-icons/wi";
import { GoLocation } from "react-icons/go";
import { BiSolidBeenHere } from "react-icons/bi";
import { CiStar } from "react-icons/ci";

import styles from './style.module.scss';

export default function BasicInfo({ pub, userId = null, visited = false, avgRating = null}) {
    const [deleteVisit] = useDeleteVisitMutation();
    const [visitedPub] = useVisitMutation();
    const [hasVisited, setHasVisited] = useState(visited);

    const handleVisit = async () => {
        const username = localStorage.getItem("username");

        try {
            if (hasVisited) {
                await deleteVisit({
                    pubId: pub.id,
                    userId: userId
                }).unwrap();
                console.log(`User ${username} has un visited Pub ${pub.name}`) // add dialog window
            } else {
                await visitedPub({
                    pubId: pub.id,
                    userId: userId,
                    username: username
                }).unwrap();
                console.log(`User ${username} has visited Pub ${pub.name}`) // add dialog window
            }
            setHasVisited(!hasVisited);
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className={styles.basicInfoContainer}>
            <h5>
                {correctEncoding(pub.name)}
            </h5>

            {avgRating && (
                <li className={styles.rating}>
                    <Rating value={avgRating} readonly />
                </li>
            )}

            <li className={styles.priceAndBeenHere}>
                <span>
                    {pub.price}
                </span>
                { userId && (
                    <BiSolidBeenHere
                        size={25}
                        onClick={handleVisit}
                        className={hasVisited ? styles.hasVisited : styles.hasNotVisited}
                    />
                )}
            </li>

            <li className={styles.info}>
              <WiTime1 size={20} />
              <p>
                {formatOpeningHoursForToday(pub.openingHours)}
              </p>
            </li>

            <li className={styles.info}>
              <GoLocation size={20} />
              <p>
                {formatLocation(pub.location)}
              </p>
            </li>
        </div>
    );
}