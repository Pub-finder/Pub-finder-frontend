import { useGetAdditionalInfoQuery } from "../../redux/slices/apiSlices/pubApiSlice";
import { skipToken } from '@reduxjs/toolkit/query/react';
import styles from './style.module.scss';
import Loader from "../../utils/loader/TextSpinnerLoader";
import { FaGlobe, FaToilet, FaChair } from "react-icons/fa";
import { PiWheelchairFill } from "react-icons/pi";
import { GrCheckmark } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";
import { ImSpinner2 } from "react-icons/im";
import { Rating } from "@material-tailwind/react";

export default function MoreInfo({ pub, inView = false, mobile = false, avgRatings = null }) {
    const { data: info, isLoading, isError, isSuccess } = useGetAdditionalInfoQuery(inView ? pub.id : skipToken);

    const AccessibilityInfoItem = ({ icon: Icon, label, value }) => (
        <li>
            <Icon />
            <span>
                {label}: {value ? ' Yes' : ' No'}
            </span>
        </li>
    );

    return (
        <div className={styles.moreInfoContainer}>
            {!mobile && <hr/>}

            {avgRatings?.toiletRating !== 0 && (
                <li className={styles.avgRating}>
                    Toilets:
                    <Rating value={avgRatings.toiletRating} readonly />
                </li>

            )}
            {avgRatings?.serviceRating !== 0 && (
                <li className={styles.avgRating}>
                    Toilets:
                    <Rating value={avgRatings.serviceRating} readonly />
                </li>
            )}
            {avgRatings?.volume !== null && (
                <li className={styles.avgRating}>
                    Volume: {avgRatings.volume[0]}{avgRatings.volume.substring(1, avgRatings.serviceRating.length).toLowerCase()}
                </li>
            )}

            {isLoading && <Loader />}
            {isError && <p>There was an unexpected error</p>}
            {isSuccess && (
                <>
                    {pub.description &&
                        <p>{pub.description}</p>
                    }

                    <li>
                        <FaToilet />
                        {info.washroom ? <GrCheckmark /> : <RxCross1 />}
                    </li>

                    {info.website && (
                        <li>
                            <FaGlobe />
                            <a href={info.website} target="_blank" rel="noopener noreferrer">
                                {info.website}
                            </a>
                        </li>
                    )}

                    {info.outDoorSeating && (
                        <li>
                            <FaChair />
                            <span>Outdoor Seating: {info.outDoorSeating ? ' Yes' : ' No'}</span>
                        </li>
                    )}

                    <AccessibilityInfoItem
                        icon={PiWheelchairFill}
                        label="Accessible Seating"
                        value={info.accessibility.accessibleSeating}
                    />
                    <AccessibilityInfoItem
                        icon={PiWheelchairFill}
                        label="Accessible Entrance"
                        value={info.accessibility.accessibleEntrance}
                    />
                    <AccessibilityInfoItem
                        icon={PiWheelchairFill}
                        label="Accessible Parking"
                        value={info.accessibility.accessibleParking}
                    />
                </>
            )}
        </div>
    );
}

