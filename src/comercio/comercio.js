import React, { useEffect, useState } from 'react';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import axios from '../axios-orders';
import * as a from '../store/actions/actionTypes';
import * as actions from '../store/actions/index';
import * as _ from 'lodash'; 
import classes from './comercio.css';  
import { BrowserView, MobileView, /* isBrowser, isMobile */ } from "react-device-detect";
import NewLinkCard from '../components/UI/Card/newLinkCard';
import { updateObject, checkValidity, color } from '../shared/utility';
import useWindowDimensions from '../hooks/useWindowsDimensions';
const UserTypeComercio = props => {
    const { height, width } = useWindowDimensions(); 
    const { showUserInfo } = props;

    return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingLeft: '5%', paddingRight: '5%' ,marginTop: '48px',}} >

        <MobileView style={{ width: width, height: height, marginTop: '48px', position: 'relative' }}>
            < div style={{ position: 'absolute', width: '100%',/*  height: '100%', */ overflow: 'hidden' }}>
                <div key={'mainContainer'}
                   /*  className={classes.container}  */ style={{
                        display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', margin: '0px',
                        minHeight: (+height).toString() + 'px',
                        minWidth: width,
                        color: color.brown,
                    }}>

                    <div style={{
                        display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', margin: '0px',
                        maxHeight: (+height).toString() + 'px',
                        overflowY: 'auto', paddingBottom: '45px',
                        position: 'absolute', top: '0px', bottom: '0px', left: '5px', right: '5px',

                    }}  >
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: '15px', paddingBottom: '15px', marginBottom: '4%' }}>
                            <label style={{ fontSize: '1.4rem', color: color.alcanceOrange }}>{'Bienvenido, '}</label>
                            <label style={{ fontSize: '1.4rem', color: color.alcanceOrange }}> {showUserInfo.Name} {showUserInfo.Surname}{'.'}</label>
                        </div>
                        <div style={{
                            boxSizing: 'border-box', boxShadow: '0 2px 8px #ccc',
                            border: '1px solid lightgray', borderRadius: '4px',
                            overflowY: 'auto', padding: '5px',

                            display: 'flex', justifyContent: 'center', textAlign: 'center', flex: 0,
                            flex: '0 0 20%',

                            paddingBottom: '5px',
                            width: '100%',
                            position: 'relative',
                            overflow: 'hidden',
                            marginBottom: '15px',
                        }}>


                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '8px', paddingTop: '30px', paddingBottom: '30px' }}>
                                <label style={{ color: color.alcanceOrange, fontSize: '14px', paddingTop: '10px', paddingBottom: '10px' }}>{'SALDO'}</label>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '12px' }}>

                                    <label style={{ color: +showUserInfo.BalanceBS > 0 ? 'blue' : color.brown, fontWeight: '400', margin: '3px', textAlign: 'justify' }} >
                                        $ <b style={{ color: +showUserInfo.BalanceBS > 0 ? 'green' : 'red' }}>
                                            {new Intl.NumberFormat('en-EN').format(+showUserInfo.BalanceBS)}
                                        </b>   BS</label>
                                </div>
                            </div>

                        </div>

                        <NewLinkCard title={'OPERACIONES RECIENTES'} clicked={() => { props.history.push('comercio_operaciones') }}
                            textWrapperStyle={{ marginTop: '10px', marginBottom: '10px', height: undefined }}
                            mainContainerStyle={{ maxHeight: '40px', marginTop: '10px', marginBottom: '10px', }}
                        />
                        <NewLinkCard title={'SOLICITAR PAGO'} clicked={() => { props.history.push('comercio_pago') }}
                            textWrapperStyle={{ marginTop: '10px', marginBottom: '10px', height: undefined }}
                            mainContainerStyle={{ maxHeight: '40px', marginTop: '20px', marginBottom: '10px', }}
                        />
                    </div>

                </div >
            </div>
        </MobileView>

        <BrowserView>  
            <p>UNDER CONSTRUCTION</p> 
        </BrowserView>


    </div>);
};

const mapStateToProps = state => {
    return {
        userType: state.auth.userType,
        userToken: state.auth.userToken,
        showUserInfo: state.al.showUserInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')), 
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(UserTypeComercio, axios));
