import { Icon } from "leaflet";

export const beerIcon = new Icon({
  iconUrl: "content/beer.png",
  iconSize: [27, 27],
});

export const userIcon = new Icon({
  iconUrl: "content/position.png",
  iconSize: [45, 45],
});

export const hereIcon = new Icon({
  iconUrl: "content/here.png",
  iconSize: [55, 55],
});

export default { beerIcon, userIcon, hereIcon };