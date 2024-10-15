import { React, useState } from "react";
import { useDeleteVisitMutation, useVisitMutation } from "../../redux/slices/apiSlices/visitApiSlice";
import { correctEncoding, formatLocation, formatOpeningHoursForToday } from "../../utils/utils";

import { WiTime1 } from "react-icons/wi";
import { GoLocation } from "react-icons/go";
import { BiSolidBeenHere } from "react-icons/bi";

import styles from './style.module.scss';

export default function BasicInfo({ pub, userId = null, visited = false }) {
    const [deleteVisit] = useDeleteVisitMutation();
    const [visitedPub] = useVisitMutation();
    const [hasVisited, setHasVisited] = useState(visited);

    const handleVisit = async () => {
        if (hasVisited) {
            try {
                await deleteVisit({
                    pubId: pub.id,
                    userId: userId
                }).unwrap();
                console.log(`User ${user} has un visited Pub ${pub.name}`)
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                await visitedPub({
                    pubId: pub.id,
                    userId: userId
                }).unwrap();
                console.log(`User ${user} has visited Pub ${pub.name}`)
            } catch (err) {
                console.log(err)
            }
        }
        setHasVisited(!hasVisited);
    };

    return (
        <div className={styles.basic}>
          <div className={styles.titleAndRating}>
            <h5>
              {correctEncoding(pub.name)}
            </h5>
            {pub.rating != 0 &&
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clip-rule="evenodd"></path>
                </svg>
                {pub.rating}
              </p>
            }
          </div>

          <div className={styles.basicInfo}>
            <li className={styles.price}>
              <p>
                {pub.price}
              </p>
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
        </div>
    );
}