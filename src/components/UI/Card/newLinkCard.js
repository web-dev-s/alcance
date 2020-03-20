import React, { useRef, useState, useEffect } from "react";
import { /* Button,  */Grid } from '@material-ui/core';
import { BrowserView, MobileView, /* isBrowser, isMobile */ } from "react-device-detect";
//import styled/* , { createGlobalStyle } */ from "styled-components";
import styled, { keyframes, css } from "styled-components";
import arrow from '../../../assets/images/chevron-right.png';
import { updateObject, checkValidity, color } from '../../../shared/utility';
const NewLinkCard = (props) => {
    const [isFlashing, setIsFlashing] = useState(false);
    const FlashingDiv = styled.div`opacity: 1;width:100%; height:100%;      ${({ flash }) => { if (flash) { return css`animation: ${flashAnimation} 450ms ease-out;`; } }}  `;
    const flashAnimation = keyframes` from {opacity: 0.75;} to { opacity: 0.2; }`;


    return (<div style={{
        display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center',
        width: '100%', height: '100%', marginBottom: '14px', marginTop: '4px', ...props.mainContainerStyle
    }}>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}

        >
            <FlashingDiv flash={isFlashing} onAnimationEnd={(e) => { setIsFlashing(false);  }}>
                <div style={{
                    boxSizing: 'border-box', boxShadow: '0 2px 8px #ccc',
                    border: '1px solid lightgray', borderRadius: '4px',
                    display: 'block', overflowY: 'auto', padding: '5px',
                    maxHeight: '800px',
                    minWidth: props.minWidth ? props.minWidth : ('60%' || '300px'),
                    justifyContent: 'center', textAlign: 'center',
                    minHeight: '60%',

                    maxWidth: '99%',
                    paddingBottom: '5px',

                    position: 'relative',
                    overflow: 'hidden',
                    ...props.wrapperShadowedStyle
                }}

                >

                    <div
                        onClick={(e) => { setIsFlashing(!isFlashing);props.clicked(e) }}
                        style={{
                            display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: '4%',
                            ...props.textWrapperStyle
                        }}>
                        <text style={{ fontSize: '0.9rem', color: color.alcanceOrange }}>{props.title}</text>
                        <div style={{ display: 'flex', flexDirection: 'row', flex: 0, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                            <img src={arrow} alt="arrow" style={{ transform: 'rotate(0deg)', height: '25px', resize: 'contain' }} />
                        </div>
                    </div>
                </div>
            </FlashingDiv>
        </div>

    </div >)
};

export default NewLinkCard;