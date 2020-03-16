import React, { /* useEffect, */ useState } from 'react';
//import { createPortal } from "react-dom";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';
import classes from './UserInfo.css';
//import Uxi from '../../hoc/Uxi/Uxi';

import Spinner from '../../components/UI/Spinner/Spinner';

import InfoModal from '../../components/UI/Modal/InfoModal';
import avatar from '../../assets/images/profileImg.png';
import exitImg from '../../assets/images/exit.png';
//import Input from '../../components/UI/Input/Input'; 
import CameraComponent from '../../components/AVATAR/SwitchCamsComponent/CameraComponent';
//import { Button } from '@material-ui/core';
import ProfilePictureComponent from '../../components/AVATAR/ProfilePictureComponent/ProfilePictureComponent';
import InfoForm from './InfoForm';
import FlashingButton from '../../components/UI/FlashingButton/FlashingButton';
//import { getDeviceId } from '../../components/UI/AVATAR/SwitchCamsComponnt/local_hooks/use-deviceId-media';
const UserInfo = props => {
  const [changingAvatar, setChangingAvatar] = useState(false);
  const [editInfo, setEditInfo] = useState(false);

  const mesageModalClosed = () => {
    setTimeout(() => props.history.goBack(), 1500);
    props.onSetShowUserInfo(!props.showUserInfo);
    /*  setOpenDialog(false); */
  };

  const handleFileSelect = (e) => {
    e.preventDefault();
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.addEventListener("change", function (e) {
      // console.log('change:=> ', e.target.files);

      props.onSetProfileImage(URL.createObjectURL(e.target.files[0]));


    }, false);

    fileSelector.click();
  }
  let showMessage = <div style={{ zIndex: '200', flex: 1, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
    <div style={{ flex: 1, justifyContent: 'center', display: 'flex', flexDirection: 'row', alignItems: 'flex-end', alignSelf: 'flex-end', alignContent: 'flex-end'/* width: '250px', height: '250px' */ }}>
      <img onClick={() => { mesageModalClosed() }} alt={'x'} src={exitImg} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }} />
    </div >
    <div style={{ flex: 1, top: '30px', width: '80%', height: '30%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center' }}>
      {!changingAvatar &&
        <ProfilePictureComponent onClick={() => setChangingAvatar(true)}
          onTakeFoto={() => setChangingAvatar(true)}
          onUploadFoto={(e) => handleFileSelect(e)}
          onDeleteFoto={() => props.onSetProfileImage(avatar)}


        />
      }
      {changingAvatar && (<div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center'/* width: '250px', height: '250px' */ }}>

        <CameraComponent returnToInfos={() => setChangingAvatar(false)} />

      </div>)
      }
    </div >

    {!changingAvatar && <div className={[classes.ComponentWidth]} style={{ flex: 1, alignSelf: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '5%', marginBottom: '5%' }}>
      <FlashingButton
        clicked={(e) => setEditInfo(!editInfo)}
        label={!editInfo ? 'EDITAR' : 'SAVE INFO'}
        style={{ color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '10px', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }} />
    </div>
    }
    {
      (!changingAvatar)
        ?
        <div style={{ flex: 1, width: '100%', marginTop: '2%', paddingTop: '2%', 
        justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', alignContent: 'center'/* width: '250px', height: '250px' */ }}>
          <InfoForm editable={editInfo} />
        </div>
        : null
    }
  </div >;

  if (props.loading) {
    showMessage = <Spinner />;

  }

  return /* createPortal */(
    <div className={[classes.container,   /* classes.modalStyle */]}  >
      <InfoModal {...props} show={props.showUserInfo} modalClosed={() => mesageModalClosed()}>
        {showMessage}
      </InfoModal>
    </div>/*,
     document.getElementById("root"), */
  );




};

const mapStateToProps = state => {
  return {
    profileImage: state.al.profileImage,
    showUserInfo: state.al.showUserInfo,
    loading: state.auth.loading,
    userType: state.auth.userType,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),

    onSetShowUserInfo: (showUserInfo) => dispatch(actions.setShowUserInfo({ showUserInfo: showUserInfo })),
    onSetProfileImage: (proifileImage) => dispatch(actions.setProfileImage({ profileImage: proifileImage })),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(UserInfo, axios));
