import React, { useRef, useState, useEffect } from "react"
import styled, { keyframes, css } from "styled-components";


export function VideoFeed() {
    const videoRef = useRef(null)
   /*  function handleCanPlay() { calculateRatio(videoRef.current.videoHeight, videoRef.current.videoWidth); setIsVideoPlaying(true); videoRef.current.play(); }
 */
    useEffect(() => {
        if (!videoRef) {
            return
        }
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                let video = videoRef.current
                video.srcObject = stream
                video.play()
            })
    }, [videoRef])

    return <Video ref={videoRef}  
     /* onCanPlay={handleCanPlay} */ autoPlay playsInline muted 
    /*  style={{ top: `-${offsets.y}px`, left: `-${offsets.x}px` }} */ />
                           
    
}

export const Video = styled.video`
  position: absolute;

  &::-webkit-media-controls-play-button {
    display: none !important;
    -webkit-appearance: none;
  }
`;