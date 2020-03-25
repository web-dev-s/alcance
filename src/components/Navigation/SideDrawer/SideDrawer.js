import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { BrowserView, MobileView, } from "react-device-detect";
import Uxi from '../../../hoc/Uxi/Uxi';
import defaultAvatar from '../../../assets/images/user.png'
const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Uxi>
            <BrowserView>
                <Backdrop show={props.open} clicked={props.closed} />
                <div className={attachedClasses.join(' ')} onClick={props.closed}  >
                    <div className={classes.Logo}>
                        <Logo />
                    </div>
                    {
                        props.isAuthenticated &&
                        <div onClick={props.avatarPress} style={{ flex: '0.5', height: '40px', paddingLeft: '5px', paddingRight: '5px', paddingBottom: '5%' }}>
                            <div style={{ flex: 1, height: '40px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                <img src={props.profileImage?props.profileImage:defaultAvatar} alt="avatar" style={{ height: '40px', width: '40px', borderRadius: '50%', resize: 'contain', }} />
                            </div>
                        </div>
                    }

                    <nav>
                        <NavigationItems isAuthenticated={props.isAuth} style={{ flexFlow: 'column', alignItems: 'stretch' }} />
                    </nav>
                </div>
            </BrowserView>
            <MobileView>
                <Backdrop show={props.open} clicked={props.closed} />
                <div className={props.open ? classes.Open : classes.Close} onClick={props.closed}
                    style={{
                        position: 'fixed', width: '320px', maxWidth: '80%', height: '100%', left: '0', top: '0',
                        zIndex: '200', backgroundColor: 'whitesmoke', padding: '32px 16px', boxSizing: 'border-box', transition: 'transform 0.3s ease-out',
                    }}
                >
                    <div className={classes.Logo}>
                        <Logo />
                    </div>
                    {
                        props.isAuthenticated &&
                        <div onClick={props.avatarPress} style={{ flex: '0.5', height: '40px', paddingLeft: '5px', paddingRight: '5px', paddingBottom: '5%' }}>
                            <div style={{ flex: 1, height: '40px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                <img src={props.profileImage?props.profileImage:defaultAvatar} alt="avatar" style={{ height: '40px', width: '40px', borderRadius: '50%', resize: 'contain', }} />
                            </div>
                        </div>
                    }

                    <nav>
                        <NavigationItems isAuthenticated={props.isAuth} style={{ flexFlow: 'column', alignItems: 'stretch' }} />
                    </nav>
                </div>
            </MobileView>

        </Uxi >
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.authenticated,
        profileImage: state.al.profileImage,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onSetShowUserInfo: (showUserInfo) => dispatch(actions.setShowUserInfo({ showUserInfo: showUserInfo })),

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(sideDrawer);
