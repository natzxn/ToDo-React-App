import React from 'react';
import logo from '../images/logo.png';
import Logout from './Logout';
import styles from '../styles/User.module.css'

function User(){
    return (
        <header className={styles.User}>
            <div className={styles.logo}>
                <img src={logo} alt="logo" />
            </div>
            <div className={styles.info}>
                <h1 className={styles.title}>Your to-do list!</h1>
                <Logout />
            </div>
        </header> 
    )
}

export default User;
