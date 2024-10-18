import { useGetVisitedPubsQuery } from "@redux/slices/apiSlices/visitApiSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import Loader from "@utils/loader/TextSpinnerLoader";
import styles from './style.module.scss';
import { formatTimestamp } from "@utils/utils";
import VisitedPub from "./VisitedPub";

export default function VisitedPubs() {
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");
    const { data: visitedPubs = [], isLoading, isError, isSuccess } = useGetVisitedPubsQuery(userId ? userId : skipToken);

    return (
        <div className={styles.visitedPubs}>
            <h3>Pubs that {username} has visited</h3>
            {isLoading && <Loader />}
            {isError && <p className={styles.errorMsg}>There was an unexpected error. Unable to display Visited Pubs.</p>}
            {(isSuccess && visitedPubs.length === 0) && (
                <p className={styles.errorMsg}>You have not visited any pubs yet.</p>
            )}
            {isSuccess && (
                <div className={styles.pubsGrid}>
                    {visitedPubs.map((pub) => (
                        <div key={pub.id}>
                            <VisitedPub pubId={pub.pubId} userId={pub.userId} />
                            <p className={styles.date}>
                                Visited on: {formatTimestamp(pub.visitedDate)}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}