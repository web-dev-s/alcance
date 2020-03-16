import { useState, useEffect, useRef } from "react";

export function useUserMedia(requestedMedia, facingMode) {
    const [mediaStream, setMediaStream] = useState(null);
    const [availableVideoInputs, setAvailableVideoInputs] = useState(null);
    const [error, setError] = useState(null);
    const useCleanup = (val) => {
        const valRef = useRef(val);
        useEffect(() => {
            valRef.current = val;
        }, [val])

        useEffect(() => {
            return () => {
                // cleanup based on valRef.current
            }
        }, [])
    }
    const none = null;
    useEffect(() => {
        const gotDevices = (mediaDevices) =>
            new Promise((resolve, reject) => {
                const availableVideoInputs = []
                mediaDevices.forEach(mediaDevice => {
                    if (mediaDevice.kind === 'videoinput') {
                        availableVideoInputs.push({
                            deviceId: mediaDevice.deviceId,
                            label: mediaDevice.label
                        })
                    }
                })

                if (availableVideoInputs.length > 0) {
                    resolve(availableVideoInputs)
                } else {
                    reject(new Error('ERR::NO_MEDIA_TO_STREAM'))
                }
            })


        navigator.mediaDevices.enumerateDevices().then(gotDevices)
            .then((availableVideoInputs) => setAvailableVideoInputs(availableVideoInputs))
            .catch((err) => setError(err));



    }, [none]);



    useEffect(() => {
        const { NoVideoInputDevicesError } = require('./errors')
        function defaultDeviceIdChooser(filteredDevices, videoDevices, facingMode) {
            if (filteredDevices.length > 0) {
                if (facingMode == 'user') return filteredDevices[0].deviceId
                else if (filteredDevices.length > 1) return filteredDevices[1].deviceId
                else return filteredDevices[0].deviceId;
            }
            /* if (filteredDevices.length > 0) {
                return filteredDevices[0].deviceId
            } */
            else if (videoDevices.length == 1 || facingMode == 'user') {
                return videoDevices[0].deviceId
            }
            return videoDevices[1].deviceId

        }
        const getFacingModePattern = (facingMode) => facingMode == 'environment'
            ? /rear|back|environment/ig
            : /front|user|face/ig
        function getDeviceId(facingMode, chooseDeviceId = defaultDeviceIdChooser) {
            // Get manual deviceId from available devices.
            return new Promise((resolve, reject) => {
                let enumerateDevices
                try {
                    enumerateDevices = navigator.mediaDevices.enumerateDevices()
                } catch (err) {
                    // reject(new NoVideoInputDevicesError())
                }
                enumerateDevices.then(devices => {
                    // Filter out non-videoinputs


                    const videoDevices = devices.filter(
                        device => device.kind == 'videoinput'
                    )
                   // alert('foundDevices:' + JSON.stringify(videoDevices));

                    if (videoDevices.length < 1) {
                        // reject(new NoVideoInputDevicesError())
                        return
                    }

                    const pattern = getFacingModePattern(facingMode);

                    // Filter out video devices without the pattern
                    const filteredDevices = videoDevices.filter(({ label }) =>
                        pattern.test(label))

                    resolve(chooseDeviceId(filteredDevices, videoDevices, facingMode))
                })
            })
        }


        const StopStream = (webkitMediaStream) => {
            var MediaStream = window.MediaStream;

            if (typeof MediaStream === 'undefined' && typeof webkitMediaStream !== 'undefined') {
                MediaStream = webkitMediaStream;
            }

            /*global MediaStream:true */
            if (typeof MediaStream !== 'undefined' && !('stop' in MediaStream.prototype)) {
                MediaStream.prototype.stop = function () {
                    this.getTracks().forEach(function (track) { track.stop(); });
                };
            }
        }
        let deviceId = null;
        (facingMode == true)
            ? getDeviceId("user").then((deviceIdUser, err) => { deviceIdUser ? deviceId = deviceIdUser : setError(err); /* alert('UserCamera' + JSON.stringify(deviceIdUser)) */ })
            : getDeviceId("environment").then((deviceIdEnv, err) => { deviceIdEnv ? deviceId = deviceIdEnv : setError(err); /* alert('EnvCamera' + JSON.stringify(deviceIdEnv)) */ /* console.log(deviceIdEnv) */ });


        /*  if (mediaStream) mediaStream.stop(); */
        async function enableVideoStream() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia(requestedMedia);
                setMediaStream(stream);
            } catch (err) {
                // Handle the error
            }
        }

        async function enableVideoStreamS() {
            const reqMedia = { audio: false, video: { deviceId: deviceId } }
            try {
                const stream = await navigator.mediaDevices.getUserMedia(reqMedia);
                setMediaStream(stream);
            } catch (err) {
                // Handle the error
            }
        }
        // setMediaStream(false);

        async function enableVideoStreamS() {
            const reqMedia = { audio: false, video: { deviceId: deviceId } }
            try {
                const stream = await navigator.mediaDevices.getUserMedia(reqMedia);
                setMediaStream(stream);
            } catch (err) {
                // Handle the error
            }
        }
      

        if (!mediaStream) {
          /*   if (deviceId) */ enableVideoStreamS();
            // else enableVideoStream();
        }
        else return function cleanup() { mediaStream.getTracks().forEach(track => { track.stop(); }); };

    }, [mediaStream, requestedMedia]);

    // cleanup streams
    useEffect(() => {
        return () => {
            if (!mediaStream) {
                return
            }
            console.log("Cleaning up stream.", mediaStream)
            const tracks = mediaStream.getTracks()
            tracks.forEach(track => {
                track.stop()
            })
        }
    }, [facingMode])


    const updateFileUploadView = (newActiveView) => {
        this.setState({ activeFileUploadView: newActiveView })

        const { hasError } = this.state
        if (newActiveView === 'clickFromWebcam' && hasError) {
            return console.error(hasError)
        }

        if (newActiveView === '') {
            // means no view is active and clear the selected image
            // this.setState({ captureImageBase64: '', videoConstraints: defaultVideoConstraints })
        }
    }

    const changeCameraView = () => {
        const { availableVideoInputs } = this.state
        if (availableVideoInputs.length === 1) {
            return console.error('ERR::AVAILABLE_MEDIA_STREAMS_IS_1')
        }

        this.setState({ resetCameraView: true })

        setTimeout(() => {
            const { videoConstraints: { facingMode } } = this.state
            const newFacingMode = facingMode === 'user' ? { exact: 'environment' } : 'user'

            this.setState({
                videoConstraints: { facingMode: newFacingMode },
                resetCameraView: false
            })
        }, 100)
    }





    return mediaStream;
}

