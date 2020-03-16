import React from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const AccesCamera = props => {
    function handleTakePhoto(dataUri) {
        // Do stuff with the photo...
        console.log('takePhoto');
    }

    function handleTakePhotoAnimationDone(dataUri) {
        // Do stuff with the photo...
        console.log('takePhoto');
    }

    function handleCameraError(error) {
        console.log('handleCameraError', error);
    }

    function handleCameraStart(stream) {
        console.log('handleCameraStart');
    }

    function handleCameraStop() {
        console.log('handleCameraStop');
    }

    return (
        <div style={{ display: 'flex', flex: 1 }}>
            <Camera
            onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
            onTakePhotoAnimationDone={(dataUri) => { handleTakePhotoAnimationDone(dataUri); }}
            onCameraError={(error) => { handleCameraError(error); }}
            idealFacingMode={FACING_MODES.ENVIRONMENT}
            idealResolution={{ width: 100, height: 100 }}
            imageType={IMAGE_TYPES.JPG}
            imageCompression={0.97}
            isMaxResolution={true}
            isImageMirror={false}
            isSilentMode={false}
            isDisplayStartCameraError={true}
            isFullscreen={false}
            sizeFactor={1}
            onCameraStart={(stream) => { handleCameraStart(stream); }}
            onCameraStop={() => { handleCameraStop(); }}
        /></div>

    );
}

export default AccesCamera;