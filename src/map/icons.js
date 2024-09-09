import { Icon } from "leaflet";
import marker from "../../content/beer (1).png";
import marker2 from "../../content/position (1).png";
import here from "../../content/time.png";

export const beerIcon = new Icon({
  iconUrl: marker,
  iconSize: [27, 27],
});

export const userIcon = new Icon({
  iconUrl: marker2,
  iconSize: [45, 45],
});

export const hereIcon = new Icon({
  iconUrl: here,
  iconSize: [55, 55],
});

export default { beerIcon, userIcon, hereIcon };