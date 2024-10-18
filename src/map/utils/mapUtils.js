import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useMapEvents, Marker, useMap } from "react-leaflet";
import { userIcon, hereIcon } from './icons';

export const FocusOnLocation = () => {
  const geocode = useSelector((state) => state.pub.geocode);
  const map = useMap();
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (geocode.length !== 0) {
      map.flyTo(geocode, 18);
      setPosition(geocode);
    }
  }, [geocode, map]);

  return position === null ? null : (
    <Marker position={position} icon={hereIcon} />
  );
};

export const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    dblclick() {
      map.locate({ setView: true, maxZoom: 16, enableHighAccuracy: true });
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : <Marker position={position} icon={userIcon} />;
};

import { TileLayer } from "react-leaflet";

export const Layer = ({ realisticLayer }) => {
  const attribution = realisticLayer
    ? "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
    : "";
  const url = realisticLayer
    ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
    : "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";

  return <TileLayer attribution={attribution} url={url} />;
};
