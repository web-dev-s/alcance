import React, { useState, /* useRef, useEffect, useLayoutEffect */ } from "react";

import styled, { keyframes, css } from "styled-components";
//import classes from './FlashingButton.css';

const FlashingButton = (props) => {
    const [isFlashing, setIsFlashing] = useState(false);
    const FlashingDiv = styled.div`opacity: 1;      ${({ flash }) => { if (flash) { return css`animation: ${flashAnimation} 450ms ease-out;`; } }}  `;
    const flashAnimation = keyframes` from {opacity: 0.75;} to { opacity: 0.2; }`;


    return (<div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'stetch', alignSelf: 'center', alignContent: 'center',
        /*   marginTop: '5px', marginBottom: '5px', marginLeft: '10px', marginRight: '10px', */
        width: '100%', height: '100%'
    }}>
        <div style={{
            justifyContent: 'center', alignContent: 'stretch',
            padding: '0.3%',
        }}
            onClick={(e) => { setIsFlashing(!isFlashing); props.clicked(e) }}
        >
            <FlashingDiv flash={isFlashing} onAnimationEnd={() => setIsFlashing(false)}>
                {!props.clickableImage && <div style={{
                    display: 'flex', flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center',
                    paddingTop: '5px', paddingBottom: '5px', paddingLeft: '10px', paddingRight: '10px',
                    backgroundColor: '#f8bb48', color: 'white',
                    boxSizing: 'border-box', boxShadow: '0 2px 3px #ccc',
                    border: '1px solid lightgray', borderRadius: '8px',
                    ...props.style
                }}>
                    {props.label && <label style={{ margin: '0', paddingTop:'3px', alignText: 'center',/*  fontSize:'1.1vmin'  */ textOverflow: 'ellipsis',...props.textStyle  }}>{props.label}</label>}


                    {props.image && <img src={props.image} alt='buttonImg' style={{ maxHeight: '30px', /*  height: '100%', */ resize: 'contain', alignSelf: 'center', ...props.imageStyle }} />}

                </div>}
                {props.clickableImage && props.image &&

                    <img src={props.image} alt='buttonImg' style={{
                        height: '100%',
                        shadow: '0 2px 3px #ccc',
                        resize: 'contain', alignSelf: 'center',
                         ...props.imageStyle
                    }} />}


            </FlashingDiv>
        </div>

    </div>)
};

export default FlashingButton;