function defaultDeviceIdChooser(filteredDevices, videoDevices, facingMode) {
    if (filteredDevices.length > 0) {
        if (facingMode == 'user') return filteredDevices[0].deviceId
        else if (filteredDevices.length > 1) return filteredDevices[1].deviceId
        else return filteredDevices[0].deviceId;
    }
    /* if (filteredDevices.length > 0) {
        return filteredDevices[0].deviceId
    } */
    else if (videoDevices.length == 1 || facingMode == 'user') {
        return videoDevices[0].deviceId
    }
    return videoDevices[1].deviceId

}
const getFacingModePattern = (facingMode) => facingMode == 'environment'
    ? /rear|back|environment/ig
    : /front|user|face/ig
export function getDeviceId(facingMode, chooseDeviceId = defaultDeviceIdChooser) {
    // Get manual deviceId from available devices.
    return new Promise((resolve, reject) => {
        let enumerateDevices
        try {
            enumerateDevices = navigator.mediaDevices.enumerateDevices()
        } catch (err) {
            // reject(new NoVideoInputDevicesError())
        }
        enumerateDevices.then(devices => {
            // Filter out non-videoinputs


            const videoDevices = devices.filter(
                device => device.kind == 'videoinput'
            )
            alert('foundDevices:' + JSON.stringify(videoDevices));

            if (videoDevices.length < 1) {
                // reject(new NoVideoInputDevicesError())
                return
            }

            const pattern = getFacingModePattern(facingMode);

            // Filter out video devices without the pattern
            const filteredDevices = videoDevices.filter(({ label }) =>
                pattern.test(label))

            resolve(chooseDeviceId(filteredDevices, videoDevices, facingMode))
        })
    })
}


