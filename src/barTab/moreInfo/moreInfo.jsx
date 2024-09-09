import { useGetAdditionalInfoQuery } from "../../redux/slices/apiSlices/pubApiSlice";
import styles from './style.module.scss';
import Loader from "../../utils/loader/TextSpinnerLoader";
import InfoRender from "./InfoRender";

export default function Info({ pub, inView, mobile = false }) {
    const { data: info, isLoading, isError, isSuccess } = useGetAdditionalInfoQuery(pub.id, {
        enabled: inView
    });

    return (
        <div className={styles.infoTab}>
            {!mobile && <hr/>}
            {isLoading && <Loader />}
            {isError && <p>There was an unexpected error</p>}
            {isSuccess && <InfoRender description={pub.description} info={info} /> }
        </div>
    );
}
