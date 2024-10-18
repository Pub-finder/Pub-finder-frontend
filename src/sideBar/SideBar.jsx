import { React, useEffect, useState } from "react";
import styles from './style.module.scss';
import { useSelector } from "react-redux";
import Pub from "@pub/Pub";
import { useGetPubsQuery } from "@redux/slices/apiSlices/pubApiSlice";
import { useGetVisitedPubsQuery } from "@redux/slices/apiSlices/visitApiSlice";
import { skipToken } from '@reduxjs/toolkit/query';
import Loader from "@utils/loader/TextSpinnerLoader";

export default function SideBar() {
  const geocode = useSelector((state) => state.pubs.geocode);
  const { data: pubs = [], isLoading, isError, isSuccess } = useGetPubsQuery(geocode ? geocode : skipToken);
  const searchedPub = useSelector((state) => state.pub.pub);

  const authenticated = useSelector((state) => state.auth.authenticated);
  const userId = localStorage.getItem("userId");
  const { data: visitedPubs = [] } = useGetVisitedPubsQuery(authenticated ? userId : skipToken);

  const visited = (pub) => {
    if (visitedPubs.length === 0) {
      return false;
    }
    return visitedPubs.some((visitedPub) => visitedPub.pubId === pub.id);
  };

  return (
    <div className={styles.sideBar}>
        {isLoading && <Loader />}
        {isError && <p className={styles.errorMsg}>There was an unexpected error.</p>}
        {searchedPub.id && (
            <div className="snap-center">
                <Pub
                key={searchedPub.id}
                pub={searchedPub}
                userId={userId}
                visited={visited(searchedPub)}
                isSearchedPub={true}
                />
            </div>
        )}
        {isSuccess && pubs.length === 0 && <p>No pubs found in this area.</p>}
        {isSuccess && pubs.map((pub) => (
            <div className="snap-center" key={pub.id}>
                {searchedPub.id != pub.id &&
                    <Pub
                        pub={pub}
                        userId={userId}
                        visited={visited(pub)}
                        isSearchedPub={false}
                    />
                }
            </div>
        ))}
    </div>
  );
}
