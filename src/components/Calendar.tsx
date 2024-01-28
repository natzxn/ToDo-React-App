import React, { useContext, useState } from 'react';
import { TodoContext } from '../context';
import { animated, useSpring } from '@react-spring/web';

 const calendarItems = ['today', 'previous 7 days', 'next 7 days', 'all days']

    function Calendar() {
    //STATE
        const [ showMenu, setShowMenu ] = useState(true);

    //ANIMATION
        const spin = useSpring({
            transform: showMenu ? "rotate(0deg)" : "rotate(180deg)",
            config : { friction : 5}
            });

        const menuAnimation = useSpring({
            display : showMenu ? 'block' : 'none',
            lineHeight : showMenu ? 1.2 : 0
        })

    //CONTEXT
        const contextValue = useContext(TodoContext);  
        if (!contextValue) {
          return null;
        }  
        const { setselectedDay } = contextValue;
    

    return (
        <div className='Calendar'>
            <div className="header">
                <div className="title">
                    <img width="36" height="36" src="https://img.icons8.com/pulsar-color/36/calendar-plus.png" alt="calendar-plus"/>
                    <p>Calendar</p>
                </div>
                <animated.div 
                style={spin} 
                onClick={() => setShowMenu(!showMenu)}
                className="btns">
                    <span>
                        <img width="20" height="20" src="https://img.icons8.com/material-outlined/20/circled-chevron-up.png" alt="circled-chevron-up"/>
                    </span>
                </animated.div>
            </div>
            <animated.div style={menuAnimation} className="items">
                {
                    calendarItems.map(item =>
                        <div 
                            className="item" 
                            key={item}
                            onClick={() => setselectedDay(item)}
                        >
                            {item}
                        </div>
                        
                    )
                }
            </animated.div>
        </div>
    )
}

export default Calendar;
