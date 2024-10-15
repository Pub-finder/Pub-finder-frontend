import { useGetVisitedPubsQuery } from "../redux/slices/apiSlices/visitApiSlice";
import BarTab from "../barTab/barTab";
import { skipToken } from "@reduxjs/toolkit/query";
import Loader from "../utils/loader/TextSpinnerLoader";
import styles from './style.module.scss';
import { formatTimestamp } from "../utils/utils";
import { mockPubs } from "../utils/mockData";

export default function VisitedPubs() {
    const userId = localStorage.getItem("userId");
    const { data: visitedPubs = [], isLoading, error, isError, isSuccess } = useGetVisitedPubsQuery(userId ? userId : skipToken)

    return (
        <div className={styles.visitedPubs}>
            <h2>{visitedPubs?.user?.username} Visited Pubs</h2>
            {isLoading && <Loader />}
            {isError && error?.originalStatus != 404 && <p className={styles.errorMsg}>There was an unexpected error. Unable to display Visited Pubs.</p>}
            {(isSuccess && visitedPubs.length === 0) || error?.originalStatus == 404 && <p className={styles.errorMsg}>You have not visited any pubs yet.</p>}
            {isSuccess && (
                <div className={styles.pubsGrid}>
                    {visitedPubs.map((pub) => (
                        <div key={pub.id}>
                            <BarTab
                                pub={pub}
                                user={userId}
                                visited={true}
                                refetch={null} // Consider changing to a proper function if required
                                isSearchedPub={false}
                            />
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