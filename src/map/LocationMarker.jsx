import { React, useState, useEffect } from "react";
import { useMapEvents, Marker } from "react-leaflet";
import { userIcon } from './icons';

export default function LocationMarker() {
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

  // return position === null ? null : <Marker position={position} icon={userIcon} />;
}
