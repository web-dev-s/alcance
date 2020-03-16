import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import flipCamImg from '../../../assets/images/switchCamera.png';
import takeFotoCamImg from '../../../assets/images/takeFoto.png';
import delFotoCamImg from '../../../assets/images/trash.png';

const WebcamCapture = () => {
    const [facingMode, setFacingMode] = useState('environment');
    const [imageSrc, setImageSRC] = useState(null);
    const webcamRef = React.useRef(null);


    const videoConstraints = {
         width: 150,
        height: 150,  
        facingMode: facingMode
    };
    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImageSRC(imageSrc);
            
        },
        [webcamRef]
    );
    const SwitchCamera = () => {
    
 
  
    }
    const deleteCapture = () => {
    
 
  
    }
    return (
        <div style={{ padding: '15px', justifyContent: 'center', alignItems: 'center' }}>
            <select onChange={(e) => setFacingMode(e.currentTarget.value)}
                style={{ margin: '5px', display: 'flex', width: '95%', justifyContent: 'space-between', borderColor: 'transparent' }}
            >
                <option value="user">User Camera</option>
                <option value="environment">Environment Camera</option>
            </select>
            <Webcam
                audio={false}
                height={100}
                ref={webcamRef}
                screenshotFormat="image/png"
                width={100}
                videoConstraints={videoConstraints}
            />
            <button onClick={capture}>Capture photo</button>
            <div
                onClick={SwitchCamera}
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <div style={{ display: 'flex', flex: 0.75, height: '80%', alignItems: 'flex-start' }}>
                  <img src={flipCamImg}
                    style={{ maxWidth: '50px', width: '100%', height: '100%', resize: 'contain', alignSelf: 'center' }} />
                </div>
                <div
                  onClick={capture}
                  style={{ display: 'flex', flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                  <img src={takeFotoCamImg}
                    style={{ maxWidth: '80px', width: '100%', height: '100%', resize: 'contain', alignSelf: 'center' }} />
                </div>
                <div onClick={deleteCapture}
                  style={{ display: 'flex', flex: 0.75, height: '80%', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                  <img src={delFotoCamImg}
                    style={{ maxWidth: '50px', width: '100%', height: '100%', resize: 'contain', alignSelf: 'center' }} />
                </div>
              </div>
        </div>
    );
};
export default WebcamCapture;