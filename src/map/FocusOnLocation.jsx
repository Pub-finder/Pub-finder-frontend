import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMap, Marker } from "react-leaflet";
import { hereIcon } from './icons';

export default function FocusOnLocation() {
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
}
