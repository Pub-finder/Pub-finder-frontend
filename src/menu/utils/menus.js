import { FaRegMap } from "react-icons/fa";
import { MdOutlineReviews, MdOutlineBeenhere } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { IoMdLogIn } from "react-icons/io";

export const authenticatedMenu = [
    {
        id: 1,
        name: "Map",
        link: "/",
        svg: <FaRegMap size={22} />
    },
    {
        id: 2,
        name: "Reviews",
        link: "/userReviews",
        svg: <MdOutlineReviews size={22} />
    },
    {
        id: 3,
        name: "Visited Pubs",
        link: "/visitedPubs",
        svg: <MdOutlineBeenhere size={22} />
    },
    {
        id: 4,
        name: "Logout",
        link: "",
        svg: <BiLogOut size={22} />
    },
];

export const unauthenticatedMenu = [
    {
        id: 1,
        name: "Login",
        link: "/login",
        svg: <IoMdLogIn size={22} />
    },
];