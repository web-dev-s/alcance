import React from 'react';
import toggleimg from '../../../../assets/images/drawer.png'
import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <img src={toggleimg}  alt="toggle" />


        {/*  <div></div>
        <div></div>
        <div></div> */}
    </div>
);

export default drawerToggle;