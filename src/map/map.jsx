import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "../redux/slices/pubsSlice";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import correctEncoding from "../utils/correctEncoding";
import { useGetPubsQuery } from "../redux/slices/apiSlices/pubApiSlice";
import { skipToken } from '@reduxjs/toolkit/query/react';
import { beerIcon, userIcon } from "./icons";

import LocationMarker from "./LocationMarker";
import FocusOnLocation from "./FocusOnLocation";
import Layer from "./Layer";
import Loader from "../utils/loader/TextSpinnerLoader";


export default function Map() {
  const dispatch = useDispatch();
  const layer = useSelector((state) => state.layer.realisticMap);
  const searchedPub = useSelector((state) => state.pub.pub);
  const [geocode, setGecode] = useState({latitude: null, longitude: null, radius: 1.0,});
  const [notInList, setNotInList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { data: pubs = [], isSuccess } = useGetPubsQuery(geocode.latitude ? geocode : skipToken)

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (isSuccess && pubs) {
      dispatch(setLocation(geocode));
    }
  }, [isSuccess, pubs]);

  useEffect(() => {
    if (Object.keys(searchedPub).length === 0) return;
    const pub = pubs.find(obj => obj.id === searchedPub.id);
    pub ? setNotInList(false) : setNotInList(true);
  }, [searchedPub]);

  async function getLocation() {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      setGecode({
          latitude: 59.31515121304178, // position.coords.latitude
          longitude: 18.07202469430583, // position.coords.longitude
          radius: 1
      });
      setIsLoading(false);
    } catch (error) {
      console.log("Unable to retrieve user location:", error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
        <div className="map-container">
            <p>Unable to retrieve user location. Please turn on your location services.</p>
        </div>
    );
  }

  return (
    <MapContainer center={[geocode.latitude, geocode.longitude]} zoom={16} zoomControl={false}>
      <Layer realisticLayer={layer} />
      <Marker position={[geocode.latitude, geocode.longitude]} icon={userIcon} className="icon" />
      <LocationMarker />
      <MarkerClusterGroup chunkedLoading animate={true} maxClusterRadius={10}>
        {notInList && (
          <Marker key={searchedPub.id} position={[searchedPub.lat, searchedPub.lng]} icon={beerIcon}>
            <Popup>{correctEncoding(searchedPub.name)}</Popup>
          </Marker>
        )}
        {pubs.map((pub) => (
          <Marker key={pub.id} position={[pub.lat, pub.lng]} icon={beerIcon}>
            <Popup>{correctEncoding(pub.name)}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      <FocusOnLocation />
    </MapContainer>
  );
}
