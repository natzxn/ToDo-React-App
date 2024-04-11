import React from 'react';
import logo from '../images/logo.png';
import Logout from './Logout';
import styles from '../styles/User.module.css'

function User(){
//Logout imitation*
    return (
        <div className={styles.User}>
            <div className={styles.logo}>
                <img src={logo} alt="logo" />
            </div>
            <div className={styles.info}>
                <p>Your to-do list!</p>
                <Logout />
            </div>
        </div>
    )
}

export default User;
