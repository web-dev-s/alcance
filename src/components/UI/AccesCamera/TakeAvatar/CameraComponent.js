import React, { useRef, useState, useEffect } from "react";
import Measure from "react-measure";
import { Camera } from "./camera/index";
import SwitchingCamera from "./camera/SwitchingCamera"; 
import { Root, Preview, Header, GlobalStyle, Wrapper, Container } from "./styles";
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import { useCardRatio } from "./hooks/use-card-ratio";
import classes from './CameraComponent.css';
import { Button } from '@material-ui/core';
import Spinner from '../../Spinner/Spinner';  
import styled, { keyframes, css } from "styled-components";
import flipCamImg from '../../../assets/images/switchCamera.png';
import takeFotoCamImg from '../../../assets/images/takeFoto.png';
import delFotoCamImg from '../../../assets/images/trash.png';
import { VideoFeed } from '../../../../hooks/startCam';
const CameraComponent = props => {
    const videoRef = useRef();
    const cameraEnvRef = useRef();
    const cameraUserRef = useRef();
    const [isCameraOpen, setIsCameraOpen] = useState(true);
    const [cardImage, setCardImage] = useState();
    const [previewMode, setPreviewMode] = useState(false);
    const [inError, setInError] = useState('');

    const [facing, setFacing] = useState(true);
    const [aspectRatio, calculateRatio] = useCardRatio(1.586);
    const [containerEC, setContainerEC] = useState({ width: 0, height: 0 });

    const [containerUC, setContainerUC] = useState({ width: 0, height: 0 });




    const [isFlashingSwitch, setIsFlashingSwitch] = useState(false);
    const [isFlashingTakePhoto, setIsFlashingTakePhoto] = useState(false);
    const [isFlashingDelete, setIsFlashingDelete] = useState(false);


    useEffect(() => {

        if (videoRef.current)
            calculateRatio(videoRef.current.height, videoRef.current.width);

    }, [videoRef])
    useEffect(() => {

        if (cardImage) setIsCameraOpen(true);
        else setIsCameraOpen(false);

    }, [cardImage])
    const SwitchCamera = () => { setFacing(!facing); }
    const handleCapture = () => {

        if (facing) {
            if (!cameraUserRef || !cameraUserRef.current) return;
            cameraUserRef.current.onCapture();
            console.log('cameraUserRef', JSON.stringify(cameraUserRef.current))
            //cameraUserRef.current.handleCapture();
        }
        else {
            if (!cameraEnvRef || !cameraEnvRef.current) return;
            cameraEnvRef.current.onCapture();
            console.log('cameraEnvRef', JSON.stringify(cameraEnvRef.current))
        }
    }
    const handleClear = () => {
        if (facing) {
            if (!cameraUserRef || !cameraUserRef.current) return; console.log(JSON.stringify(cameraUserRef.current))
            cameraUserRef.current.onClear();
        }
        else {
            if (!cameraEnvRef || !cameraEnvRef.current) return;
            cameraEnvRef.current.onClear();
        }

        // facing ? cameraUserRef.current.onClear() : cameraEnvRef.current.onClear()
    }
    const FlashingDiv = styled.div`opacity: 1;      ${({ flash }) => { if (flash) { return css`animation: ${flashAnimation} 450ms ease-out;`; } }}  `;
    const flashAnimation = keyframes` from {opacity: 0.75;} to { opacity: 0; }`;

    const children = <div> {!facing
        ? <Camera ref={cameraEnvRef} onCapture={blob => { setCardImage(blob); setPreviewMode(true) }} onClear={() => setCardImage(undefined)} facingString={'environment'} />
        : <Camera ref={cameraUserRef} onCapture={blob => { setCardImage(blob); setPreviewMode(true) }} onClear={() => setCardImage(undefined)} facingString={'user'} />
    } </div>
    const buttonz = <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center', marginTop: '5%', marginBottom: '5%' }}>
        <div onClick={() => { setIsFlashingSwitch(!isFlashingSwitch); SwitchCamera() }} style={{ display: 'flex', flex: 0.75, height: '80%', alignItems: 'flex-start' }}>
            <FlashingDiv flash={isFlashingSwitch} onAnimationEnd={() => setIsFlashingSwitch(false)}>
                <img src={flipCamImg} style={{ maxWidth: '30px', /*  height: '100%', */ resize: 'contain', alignSelf: 'center' }} />
            </FlashingDiv>
        </div>
        <div onClick={() => { setIsFlashingTakePhoto(!isFlashingTakePhoto); handleCapture() }} style={{ display: 'flex', flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
            <FlashingDiv flash={isFlashingTakePhoto} onAnimationEnd={() => setIsFlashingTakePhoto(false)}>
                <img src={takeFotoCamImg}
                    style={{ maxWidth: '50px',  /*  height: '100%', */ resize: 'contain', alignSelf: 'center' }} />
            </FlashingDiv>
        </div>
        <div onClick={() => { setIsFlashingDelete(!isFlashingDelete); handleClear(); }/* handleClear */} style={{ display: 'flex', flex: 0.75, height: '80%', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <FlashingDiv flash={isFlashingDelete} onAnimationEnd={() => setIsFlashingDelete(false)}>
                <img src={delFotoCamImg}
                    style={{ maxWidth: '30px', /*  height: '100%', */ resize: 'contain', alignSelf: 'center' }} />
            </FlashingDiv>
        </div>
    </div>
    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center' }}>
            <div style={{ display: 'flex', flex: 1, width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <SwitchingCamera
                    onCapture={blob => { setCardImage(blob); setPreviewMode(true) }}
                    onClear={() => setCardImage(undefined)}
                    onError={(error) => setInError(error)}
                />
            </div>
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

