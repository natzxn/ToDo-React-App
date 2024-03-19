import React from 'react';
import logo from '../images/logo.png';
import Logout from '../pages/Logout';

function User(){
//Logout imitation*
    return (
        <div className='User'>
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="info">
                <p>Your to-do list!</p>
                <Logout />
            </div>
        </div>
    )
}

export default User;
