import React, { useRef, useState, useEffect } from "react";
import Measure from "react-measure";
import { Camera } from "./camera/index";
import { Root, Preview, Header, GlobalStyle, Wrapper, Container } from "./styles";
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import { useCardRatio } from "./hooks/use-card-ratio";

import { Button } from '@material-ui/core';
import changeImg from '../../../assets/images/upload.png';
const CustomAvatar = props => {
  const videoRef = useRef();
  const [isCameraOpen, setIsCameraOpen] = useState(true);
  const [cardImage, setCardImage] = useState();
  const [previewMode, setPreviewMode] = useState(false);

  const [aspectRatio, calculateRatio] = useCardRatio(1.586);
  const [container, setContainer] = useState({ width: 0, height: 0 });
  function handleResize(contentRect) {
    setContainer({
      width: contentRect.bounds.width,
      height: Math.round(contentRect.bounds.width / aspectRatio)
    });
  }

  useEffect(() => {

    if (videoRef.current)
      calculateRatio(videoRef.current.height, videoRef.current.width);

  }, [videoRef])

  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  fileSelector.addEventListener("change", function (e) {
    console.log('change:=> ', e.target.files);


    setContainer({ width: window.innerWidth * 0.5, height: Math.round(window.innerWidth * 0.5 / aspectRatio) })
    setCardImage(e.target.files[0]);
    setPreviewMode(true);

  }, false);
  const buildFileSelector = () => {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');

    /* fileSelector.setAttribute('multiple', 'multiple'); */

    return fileSelector;
  }
  const handleFileSelect = (e) => { e.preventDefault(); fileSelector.click(); }

  return (
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center' }}>

      <Header>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}      >
          {/* !cardImage &&*/ true &&
            <Button color="primary"
              style={{ color: 'black', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '5px', maxHeight: '90%', fontWeight: 'bold', textAlign: ' center', lineHeight: '1.2' }}
              text={{ fontSize: '1.2vh', textAlign: 'center', lineHeight: '0' }}
              onClick={(e) => {
                if (!cardImage) setIsCameraOpen(true);
                else { setIsCameraOpen(false); setCardImage(null); setIsCameraOpen(true); setPreviewMode(false) }
              }}
            >{!cardImage ? 'Open Camera' : 'Cancel Preview'}
            </Button>
          }
          {/* isCameraOpen */  true &&
            (<Button color="primary"
              style={{ color: 'black', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '5px', maxHeight: '90%', fontWeight: 'bold', textAlign: ' center', lineHeight: '1.2' }}
              text={{ fontSize: '1.2vh', textAlign: 'center', lineHeight: '0' }}
              onClick={(e) => {
                if (isCameraOpen) { setIsCameraOpen(false); setCardImage(undefined); setPreviewMode(false) }
                else { handleFileSelect(e) }
              }}
            >{isCameraOpen ? 'Close Camera' : 'Browse for foto'}
            </Button>)
          }

        </div>
      </Header>

      {isCameraOpen && (
        <Measure bounds onResize={handleResize}>
          {({ measureRef }) => (
            <Container ref={measureRef}>
              <Camera
                onCapture={blob => { setCardImage(blob); setPreviewMode(true) }}
                onClear={() => setCardImage(undefined)}
              />
            </Container>)}
        </Measure>)}

      {cardImage && previewMode && (
        <div style={{ flex: 1 }}>
          <div style={{ position: 'absolute', top: '30px', maxWidth: container.width, maxHeight: container.height, backgroundColor: 'yellow', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center' }}>
            <Preview src={cardImage && URL.createObjectURL(cardImage)} />
            <img onClick={() => {
              props.onSetProfileImage(URL.createObjectURL(cardImage));
              props.returnToInfos();

            }} src={changeImg} style={{ /* width: '25px', height: '25px' */ position: 'absolute', bottom: 0, right: 0 }}></img>
          </div>

        </div>
      )}



      {/*  <GlobalStyle /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomAvatar);;

