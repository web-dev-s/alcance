import React from 'react';
import { connect } from 'react-redux';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import { isMobile } from "react-device-detect";
import defaultAvatar from '../../../assets/images/user.png'
import FlashingButton from '../../UI/FlashingButton/FlashingButton';
const Toolbar = (props) => (
    <header className={classes.Toolbar} style={{ height: isMobile ? '28px' : '56px', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <DrawerToggle clicked={props.drawerToggleClicked} />

        <div className={classes.Logo} style={{ flex: 1, backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            {props.isAuthenticated && <Logo height={'100%'} containerStyle={{ height: '100%', padding: 0 }} imageStyle={{ height: '100%' }} />}
        </div>
        <nav className={classes.DesktopOnly} style={{ flex: 0, paddingLeft: '2%' }}>
            <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
        {props.isAuthenticated &&
            <div onClick={props.avatarPress} style={{ width: '40px', height: '40px', paddingLeft: '2%', paddingRight: '5px', paddingTop: '5px', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                <FlashingButton
                clickableImage
                clicked={() => {
                    /*   window.open("about:blank", "_self");
                      window.close(); */
                    props.history.push('/profile_info');

                }}
                image={props.profileImage?props.profileImage:defaultAvatar}
                imageStyle={{maxWidth:'24px', maxHeight:'24px', resizeMode:'contain'}}
            />
                </div>
            </div>
        }
    </header>
);

const mapStateToProps = state => {

    return {
        isAuthenticated: state.auth.authenticated,
        profileImage: state.al.profileImage,
        userType: state.auth.userType,
        userId: state.auth.userId
    }
}
export default connect(mapStateToProps, null)(Toolbar);