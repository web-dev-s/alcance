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
import HeaderComponent from '../../components/UI/Card/HeaderComponent';
import FooterComponent from '../../components/UI/Card//FooterComponent';
import Profile from '../../profileInfo/Profile';
import useWindowDimensions from '../../hooks/useWindowsDimensions';
const NewLayout = props => {
  const { height, width } = useWindowDimensions();
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
    <>
      <BrowserView>
        {(!false) && <Toolbar
          history={props.history}
          isAuth={props.isAuthenticated}
          drawerToggleClicked={sideDrawerToggleHandler}
          avatarPress={profilePicturePress}
        />}
        <SideDrawer
          history={props.history}
          isAuth={props.isAuthenticated}
          open={sideDrawerIsVisible}
          closed={sideDrawerClosedHandler}
          avatarPress={profilePicturePress}
        />
        <main className={classes.Content} style={{marginTop:'48px', paddingTop:'0'}}>{props.children}</main>
      </BrowserView>

      <MobileView style={{ width: width, height: height, marginTop: '0px', position: 'relative' }}>

        {(props.isAuthenticated) &&
          <header className={classes.MobileToolbar} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
            <HeaderComponent history={props.history} onDrawerPress={sideDrawerToggleHandler} />
          </header>}

        <SideDrawer
          isAuth={props.isAuthenticated}
          open={sideDrawerIsVisible}
          closed={sideDrawerClosedHandler}
          avatarPress={profilePicturePress}
        />

        <main style={{ paddingTop: '0px', overflow: 'hidden', overflowY: 'scroll' }}>
          <div style={{ paddingTop: '0px', /* overflow: 'hidden', */ marginTop: '0px', }}>
            {props.children}
          </div>
        </main>
        {/*  {(props.isAuthenticated) && <FooterComponent
          mainContainerStyle={{ bottom: '0px' }}
          onBackClick={() => props.history.push(props.userType == 'client' ? '/client' : '/comercio')} />} */}
      </MobileView >
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewLayout);
