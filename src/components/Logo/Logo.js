import React from 'react';

 
import logoPng from '../../assets/images/logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{ height: props.height, ...props.containerStyle }}>
        <img src={logoPng} alt="PaqueteAlcante" style={{...props.imageStyle}}/>  
    </div>
);

export default logo;