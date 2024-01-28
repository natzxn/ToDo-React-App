import React from 'react';
import logo from '../images/logo.png';

function User(){
//Logout imitation*
    return (
        <div className='User'>
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="info">
                <p>Your to-do list!</p>
                <a href="#">Logout</a> 
            </div>
        </div>
    )
}

export default User;