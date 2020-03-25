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
const Client_Operaciones = props => {

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
    const mesageModalClosed = () => {
        setOpenDialog(false); setPendingPayment(null); setStopChecking(true);
        setTimeout(() => { setStopChecking(false) }, 5000);
    };
    let showMessage = <div style={{ zIndex: '200', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', }}>
            <h2 style={{ marginTop: '12px', color: 'black', fontWeight: '900', textAlign: ' center', display: 'inline-block' }}
            > Solicitud de transacción </h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', }}>
            <div style={{ marginTop: '3%', paddingTop: '3%', paddingRight: '4%' }}>
                <img src={giveMoney} alt="giveMoney" />
            </div>
            <div>
                <p style={{ color: pendingPayment && !isNaN(+pendingPayment.amount) && (+pendingPayment.amount) > 0 ? 'blue' : 'orange' }} >
                    <b style={{ color: pendingPayment && !isNaN(pendingPayment.amount) && (+pendingPayment.amount) > 0 ? 'green' : 'red' }}>
                        {(pendingPayment && pendingPayment.amount * 41624.00) || 0}
                    </b> $ Bolívares</p>
                <p style={{ color: pendingPayment && !isNaN(+pendingPayment.amount) && (+pendingPayment.amount) > 0 ? 'blue' : 'orange' }} >
                    <b style={{ color: pendingPayment && !isNaN(pendingPayment.amount) && (+pendingPayment.amount) > 0 ? 'green' : 'red' }} >
                        {(pendingPayment && !isNaN(+pendingPayment.amount)) ? pendingPayment.amount : 0}
                    </b> $ USD</p>
                <p style={{ 'blue': 'darkBlue' }} >
                </p>
                <p> Comercio ID: <b style={{ color: 'green' }} > {pendingPayment && pendingPayment.id !== null ? pendingPayment.id : '---'}
                </b>  </p>

            </div>

            {/*    <Spinner /> */}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', }}>
            <Button color="primary"
                style={{ marginTop: '12px', width: '30%', color: 'white', backgroundColor: '#f8bb48', borderRadius: '5px', fontWeight: '900', textAlign: ' center', display: 'inline-block' }}
                onClick={() => mesageModalClosed()}>
                NO INTERESA
</Button>
            <Button color="primary"
                style={{ marginTop: '12px', width: '30%', color: 'white', backgroundColor: '#f8bb48', borderRadius: '5px', fontWeight: '900', textAlign: ' center', display: 'inline-block' }}
                onClick={() => aprovePaymentTransfer()}>
                PAGAR
</Button>
        </div>
    </div >;


    const Card = (props) => {
        return < div style={{
            boxSizing: 'border-box', boxShadow: '0 2px 8px #ccc',
            border: '1px solid lightgray', borderRadius: '3px',
            display: 'block', overflowY: 'auto', padding: '5px',
            maxHeight: '800px',
            minWidth: props.minWidth ? props.minWidth : ('60%' || '300px'),
            justifyContent: 'center', textAlign: 'center',
            minHeight: '60%',

            maxWidth: '99%',
            paddingBottom: '5px',
            width: '90%',
            position: 'relative',
            overflow: 'hidden',
            marginTop: '10px', marginBottom: '10px',
        }
        }>
            {props.children}
        </div >
    }


    useEffect(() => {
       /*  props.onGetAllTransactionsForUser(props.token).then(res => {
            console.log('-----onGetAllTransactionsForUser--------------');
            console.log(res);
            if (res.status === '200') setTransList([...res.data.result])


        }); */



    }, []);


    return (<div className={classes.container} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: '10px', marginRight: '10px', marginTop: '18%' }}>

        <div className={classes.container} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
            <BrowserView>
                <p>UNDER CONSTRUCTION</p>    </BrowserView>
            <MobileView>
                <div className={classes.container} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginTop: '2%' }}>

                    < div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', }}>

                        <div style={{ marginBottom: '4%', borderLeft: `5px solid ${color.alcanceOrange}`, display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center', }}>
                            <text style={{ fontSize: '1.4rem', color: color.alcanceOrange, marginLeft: '10px' }}>{'Operaciones recientes'}</text>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign: 'left', marginTop: '20px' }}>
                            <List dense style={{ minWidth: '99%' }}>
                                {transList && transList.length ? transList.map((item, idx) => {
                                    /*     const labelId = `checkbox-list-secondary-label-${item.Name || item.PassportNumber}`;
                                        let checked = false; */
                                    return (
                                        <ListItem key={idx} button style={{ display: 'flex', width: '100%' }}>
                                            <img alt={`Avatar n°${idx + 1}`} src={+item.Amount > 0 ? receiveMoney : giveMoney} style={{ width: '10px', height: '10px', marginRight: '2px', resize: 'contain', justifyContent: 'center', transform: 'rotate(180deg)' }} />

                                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', lineHeight: '1.1' }}>
                                                    <ListItemText id={idx + '3'} primary={+item.Amount > 0 ? 'Recibiste' : 'Enviaste'} style={{ color: +item.Amount > 0 ? 'green' : 'red', fontWeight: '900', paddingLeft: '5px', marginBottom: 0 }} />
                                                    <ListItemText id={idx + '2'} primary={'$' + item.Amount} style={{ color: +item.Amount > 0 ? 'green' : 'red', fontWeight: '900', display: 'flex', justifyContent: 'center' }} />
                                                    {(item.ComercioID) && <ListItemText id={idx + '13'} primary={+item.Amount > 0 ? 'de ' : 'a ' + item.ComercioID} style={{ color: +item.Amount > 0 ? 'green' : 'red', display: 'flex', justifyContent: 'center' }} />
                                                    }
                                                    {(item.ControlID) && <ListItemText id={idx + '13'} primary={+item.Amount > 0 ? 'de ' : 'a ' + item.ControlID} style={{ color: +item.Amount > 0 ? 'green' : 'red', display: 'flex', justifyContent: 'center' }} />
                                                    }
                                                    {(item.PassportNumber) &&
                                                        <ListItemText id={idx + '1'} primary={'(' + item.PassportNumber + ')'} style={{ color: 'blue', fontWeight: '900', display: 'flex', justifyContent: 'center' }} />
                                                    }
                                                </div>
                                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'left' }}>
                                                    <ListItemText id={idx + '1'} primary={' in ' + item.Date} style={{ color: 'darkGray' /* +item.Amount > 0 ? 'green' : 'red'  */, paddingLeft: '5px', display: 'flex', marginTop: 0 }} />
                                                </div>
                                                {/*  {(item.Name || item.PassportNumber) && <ListItemText id={idx + '1'} primary={' from ' + item.Name + '(' + item.PassportNumber + ')'} style={{ color: +item.Amount > 0 ? 'blue' : 'green' }} />} */}

                                            </div>


                                        </ListItem>
                                    );
                                }) : <ListItem key={1} button>
                                        <ListItemAvatar>
                                            <Avatar alt={`Avatar n°1`} src={balanceIMG} />
                                        </ListItemAvatar>
                                        <ListItemText id={1} primary={'No tienes operaciones recientes'} style={{ color: 'black', fontWeight: '900', paddingTop: '30px', paddingBottom: '30px' }} />
                                    </ListItem>}
                            </List>
                        </div>

                    </div>

                </div>
            </MobileView>
        </div >
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

        onGetAllTransactionsForUser: (token) => dispatch(actions.setShowUserInfo({ type: a.VEN_GET_ALL_TRANSACTIONS, data: { in_Token: token } })),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Client_Operaciones, axios));
