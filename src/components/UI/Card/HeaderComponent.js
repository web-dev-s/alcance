

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classes from './card.css';
import Spinner from '../Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity, color } from '../../../shared/utility';
import { BrowserView, MobileView } from "react-device-detect";
import ReactResizeDetector from 'react-resize-detector';
import FlashingButton from '../FlashingButton/FlashingButton';
const HeaderComponent = (props) => {

    return (<div style={{
        backgroundColor: color.white, position: 'absolute', top: 0, left: 0, right: 0, height: '68px',
        display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopRightRadius: '15px', borderTopLeftRadius: '15px',
        backgroundColor: ' #FFFFFF', boxShadow: ' 0px 0px 10px rgba(248, 188, 60, 0.6)', borderRadius: ' 0px 0px 10px 10px',
        ...props.mainContainerStyle
    }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '30px', }}>
            <FlashingButton
                clickableImage
                clicked={() => { props.onDrawerPress && props.onDrawerPress() }}
                image={require("../../../assets/images/drawer.png")}
            />

        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '25px', }}>
            <FlashingButton
                clickableImage
                clicked={() => {/*  window.location.reload();  */ }}
                image={require("../../../assets/images/logo.png")}
                imageStyle={{ height: '30px', resizeMode: 'contain' }}
            />

        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '30px', }}>
            <FlashingButton
                clickableImage
                clicked={() => {
                    /*   window.open("about:blank", "_self");
                      window.close(); */
                    props.history.push('/profile_info');

                }}
                image={require("../../../assets/images/user.png")}
            />
        </div>
    </div>
    )
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.authenticated,
        authRedirectPath: state.auth.authRedirectPath,
        userType: state.auth.userType,
        userToken: state.auth.userToken
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthLogin: (email, password, history, ) => dispatch(actions.authLogin(email, password, history)),
        onAuthRegister: (data, history) => dispatch(actions.authRegister(data, history)),
        onResetErrors: () => dispatch(actions.authFail()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent); 
