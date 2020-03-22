

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classes from './comComponents.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity, color } from '../../shared/utility';
import { BrowserView, MobileView } from "react-device-detect";
import ReactResizeDetector from 'react-resize-detector';
import FlashingButton from '../../components/UI/FlashingButton/FlashingButton';
const FooterComponent = (props) => {

    return (<div style={{ backgroundColor: color.white, position: 'fixed', bottom: '0px', left: 0, right: 0, height: '45px', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', 
    backgroundColor: '#FFFFFF',boxShadow: '0px 0px 10px rgba(248, 188, 60, 0.6)',borderRadius: '10px 10px  0px  0px', 
    ...props.mainContainerStyle }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '30px', }}>
            <FlashingButton
                clickableImage
                clicked={() => { props.onBackClick && props.onBackClick() }}
                image={require("../../assets/images/chevron-left.png")}
            />

        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '30px', }}>
            <FlashingButton
                clickableImage
                clicked={() => { window.location.reload(); }}
                image={require("../../assets/images/reload.png")}
            />

        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '30px', }}>
            <FlashingButton
                clickableImage
                clicked={() => {
                    window.open("about:blank", "_self");
                    window.close();
                }}
                image={require("../../assets/images/log-out.png")}
            />
        </div>
    </div>)
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

export default connect(mapStateToProps, mapDispatchToProps)(FooterComponent); 
