import { React } from "react";
import Map from "../map/Map";
import SideBar from "../sideBar/SideBar";
import { MdOutlineLayers } from "react-icons/md";
import SearchBar from "../searchBar/SearchBar";
import BottomBar from "../bottomBar/BottomBar";
import { useDispatch } from "react-redux";
import styles from './style.module.scss';
import useIsMobile from '@utils/hook/useIsMobile';
import BottomSheet from "../bottomBar/BottomSheet/BottomSheet";
import { toggleLayer } from "@redux/slices/layerSlice";
import Menu from "../menu/Menu";

export default function MapPage() {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  return (
    <>
      <SearchBar />
      {isMobile ? <BottomSheet /> : <SideBar />}
      <Map className={styles.map} />
      <MdOutlineLayers
        onClick={() => dispatch(toggleLayer())}
        className={styles.layerToggle}
      />
    </>
  );
}