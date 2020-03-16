import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Measure from "react-measure";
import { useDEVICE_ID_Media, getVideoDevices } from '../hooks/use-deviceId-media'; 
import { useUserMedia, getDeviceId } from "../hooks/use-user-media";
import { useCardRatio } from "../hooks/use-card-ratio";
import { useOffsets } from "../hooks/use-offsets";
import { Video, Canvas, Wrapper, Container, Flash, Overlay, Button } from "./styles";
import styled, { keyframes, css } from "styled-components";
import flipCamImg from '../../../../assets/images/switchCamera.png';
import takeFotoCamImg from '../../../../assets/images/takeFoto.png';
import delFotoCamImg from '../../../../assets/images/trash.png';
import Spinner from '../../../Spinner/Spinner';
const CAPTURE_OPTIONS = {
    audio: false,
    video: { facingMode: "environment" }
};
var type = function (obj) {
    return Object.prototype.toString.apply(obj).replace(/\[object (.+)\]/i, '$1').toLowerCase();
};
async function StopStream(webkitMediaStream) {
    if (!this) return;

    var MediaStream = 'undefined';
    if (this.window && this.window.MediaStream)
        MediaStream = this.window.MediaStream;

    if (typeof MediaStream === 'undefined' && typeof webkitMediaStream !== 'undefined') {
        MediaStream = webkitMediaStream;
    }

    /*global MediaStream:true */
    if (typeof MediaStream !== 'undefined' && !('stop' in MediaStream.prototype)) {
        MediaStream.prototype.stop = function () {
            this.getTracks().forEach(function (track) { track.stop(); });
        };
        MediaStream.stop();
    }
}


