import { React } from "react";
import Map from "../map/map";
import SideBar from "../sideBar/sideBar";
import { MdOutlineLayers } from "react-icons/md";
import SearchBar from "../searchBar/searchBar";
import BottomBar from "../bottomBar/bottomBar";
import { useDispatch } from "react-redux";
import styles from './style.module.scss';
import useIsMobile from '../utils/hook/useIsMobile';
import BottomSheet from "../bottomBar/BottomSheet/BottomSheet";
import { toggleLayer } from "../redux/slices/layerSlice";
import Menu from "../menu/Menu";

export default function StartPage() {
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