import React, { useEffect, useState } from 'react';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import axios from '../axios-orders';
import * as a from '../store/actions/actionTypes';
import * as actions from '../store/actions/index';
import * as _ from 'lodash';
import { updateObject, checkValidity, color } from '../shared/utility';
import classes from './client.css';
import QRCode from 'qrcode.react';
import { BrowserView, MobileView, /* isBrowser, isMobile */ } from "react-device-detect";
import useWindowDimensions from '../hooks/useWindowsDimensions';
import FlashingButton from '../components/UI/FlashingButton/FlashingButton'; 
import BdModal from '../components/UI/Modal/BdModal';
const UserTypeClient = props => {
    const { height, width } = useWindowDimensions();
    const { userType, userId } = props;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //  useEffect(() => { props.onClientDetails(props.userId.toString()).then(res => { if (res.status === '501') { setBalance(0); } if (res.status === '200') { setBalance(res.data.result[0].Balance); }; }); props.onClientTList(props.userId).then(res => { if (res.status === '501') { setTransList([]); } if (res.status === '200') { const list = _.orderBy(res.data.result, 'Date', 'desc'); setTransList([...list]); } }); const interval = setInterval(() => { setCheckTime(Date.now()) }, 5000); return () => { clearInterval(interval) } }, []);
    const [checkTime, setCheckTime] = useState();
    const [stopChecking, setStopChecking] = useState(false);
    const [pendingPayment, setPendingPayment] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => { const interval = setInterval(() => { setCheckTime(Date.now()) }, 5000); return () => { clearInterval(interval) } }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { if ((userType === 'client')) { pendingPayment && setOpenDialog(true); } }, [pendingPayment, userType]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if ((userType === 'client') && (!stopChecking)) {
            props.onGetPendingPayments(props.userToken).then(res => {
                if (res.status === '200') {
                    console.log('--props.onGetPendingPayments---------------');
                    console.log(res);


                    setStopChecking(true);

                    if (res.data.result[0].Code != null || res.data.result[0].Code != undefined)
                        setPendingPayment({
                            storeName: res.data.result[0].StoreName,
                            amount: res.data.result[0].Amount,
                            currency: res.data.result[0].Currency || '',
                            code: res.data.result[0].Code
                        });
                };

            });
        }
    }, [checkTime, stopChecking]);
 

    const aprovePaymentTransfer = (code) => {


        if (!code) return;

        props.onApprovePendingPayment(props.userToken, code).then(res => {
            if (res.status === '200') {
                console.log('---props.onApprovePendingPayment(code)-------------------------');
                console.log(code);
                console.log(res);
                setOpenDialog(false); setTimeout(() => { setStopChecking(false) }, 5000);
            };

        });
    }
    const mesageModalClosed = () => {
        setOpenDialog(false); setPendingPayment(null); setStopChecking(true);
        setTimeout(() => { setStopChecking(false) }, 10000);
    };

    let showPendingPayment = <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1, overflow: 'hidden', marginTop: '30px', }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', }}>
            <label style={{ fontSize: '0.9rem', color: color.alcanceOrange, }}>{'SOLICITUD DE TRANSACCIÓN '}</label>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>


            <p style={{ color: pendingPayment && !isNaN(+pendingPayment.amount) && (+pendingPayment.amount) > 0 ? 'blue' : color.black }} >
                {'$ '}
                <b style={{ color: pendingPayment && !isNaN(pendingPayment.amount) && (+pendingPayment.amount) > 0 ? 'green' : 'red' }}>
                    {(pendingPayment && pendingPayment.amount) || 0}
                </b>{' '}{pendingPayment && pendingPayment.currency}</p>
            <p style={{ color: color.alcanceOrange }}>{' Comercio ID:'}<b style={{ color: color.black }} > {pendingPayment && pendingPayment.storeName !== null ? pendingPayment.storeName : '---'}
            </b>
            </p>
            {/*    <Spinner /> */}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'inline-block', fontFamily: 'AvenirBlack', height: '30%', marginRight: '10px' }}
            >
                <FlashingButton
                    clicked={(e) => pendingPayment && aprovePaymentTransfer(pendingPayment.code)}
                    label={'ACEPTAR'}
                    style={{
                        color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '2px', minHeight: '20px', fontWeight: 'bold',
                        textAlign: ' center',
                        display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
                    }}
                    textStyle={{ fontSize: '12px' }}
                />
            </div>
            <div style={{ marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'inline-block', fontFamily: 'AvenirBlack', height: '30%', marginLeft: '10px' }}
            >
                <FlashingButton
                    clicked={(e) => mesageModalClosed(e)}
                    label={'RECHAZAR'}
                    style={{
                        color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '2px', minHeight: '20px', fontWeight: 'bold',
                        textAlign: ' center',
                        display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
                    }} textStyle={{ fontSize: '12px' }}
                />
            </div>
        </div>

    </div>;


    return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingLeft: '5%', paddingRight: '5%' }} >

        <MobileView style={{ width: width, height: height, marginTop: '48px', position: 'relative' }}>
            {openDialog && < div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
                <BdModal id='showPendingPayment' show={openDialog} modalClosed={(e) => { mesageModalClosed(e) }}
                    mobileStyle={{ top: '15%', left: '10%', right: '10%', width: undefined }}
                >
                    {showPendingPayment}
                </BdModal>
            </div>}

            <div className={classes.container} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', }}>
                < div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', }}>
                    <div style={{ marginBottom: '4%', borderLeft: `5px solid ${color.alcanceOrange}`, display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', }}>
                        <label style={{ fontSize: '1.4rem', color: color.alcanceOrange, marginLeft: '10px' }}>{'Pago'}</label>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign: 'left', marginTop: '70px' }}>
                        <QRCode value={props.showUserInfo.Code} style={{ width: '200px', height: '200px' }} />
                    </div>

                </div>
            </div>
        </MobileView>

        <BrowserView>
            <p>UNDER CONSTRUCTION</p>
        </BrowserView>


    </div >);
}
const mapStateToProps = state => {
    return {
        userType: state.auth.userType,
        userToken: state.auth.userToken,
        showUserInfo: state.al.showUserInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

        onGetPendingPayments: (token) => dispatch(actions.getPendingPayments({ type: a.VEN_GET_PENDING_PAYMENTS, data: { in_Token: token, } })),
        onApprovePendingPayment: (token, code) => dispatch(actions.approvePendingPayment({ type: a.VEN_APROVE_PAYMENT, data: { in_Token: token, in_Code: code } })),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(UserTypeClient, axios));
