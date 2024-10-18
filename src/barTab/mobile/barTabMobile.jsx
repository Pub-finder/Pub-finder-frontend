import { React, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer";

import { useDispatch } from "react-redux";
import { focusOnPub } from "../../redux/slices/pubSlice";
import styles from './style.module.scss';
import { useDeleteVisitMutation } from "../../redux/slices/apiSlices/visitApiSlice";
import { useVisitMutation } from "../../redux/slices/apiSlices/visitApiSlice";

import BasicInfo from "../basicInfo/basicInfo";
import MoreInfo from "../moreInfo/MoreInfo";

export default function BarTab({ pub, user = false, visited, refetch, isSearchedPub = false }) {
  const dispatch = useDispatch();
  const [expandedPubId, setExpandedPubId] = useState(null);
  const [hasVisited, setHasVisited] = useState(false);
  const [visitedPub] = useVisitMutation();
  const [deleteVisit] = useDeleteVisitMutation();
  const [showInfo, setShowInfo] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const toggleExpanded = (pubId) => {
    setExpandedPubId(expandedPubId === pubId ? null : pubId);
  };

  return (
      <div className={styles.barContainer}>
        <div
          className={styles.barTab}
          onClick={() => {
            dispatch(focusOnPub([pub.lat, pub.lng]))
            isSearchedPub = false
          }}
          tabIndex="0"
          key={pub.id}
        >
            <BasicInfo pub={pub} user={user} />
        </div>

        <div className={styles.barTab} ref={ref}>
            <MoreInfo pub={pub} mobile={true} inView={inView} />
        </div>
      </div>
  );
}
