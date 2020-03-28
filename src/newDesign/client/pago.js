import React, { useEffect, useState } from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import * as a from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';
import * as _ from 'lodash';
import { Button, Grid, List, Avatar, ListItemAvatar, ListItemText, ListItem } from '@material-ui/core';
import { updateObject, checkValidity, color } from '../../shared/utility';
import FlashingButton from '../../components/UI/FlashingButton/FlashingButton';
/* import Spinner from '../../components/UI/Spinner/Spinner'; */
import Modal from '../../components/UI/Modal/Modal';
import classes from './client.css';
import Input from '../../components/UI/Input/Input';
import balanceIMG from '../../assets/images/balance.png';
import arrow from '../../assets/images/chevron-right.png';
import giveMoney from '../../assets/images/redArrow.png';
import receiveMoney from '../../assets/images/greenArrow.png';

import wallet from '../../assets/images/wallet.png';
import paymentMethod from '../../assets/images/payment-method.png';
import password from '../../assets/images/password.png';
import clock from '../../assets/images/clock.png';
import customerSupport from '../../assets/images/customer-support.png';
import QRCode from 'qrcode.react';
import Cards from '../../components/UI/Card/Card';
import NewLinkCard from '../../components/UI/Card/newLinkCard';
import { BrowserView, MobileView, /* isBrowser, isMobile */ } from "react-device-detect";
import useWindowDimensions from '../../hooks/useWindowsDimensions';
const UserTypeClient = props => {
    const { height, width } = useWindowDimensions();
    const [checkTime, setCheckTime] = useState();
    const [stopChecking, setStopChecking] = useState(false);
    const [pendingPayment, setPendingPayment] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const [balance, setBalance] = useState(0);
    const [transList, setTransList] = useState([]);
    const [rechargeCode, setRechargeCode] = useState('');
    const [rechargeCodeMessage, setRechargeCodeMessage] = useState('');
    const [generatedQR, setGeneratedQR] = useState(null);

    const { userType, userId } = props;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //  useEffect(() => { props.onClientDetails(props.userId.toString()).then(res => { if (res.status === '501') { setBalance(0); } if (res.status === '200') { setBalance(res.data.result[0].Balance); }; }); props.onClientTList(props.userId).then(res => { if (res.status === '501') { setTransList([]); } if (res.status === '200') { const list = _.orderBy(res.data.result, 'Date', 'desc'); setTransList([...list]); } }); const interval = setInterval(() => { setCheckTime(Date.now()) }, 5000); return () => { clearInterval(interval) } }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //  useEffect(() => { if ((userType === 'client')) { pendingPayment && setOpenDialog(true); } }, [pendingPayment, userType]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //  useEffect(() => {
    //      if ((userType === 'client') && (!stopChecking)) {
    //          props.onClientCheckPendingPayments(userId).then(res => { if (res.status === '200') { setStopChecking(true); setPendingPayment({ id: res.data.result[0].ID, amount: res.data.result[0].Amount }); } });
    //      }
    //  }, [props, checkTime, userType, userId, stopChecking]);

    const chargeAcount = () => {
        props.onClientChargeAccount(props.userId, rechargeCode).then(res => {

            if (res.status === '200') {
                props.onClientDetails(props.userId).then(res => {
                    if (res.status === '501') { setBalance(0); }
                    if (res.status === '200') { setBalance(res.data.result[0].Balance); };
                });
                props.onClientTList(props.userId).then(res => {
                    if (res.status === '501') { setTransList([]); }
                    if (res.status === '200') { setTransList([...res.data.result]); }
                });

                setRechargeCodeMessage(<p style={{ color: 'green', fontWeight: '900' }}> Monto ingresado</p>);

            } else setRechargeCodeMessage(<p style={{ color: 'red', fontWeight: '900' }}>Código invalido ( {res.message} )</p>);
        });
    }
    const aprovePaymentTransfer = () => {
        if (pendingPayment.id === null) return;

        props.onApprovePaymentTransfer(pendingPayment.id).then(res => {
            if (res.status === '200') {
                setBalance(res.data.result[0].Balance);

                setOpenDialog(false); props.onClientTList(props.userId).then(res => {
                    if (res.status === '501') { setTransList([]); }
                    if (res.status === '200') { setTransList([...res.data.result]); setStopChecking(false); }
                });
            };
            /*   console.log('props.onApprovePaymentTransfer' + pendingPayment.id + '=>' + JSON.stringify(res)); */
        });
    }


    return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingLeft: '5%', paddingRight: '5%' }} >

        <MobileView style={{ width: width, height: height, marginTop: '48px', position: 'relative' }}>
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
        userId: state.auth.userId,
        showUserInfo: state.al.showUserInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {


    };
};

export default connect(mapStateToProps, null)(withErrorHandler(UserTypeClient, axios));
