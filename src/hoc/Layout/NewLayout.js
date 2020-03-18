import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Uxi from '../Uxi/Uxi';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { BrowserView, MobileView } from "react-device-detect"; 
import drawerMobile from '../../assets/images/drawerMobile.png';
import logo from '../../assets/images/logo.png';
import FlashingButton from '../../components/UI/FlashingButton/FlashingButton';
import { color } from '../../shared/utility';
//import profileImg from '../../assets/images/profileImg.png';
//import { Route, Link } from "react-router-dom";

//import UserInfo from '../../containers/UserInfo/UserInfo';
const Layout = props => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);
  const [userInfoVisible, setUserInfoVisible] = useState(false);

  useEffect(() => {
    // console.log('Layout UseEffect->props.showUserInfo:  ' + JSON.stringify(props.showUserInfo));   

  }, [props])


  //sideDrawer menu
  const sideDrawerClosedHandler = () => { setSideDrawerIsVisible(false); };
  const sideDrawerToggleHandler = () => { setSideDrawerIsVisible(!sideDrawerIsVisible); };

  const navigateBack = () => { props.history.goBack(); };
  const profilePicturePress = () => {

    props.onSetShowUserInfo(true);
    props.history.push(props.match.userInfo);

    setUserInfoVisible(userInfoVisible);
  }
  return (
    <Uxi>
      <BrowserView>
        {(!false) && <Toolbar
          isAuth={props.isAuthenticated}
          drawerToggleClicked={sideDrawerToggleHandler}
          avatarPress={profilePicturePress}
        />}
        <SideDrawer
          isAuth={props.isAuthenticated}
          open={sideDrawerIsVisible}
          closed={sideDrawerClosedHandler}
          avatarPress={profilePicturePress}
        />
        <main className={classes.Content}>{props.children}</main>
      </BrowserView>
      <MobileView>

        {(false) &&
          <header className={classes.MobileToolbar} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
            {
              props.isAuthenticated &&
              <div onClick={sideDrawerToggleHandler} style={{ height: '40px', width: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>

                <div style={{ width: '35px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignSelf: 'flex-start', }}>
                  <img src={drawerMobile} alt="settings" style={{ maxHeight: '35px', maxWidth: '35px', resize: 'contain', display: 'flex', justifyContent: 'center', alignSelf: 'center' }} />
                </div>
              </div>
            }
           {/*  {
              <div onClick={navigateBack} style={{
                flex: 1, display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center',
                maxWidth: '518px', height: '40px', paddingLeft: '2%', paddingRight: '2%'
              }}>
                <div style={{
                  flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center',
                  maxWidth: '518px', height: '40px', paddingLeft: '0.1%', paddingRight: '10px'
                }}>
                  <img src={logo} alt="logo" style={{ width: '100%', height: '100%', resizeMode: 'contain', }} />
                </div>
              </div>
            } */}

            {
              props.isAuthenticated &&
              <div onClick={profilePicturePress} style={{ width: '40px', height: '40px', }}>
                <div style={{ flex: 1, height: '40px', alignItems: 'flex-end', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <img src={props.profileImage} alt="avatar" style={{ height: '40px', width: '40px', borderRadius: '50%', resize: 'contain', }} />
                </div>
              </div>
            }
           {/*  {
              !props.isAuthenticated &&
              <div style={{
                maxWidth: '100px', height: '40px', display: 'flex', flexDirection: 'row', alignSelf: 'flex-end',
                justifyContent: 'center', alignItems: 'center', alignContent: 'center', textAlignVertical: 'center', borderLeft: '3px solid #F8BB47'
              }}>

                <div style={{ flex: 2, marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'flex', justifyContent: 'center', fontFamily: 'AvenirBlack', width: '100%', height: '60%' }}                                        >
                  <FlashingButton
                    clicked={(e) => { props.history.push(props.match.register) }}
                    label={'REGISTRATE'}
                    style={{ backgroundColor: 'transparent', alignSelf: 'center', color: 'black', borderRadius: '10px', minHeight: '30px', fontWeight: 'bold', textAlign: ' center', boxShadow: '0 0 0 #ccc', border: '0px solid lightgray', }}
                    textStyle={{ color: color.washedBlack, paddingLeft: '8%', }}
                  />
                </div>



              </div>
            } */}
          </header>}

        <SideDrawer
          isAuth={props.isAuthenticated}
          open={sideDrawerIsVisible}
          closed={sideDrawerClosedHandler}
          avatarPress={profilePicturePress}
        />



        <main style={{ paddingTop: '5px', overflow: 'hidden' }}>
          <div style={{ paddingTop: '5px', /* overflow: 'hidden', */ }}>
            {props.children}
          </div>


        </main>

      </MobileView >
    </Uxi >
  );
};

const mapStateToProps = state => {
  return {
    /*  isAuthenticated: state.auth.token !== null */
    profileImage: state.al.profileImage,
    showUserInfo: state.al.showUserInfo,
    isAuthenticated: state.auth.authenticated,
    userType: state.auth.userType,
    userId: state.auth.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSetShowUserInfo: (showUserInfo) => dispatch(actions.setShowUserInfo({ showUserInfo: showUserInfo })),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
