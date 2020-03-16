import React, { useState, useEffect } from "react";
//import Measure from "react-measure"; 
import SwitchingCamera from "./camera/SwitchingCamera";
//import { Root, Preview, Header, GlobalStyle, Wrapper, Container } from "./component_styles";
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
//import { useCardRatio } from "./local_hooks/use-card-ratio";
import classes from './CameraComponent.css';
import { Button } from '@material-ui/core';
//import Spinner from '../../Spinner/Spinner'; 
//import styled, { keyframes, css } from "styled-components"; 
import ncda from '../../../assets/images/ncda.png';
const CameraComponent = props => {
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [cardImage, setCardImage] = useState();
    const [previewMode, setPreviewMode] = useState(false);
    const [inError, setInError] = useState('');

    //  const [facing, setFacing] = useState(true);
    useEffect(() => {
        if (cardImage) setIsCameraOpen(true);
        else setIsCameraOpen(false);
    }, [cardImage])

    // const FlashingDiv = styled.div`opacity: 1;      ${({ flash }) => { if (flash) { return css`animation: ${flashAnimation} 450ms ease-out;`; } }}  `;
    // const flashAnimation = keyframes` from {opacity: 0.75;} to { opacity: 0; }`;

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center' }}>
            <div style={{ display: 'flex', flex: 1, width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <SwitchingCamera
                    onCapture={blob => { setCardImage(blob); setPreviewMode(true) }}
                    onClear={() => setCardImage(undefined)}
                    onError={(error) => setInError(error)}
                    isOpen={(playing) => setIsCameraOpen(playing)}
                />
            </div>

            {!isCameraOpen && <div style={{ display: 'flex', flex: 1, width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <img src={ncda} alt='noDevice' style={{ maxWidth: '30%', /*  height: '100%', */ resize: 'contain', alignSelf: 'center' }} />
                <Button color="primary"
                    style={{ color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '10px', width: '60%', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }}
                    onClick={(e) => { props.returnToInfos(); }}
                >{'GO BACK'}</Button>
            </div>}
            {cardImage && previewMode &&
                (
                    <div className={[classes.ComponentWidth]} style={{ flex: 1, width: '100%', alignSelf: 'center', display: 'flex', justifyContent: 'center', marginTop: '5%', marginBottom: '5%' }}>
                        <Button color="primary"
                            style={{ color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '10px', width: '60%', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }}
                            onClick={(e) => { props.onSetProfileImage(URL.createObjectURL(cardImage)); props.returnToInfos(); }}
                        >{'SAVE CHANGES'}</Button>
                    </div>
                )}

            <p style={{ margin: '0', fontSize: '10px', color: 'orangered' }}>... {inError}...</p>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        profileImage: state.al.profileImage,
    };
};

const mapDispatchToProps = dispatch => {
    return {

        onSetProfileImage: (proifileImage) => dispatch(actions.setProfileImage({ profileImage: proifileImage })),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraComponent);;

