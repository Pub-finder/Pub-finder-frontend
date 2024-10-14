import React from "react";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import styles from './style.module.scss';

const AuthContainer = ({ title, children }) => (

      <div className={styles.authContainer}>
        <h2>
          {title}
        </h2>
        {children}
      </div>

);

export default AuthContainer;