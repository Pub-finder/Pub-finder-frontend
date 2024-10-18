import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { focusOnPub } from "@redux/slices/pubSlice";
import { useGetVisitedPubsQuery, useGetPubsQuery } from "@redux/slices/apiSlices/pubApiSlice";
import { skipToken } from '@reduxjs/toolkit/query';

import styles from './style.module.scss';
import BarTab from "../barTab/mobile/barTabMobile";
import Loader from "@utils/loader/TextSpinnerLoader";

export default function BottomBar() {
    const geocode = useSelector((state) => state.pubs.geocode);
    const { data: pubs = [], isLoading, isError, isSuccess } = useGetPubsQuery(geocode ? geocode : skipToken);
    const searchedPub = useSelector((state) => state.pub.pub);

    return (
        <div className={styles.bottomBar}>
            {isLoading && <Loader />}
            {isError && <p>There was an unexpected error.</p>}
            {searchedPub.id && (
                <BarTab key={searchedPub.id} pub={searchedPub} isSearchedPub={true} />
            )}
            {isSuccess && pubs.length === 0 && <p>No pubs found in this area.</p>}
            {isSuccess && pubs.map((pub) => (
                <BarTab key={pub.id} pub={pub} isSearchedPub={false} />
            ))}
        </div>
    );
}

