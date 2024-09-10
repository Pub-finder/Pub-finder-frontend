import { useGetAdditionalInfoQuery } from "../../redux/slices/apiSlices/pubApiSlice";
import { skipToken } from '@reduxjs/toolkit/query/react';
import styles from './style.module.scss';
import Loader from "../../utils/loader/TextSpinnerLoader";
import InfoRender from "./InfoRender";

export default function Info({ pub, inView = false, mobile = false }) {
    const { data: info, isLoading, isError, isSuccess } = useGetAdditionalInfoQuery(inView ? pub.id : skipToken);

    console.log("info: ", info);

    return (
        <div className={styles.infoTab}>
            {!mobile && <hr/>}
            {isLoading && <Loader />}
            {isError && <p>There was an unexpected error</p>}
            {isSuccess && <InfoRender description={pub.description} info={info} /> }
        </div>
    );
}
