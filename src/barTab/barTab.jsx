import { React, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion"

import { useDispatch } from "react-redux";
import { focusOnPub } from "../redux/slices/pubSlice";

import BasicInfo from "./basicInfo/basicInfo";
import MoreInfo from "./moreInfo/moreInfo";
import styles from './style.module.scss';

export default function BarTab({ pub, user = false, visited = false, isSearchedPub = false, mobile = false }) {
  const dispatch = useDispatch();
  const [expandedPubId, setExpandedPubId] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const toggleExpanded = (pubId) => {
    setExpandedPubId(expandedPubId === pubId ? null : pubId);
  };

  return (
    <div
      className={styles.barTab}
      onClick={() => {
        dispatch(focusOnPub([pub.lat, pub.lng]))
        isSearchedPub = false
      }}
      tabIndex="0"
      key={pub.id}
    >
        <BasicInfo pub={pub} user={user} visited={visited} />
        <Buttons showInfo={showInfo} showReviews={showReviews} setShowInfo={setShowInfo} setShowReviews={setShowReviews} />
        {showInfo && <MoreInfo pub={pub} inView={showInfo} />}
        {showReviews && <p> under construction </p>}
    </div>
  );
}

function Buttons({ showReviews, setShowReviews, showInfo, setShowInfo }) {
    return (
        <div className={styles.buttons}>
            <div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setShowInfo(!showInfo);
                    setShowReviews(false);
                  }}
                >
                  More Info
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setShowReviews(!showReviews);
                    setShowInfo(false);
                  }}
                >
                  Reviews
                </motion.button>
            </div>
        </div>
    );
}