const SwitchingCamera = ({ onCapture, onClear, onError }) => {
    const canvasRef = useRef();
    const videoRef = useRef();
    ///Camera Commuters
    const [facing, setFacing] = useState(false);
    const [isFlashingSwitch, setIsFlashingSwitch] = useState(false);
    const [isFlashingTakePhoto, setIsFlashingTakePhoto] = useState(false);
    const [isFlashingDelete, setIsFlashingDelete] = useState(false);

    const FlashingDiv = styled.div`opacity: 1;      ${({ flash }) => { if (flash) { return css`animation: ${flashAnimation} 450ms ease-out;`; } }}  `;
    const flashAnimation = keyframes` from {opacity: 0.75;} to { opacity: 0; }`;


    ///Camera Commuters
    const [container, setContainer] = useState({ width: 0, height: 0 });
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
    const [isFlashing, setIsFlashing] = useState(false);

    ///Stream State
    const [inError, setInError] = useState('');
    const [inputDevices, setInputDevices] = useState([]);
    const [playingDeviceID, setPlayingDeviceID] = useState(null);
    const [mediaIndex, setMediaIndex] = useState(null);
    //let mediaStream = /* StartStream(playingDeviceID);  */useDEVICE_ID_Media(playingDeviceID); // useUserMedia(CAPTURE_OPTIONS, facing);
    const [mediaStream, setMediaStream] = useState(null);
    const GetDevices = async () => {
        setInError('');
        setInputDevices(null);
        let enumerateDevices = getVideoDevices();
        // console.log('GetDevices ->', enumerateDevices);
        enumerateDevices.then((res, rej) => {
            const enumerateDevices = res;
            if (type(enumerateDevices) === 'string') { return setInError(enumerateDevices); }
            else if (enumerateDevices.constructor === Array) return setInputDevices(enumerateDevices);
        }
        );

    }

    async function startMediaStream(deviceID) {
        const reqMedia = { audio: false, video: { deviceId: deviceID } }
        const reqMediaExact = { audio: false, video: { deviceId: { exact: deviceID } } }
        setInError('');
        try {
            const stream = await navigator.mediaDevices.getUserMedia(reqMedia);
          //  console.log('[' + inputDevices.indexOf(playingDeviceID) + ']   : ' + JSON.stringify(mediaStream));
            cleanupMediaStream();
            setMediaStream(stream);


        } catch (err) {
            console.error(err);
             setInError(`GetStream[${mediaIndex - 1}]: ` + err);
            // Handle the error


        }
    }

    function cleanupMediaStream() {
        if (mediaStream) {
            if (mediaStream.active)
                mediaStream.getTracks().forEach(track => { track.stop(); });
            else setMediaStream(null);

            console.log('cleanup succeded');
        }
    };

    const getFacingModePattern = (facingMode) => facingMode == 'environment'
        ? /rear|back|environment/ig
        : /front|user|face/ig
    useEffect(() => { GetDevices(); }, []);
    useEffect(() => { return () => cleanupMediaStream(); }, []);
    useEffect(() => {
        console.log('HOOK error: ', inError);
        if (inError.includes('NotReadableError') && isVideoPlaying) setMediaIndex(mediaIndex - 1);
        onError(inError);
    }, [inError]);
    useEffect(() => { console.log('HOOK response: ', inputDevices); }, [inputDevices]);
    useLayoutEffect(() => { 
        if (inputDevices && inputDevices.length > 0) {
            const pattern = getFacingModePattern('user');
            // Filter out video devices without the pattern
            const filteredDevices = inputDevices.filter(({ label }) =>
                pattern.test(label))

            if (filteredDevices && filteredDevices.length > 0) {
                if (filteredDevices.length > 1) {
                    setPlayingDeviceID(filteredDevices[1].deviceId); setMediaIndex(1);
                    //        alert('Started user camera [1] : ' + JSON.stringify(inputDevices[0]))

                }
                else {
                    setPlayingDeviceID(filteredDevices[0].deviceId);
                    setMediaIndex(0);
                    //     alert('Started user camera [0] : ' + JSON.stringify(inputDevices[0]))

                }
            } else {
                const facing = 'user'
                if (inputDevices.length == 1 || facing == 'user') {
                    setPlayingDeviceID(inputDevices[0].deviceId);
                    setMediaIndex(0);
                    //     alert('Started camera [0] : ' + JSON.stringify(inputDevices[0]))
                }
                else {
                    setPlayingDeviceID(inputDevices[1].deviceId);
                    setMediaIndex(1);
                    //    alert('Started camera [1] :' + JSON.stringify(inputDevices[1]))
                }
            }
            //  return cleanupMediaStream();
        }
        else setInError('no video input devices available');
    }, [inputDevices]);
    useLayoutEffect(() => {
        if (playingDeviceID) {
            const index = (inputDevices.map(dev => dev.deviceId)).indexOf(playingDeviceID);
            setMediaIndex(index);
            startMediaStream(playingDeviceID);
        }
    }, [playingDeviceID]);
    useLayoutEffect(() => {
        console.log('[' + inputDevices.map(dev => dev.deviceId).indexOf(playingDeviceID) + ']mediaStream changed About to load stream  : ' + JSON.stringify(mediaStream));

        try {
            if (videoRef.current /* && !videoRef.current.srcObject */) {
                videoRef.current.pause();
                videoRef.current.srcObject = null;
              //  console.log('we have current and no source ??? ')  
                if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
                    videoRef.current.srcObject = mediaStream;
                    videoRef.current.load();
                    videoRef.current.play(); 
                   // console.log('we have loaded and pressed play ')
                }
            }
        } catch (err) {
            console.error('Player: ' + err);
            setInError('Player: ' + err);
        }

    }, [mediaStream]);

    const [aspectRatio, calculateRatio] = useCardRatio(1.586);
    const offsets = useOffsets(videoRef.current && videoRef.current.videoWidth, videoRef.current && videoRef.current.videoHeight, container.width, container.height);

    function handleResize(contentRect) { setContainer({ width: contentRect.bounds.width, height: Math.round(contentRect.bounds.width / aspectRatio) }); }
    function handleCanPlay() { calculateRatio(videoRef.current.videoHeight, videoRef.current.videoWidth); setIsVideoPlaying(true); videoRef.current.play(); }
    function handleCapture() { if (!isCanvasEmpty) return; const context = canvasRef.current.getContext("2d"); context.drawImage(videoRef.current, offsets.x, offsets.y, container.width, container.height, 0, 0, container.width, container.height); canvasRef.current.toBlob(blob => onCapture(blob), "image/jpeg", 1); setIsCanvasEmpty(false); setIsFlashing(true); }
    function handleClear() { const context = canvasRef.current.getContext("2d"); context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); setIsCanvasEmpty(true); onClear(); } if (!mediaStream) { return null; }

    const switchCamera = () => {
        if (inError.includes('NotReadableError')) { setInError(''); cleanupMediaStream() };
        const currentIndex = (inputDevices.map(dev => dev.deviceId)).indexOf(playingDeviceID);
        //  console.log("switchCamera ->mediaStream : ", JSON.stringify(mediaStream), 'index:', currentIndex)
        if (inputDevices.length > 0) {
            if (currentIndex > -1) {
                if (currentIndex < inputDevices.length - 1) {
                    //  alert('[' + currentIndex + '] About to start playing device : ' + `${currentIndex + 1}`);
                    //  console.log('[' + currentIndex + '] About to start playing device : ' + `${currentIndex + 1}` + inputDevices[currentIndex + 1].deviceId);
                    setPlayingDeviceID(inputDevices[currentIndex + 1].deviceId);
                }
                else {
                    //  alert('[' + currentIndex + ']  About to start playing first device: ' + `${0}`);
                    // console.log('[' + currentIndex + '] About to start playing first device : ' + `${0}` + inputDevices[0].deviceId);
                    setPlayingDeviceID(inputDevices[0].deviceId)
                }
            }
            else {
                setPlayingDeviceID(inputDevices[0].deviceId)
                //  alert('[' + currentIndex + '] About to start playing first device: ' + `${currentIndex + 1}`);
                // console.log('[' + currentIndex + '] About to start playing first device : ' + `${0}` + inputDevices[0]);
            }
        }
    }
    return (<Measure bounds onResize={handleResize}>
        {({ measureRef }) => (
            <Wrapper>
                <Container ref={measureRef} maxHeight={videoRef.current && videoRef.current.videoHeight} maxWidth={videoRef.current && videoRef.current.videoWidth} style={{ height: `${container.height}px` }} >
                    <Video ref={videoRef} hidden={!isVideoPlaying} onCanPlay={handleCanPlay} autoPlay playsInline muted style={{ top: `-${offsets.y}px`, left: `-${offsets.x}px` }} />
                    <Overlay hidden={!isVideoPlaying} />
                    <Canvas ref={canvasRef} width={container.width} height={container.height} />
                    <Flash flash={isFlashing} onAnimationEnd={() => setIsFlashing(false)} />
                </Container>


                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center', marginTop: '5%', marginBottom: '5%' }}>
                    <div onClick={() => { setIsFlashingSwitch(!isFlashingSwitch); switchCamera() }} style={{ display: 'flex', flex: 0.75, height: '80%', alignItems: 'flex-start' }}>
                        <FlashingDiv flash={isFlashingSwitch} onAnimationEnd={() => setIsFlashingSwitch(false)}>
                            <img src={flipCamImg} style={{ maxWidth: '30px', /*  height: '100%', */ resize: 'contain', alignSelf: 'center' }} />
                        </FlashingDiv>
                    </div>
                    <div onClick={() => { setIsFlashingTakePhoto(!isFlashingTakePhoto); handleCapture() }} style={{ display: 'flex', flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                        <FlashingDiv flash={isFlashingTakePhoto} onAnimationEnd={() => setIsFlashingTakePhoto(false)}>
                            {isVideoPlaying && (
                                <img src={takeFotoCamImg} style={{ maxWidth: '50px',  /*  height: '100%', */ resize: 'contain', alignSelf: 'center' }} />

                            )}
                        </FlashingDiv>
                    </div>
                    <div onClick={() => { setIsFlashingDelete(!isFlashingDelete); handleClear(); }/* handleClear */} style={{ display: 'flex', flex: 0.75, height: '80%', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <FlashingDiv flash={isFlashingDelete} onAnimationEnd={() => setIsFlashingDelete(false)}>
                            {isVideoPlaying && (
                                <img src={delFotoCamImg} style={{ maxWidth: '30px', /*  height: '100%', */ resize: 'contain', alignSelf: 'center' }} />
                            )}
                        </FlashingDiv>
                    </div>
                </div>
                {inputDevices.length > 1 &&
                    <div style={{ width: '100%', justifyContent: 'space-around', }}>
                        <p style={{ margin: '0' }}>Devices: {inputDevices.length}   </p>
                        <p style={{ margin: '0', fontSize: '10px', color: 'green' }}>
                            {`Playing no : ${mediaIndex}  :  ${'\n'}
                              ${inputDevices[mediaIndex].label}`}
                        </p>
                    </div>
                }
            </Wrapper>
        )}
    </Measure>
    );
}
export default SwitchingCamera;
