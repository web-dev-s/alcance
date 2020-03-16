import { useState, useEffect, useRef } from "react";

export function useDEVICE_ID_Media(DEVICEID) {
    const [mediaStream, setMediaStream] = useState(null);
    const [lastDevID, setLastDevID] = useState(null);

    useEffect(() => {

        //  console.log('HOOK mediaStream DEVICEID: ', DEVICEID);
        //  console.log('HOOK mediaStream: mediaStream :', mediaStream)
        /*  if (mediaStream.active) StopStream(mediaStream); */
        async function enableVideoStreamS(deviceID) {
            const reqMedia = { audio: false, video: { deviceId: deviceID } }
            const reqMediaExact = { audio: false, video: { deviceId: { exact: deviceID } } }

            try {
                const stream = await navigator.mediaDevices.getUserMedia(reqMedia);

                setMediaStream(stream);
                console.log('HOOK mediaStream: NEWmediaStream :', stream)

            } catch (err) {
                // Handle the error
            }
        }
        async function StopStream(webkitMediaStream) {
            var MediaStream = this.window.MediaStream;

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
        if (DEVICEID !== lastDevID && false) {
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => { track.stop(); });
                //setMediaStream(null);
                enableVideoStreamS(DEVICEID);
            }
            setLastDevID(DEVICEID);
            console.log('HOOK mediaStream setLastDevID: ', DEVICEID);
            console.log('HOOK mediaStream enableVideoStreamS: ', DEVICEID);
            enableVideoStreamS(DEVICEID);
        }
        if (!mediaStream  /* || !mediaStream.active  */) {
            enableVideoStreamS(DEVICEID);
            console.log('HOOK  enableVideoStreamS: ', mediaStream);
        }
        else return function cleanup() { if (mediaStream) mediaStream.getTracks().forEach(track => { track.stop(); }); };

    }, [/* mediaStream, lastDevID */]);

    useEffect(() => {

        //  console.log('HOOK mediaStream DEVICEID: ', DEVICEID);
        //  console.log('HOOK mediaStream: mediaStream :', mediaStream)
        /*  if (mediaStream.active) StopStream(mediaStream); */
        async function enableVideoStreamS(deviceID) {
            const reqMedia = { audio: false, video: { deviceId: deviceID } }
            const reqMediaExact = { audio: false, video: { deviceId: { exact: deviceID } } }

            try {
                const stream = await navigator.mediaDevices.getUserMedia(reqMedia);
                console.log('HOOK DEVICEID: NEWmediaStream :', stream)
                setMediaStream(stream);
            } catch (err) {
                // Handle the error
            }
        }
        async function StopStream(webkitMediaStream) {
            var MediaStream = this.window.MediaStream;

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
        if (DEVICEID !== lastDevID) {
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => { track.stop(); });
                console.log('HOOK mediaStream stop current: ', mediaStream);

                // setMediaStream(null);
                enableVideoStreamS(DEVICEID);

                console.log('HOOK mediaStream restart new : ', DEVICEID);
            }
            setLastDevID(DEVICEID);
            console.log('HOOK mediaStream setLastDevID: ', DEVICEID);
            // console.log('HOOK mediaStream enableVideoStreamS: ', DEVICEID);

        }
        if (!mediaStream || !mediaStream.active) {
            enableVideoStreamS(DEVICEID);
            console.log('HOOK DEVICEID !== lastDevID enableVideoStreamS: ', mediaStream);
        }
        else return function cleanup() { if (mediaStream) mediaStream.getTracks().forEach(track => { track.stop(); }); };

    }, [DEVICEID]);


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
export function getVideoDevices() {
    var devices = [], error = '';


    // Get manual deviceId from available devices.
    return new Promise((resolve, reject) => {
        let enumerateDevices
        try {
            enumerateDevices = navigator.mediaDevices.enumerateDevices()
        } catch (err) {
            error = 'NO Video Inputs Found'
            resolve(error);
        }
        enumerateDevices.then(devices => {
            // Filter out non-videoinputs
            const videoDevices = devices.filter(device => device.kind == 'videoinput')
            if (videoDevices.length < 1) {
                // reject(new NoVideoInputDevicesError())
                error = 'NO Video Inputs Found';
                resolve(error);
            }
            const ids = videoDevices.map(dev =>  dev );
            devices = ids;
            resolve(devices);
        })
    });
    // prom().then((res, err) => console.log('getVideoDevices base', res));
    const result = { devices: devices.length > 0 ? devices : [], error: error }
    return result;
}

