import { useGetPubQuery } from "../redux/slices/apiSlices/pubApiSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import Loader from "../utils/loader/TextSpinnerLoader";
import BarTab from "../barTab/barTab";

export default function VisitedPub({pubId, userId}) {
    const { data: pub, isLoading, isError, isSuccess } = useGetPubQuery(pubId ? pubId : skipToken);

    return (
        <>
            {isLoading && <Loader />}
            {isError && <p className={styles.errorMsg}>There was an unexpected error. Unable to display Pub.</p>}
            {isSuccess &&
                <BarTab
                    pub={pub}
                    userId={userId}
                    visited={true}
                    isSearchedPub={false}
                />
            }
        </>
    );
}