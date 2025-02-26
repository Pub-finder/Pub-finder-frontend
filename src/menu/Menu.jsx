import {useState} from "react";
import { useMatch } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { motion, Variants } from "framer-motion"
import { menuVariants, itemVariants } from "./utils/variants"
import { authenticatedMenu, unauthenticatedMenu } from "./utils/menus";
import styles from './style.module.scss';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { signout } from "@redux/slices/authSlice";
import { useLogoutMutation } from "@redux/slices/apiSlices/authApiSlice";

export default function DropdownMenu() {
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();
    const authenticated = useSelector((state) => state.auth.authenticated);
    const [isOpen, setIsOpen] = useState(false);
    const menu = authenticated ? authenticatedMenu : unauthenticatedMenu;

    // If in on of the auth pages the menu button becomes white instead of default black
    const isSignupPage = useMatch('/signup');
    const isLoginPage = useMatch('/login');

    const handleSignout = async () => {
        try {
            await logout({
                token: localStorage.getItem("accessToken"),
            }).unwrap();
            dispatch(signout());
            setIsOpen(!isOpen);
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className={styles.menuContainer}>
            <section>
                <motion.button
                    whileHover={{
                        scale: 1.2,
                        transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <FaUserCircle
                    size={35}
                    className={isSignupPage || isLoginPage ? styles.lightButton : styles.darkButton}
                    />
                </motion.button>

                <motion.ul
                    initial="closed"
                    animate={isOpen ? 'open' : 'closed'}
                    variants={menuVariants}
                    style={{ overflow: 'hidden' }}
                >
                    {menu.map((variant) => (
                        <motion.li
                            key={variant.id}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.2 },
                            }}
                            whileTap={{ scale: 0.8 }}
                        >
                            {variant.name !== "Logout" ? (
                                <Link to={variant.link} className={styles.link} onClick={() => setIsOpen(!isOpen)}>
                                    {variant.svg}
                                    {variant.name}
                                </Link>
                            ) : (
                                <span
                                    onClick={handleSignout}
                                    className={styles.logout}
                                >
                                    {variant.svg}
                                    {variant.name}
                                </span>
                            )}
                        </motion.li>
                    ))}
               </motion.ul>
            </section>
        </div>
    );
}