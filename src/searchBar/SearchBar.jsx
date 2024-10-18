import { React, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useSearchForPubQuery, useGetPubQuery, useGetPubsQuery } from "@redux/slices/apiSlices/pubApiSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { correctEncoding } from "@utils/utils";
import { setPub } from "@redux/slices/pubSlice";
import { stopWords } from "./utils/stopWords";
import styles from './style.module.scss';

export default function SearchBar() {
  const dispatch = useDispatch();
  const geocode = useSelector((state) => state.pubs.geocode);
  const [inputValue, setInputValue] = useState('');
  const [term, setTerm] = useState();
  const { data: result = [] } = useSearchForPubQuery(term ? term : skipToken);
  const [searchResults, setSearchResults] = useState([])
  const [pubId, setPubId] = useState(null);

  const { data: pubs = [] } = useGetPubsQuery(geocode ? geocode : skipToken)
  const { data: pub, isSuccess } = useGetPubQuery(pubId ? pubId : skipToken)

  const handleChange = (search) => {
    setInputValue(search)
    if (search.length > 1) {
      search = search.toLowerCase();
      const words = search.split(' ');

      const filteredWords = words.filter((word, index) => index === 0 || !stopWords.includes(word));
      search = filteredWords.join(' ');

      if (search.length < 9) {
        setTerm(search)
      }
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    setSearchResults(result)
  }, [term])

  const getPub = (id) => {
    if (!pubs.length) {
      setPubId(id);
      return;
    }

    const pub = pubs.find(obj => obj.id === id);

    if (!pub) {
      setPubId(id);
    } else {
      setAndClear(pub);
    }
  };

  useEffect(() => {
    if (isSuccess && pub) {
      setAndClear(pub);
    }
  }, [isSuccess, pub]);

  const setAndClear = (pub) => {
    dispatch(setPub(pub));
    setSearchResults([]);
    setInputValue('');
  }

  return (
    <>
      <div className={styles.search}>
        <input
          type="text"
          label="Search..."
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
        />
        <FaSearch />
      </div>


      {searchResults != [] &&
        <div
          className={styles.suggestions}
        >
          {searchResults.map((rs) => (
            <div
              className={styles.suggestion}
              onClick={() => getPub(rs.id)}
              key={rs.id}
            >
              {correctEncoding(rs.name)}
            </div>
          ))}
        </div>
      }
    </>
  );
}
