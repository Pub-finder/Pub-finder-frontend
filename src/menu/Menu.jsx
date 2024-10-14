import {useState} from "react";
import { FaUserCircle } from "react-icons/fa";
import { motion, Variants } from "framer-motion"
import { menuVariants, itemVariants } from "./variants"
import styles from './style.module.scss';
import { Link } from "react-router-dom";
import { authenticatedMenu, unauthenticatedMenu } from "./menus";
import { useSelector } from 'react-redux';

export default function DropdownMenu() {
    const authenticated = useSelector((state) => state.auth.authenticated);
    const [isOpen, setIsOpen] = useState(false);
    const menu = authenticated ? authenticatedMenu : unauthenticatedMenu;

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
                    <FaUserCircle size={35} />
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
                                <Link to={variant.link} className={styles.link}>
                                    {variant.svg}
                                    {variant.name}
                                </Link>
                            ) : (
                                <span
                                    onClick={() => console.log("logout")} className={styles.logout}>
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