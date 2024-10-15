import { React, useEffect, useState } from "react";
import styles from './style.module.scss';
import { useSelector } from "react-redux";
import BarTab from "../barTab/barTab";
import { useGetPubsQuery } from "../redux/slices/apiSlices/pubApiSlice";
import { useGetVisitedPubsQuery } from "../redux/slices/apiSlices/visitApiSlice";
import { skipToken } from '@reduxjs/toolkit/query';
import Loader from "../utils/loader/TextSpinnerLoader";

export default function SideBar() {
  const geocode = useSelector((state) => state.pubs.geocode);
  const { data: pubs = [], isLoading, isError, isSuccess } = useGetPubsQuery(geocode ? geocode : skipToken);
  const searchedPub = useSelector((state) => state.pub.pub);

  const user = localStorage.getItem("userId");
  const [getVisitedPubs, setGetVisitedPubs] = useState(false);
  const { data: visitedPubs, refetch } = useGetVisitedPubsQuery(getVisitedPubs ? user : skipToken)

  useEffect(() => {
    if (user) {
      setGetVisitedPubs(true)
    }
  }, [user])

  const visited = (pub) => {
    if (!visitedPubs) {
      return false;
    }
    return visitedPubs.some((visitedPub) => visitedPub.pubDto.id === pub.id);
  };

  return (
    <div className={styles.sideBar}>
        {isLoading && <Loader />}
        {isError && <p>There was an unexpected error.</p>}
        {searchedPub.id && (
            <div className="snap-center">
                <BarTab
                key={searchedPub.id}
                pub={searchedPub}
                user={user}
                visited={visited(searchedPub)}
                refetch={refetch}
                isSearchedPub={true}
                />
            </div>
        )}
        {isSuccess && pubs.length === 0 && <p>No pubs found in this area.</p>}
        {isSuccess && pubs.map((pub) => (
            <div className="snap-center" key={pub.id}>
                {searchedPub.id != pub.id &&
                    <BarTab
                        pub={pub}
                        user={user}
                        visited={visited(pub)}
                        refetch={refetch}
                        isSearchedPub={false}
                    />
                }
            </div>
        ))}
    </div>
  );
}
