import { TileLayer } from "react-leaflet";

export default function Layer({ realisticLayer }) {
  const attribution = realisticLayer
    ? "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
    : "";
  const url = realisticLayer
    ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
    : "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";

  return <TileLayer attribution={attribution} url={url} />;
}
