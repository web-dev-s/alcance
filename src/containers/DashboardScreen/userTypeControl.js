import React, { useEffect, useState } from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import * as a from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';
import * as _ from 'lodash';
import { Grid, List, Avatar, ListItemAvatar, ListItemText, /* ListItemSecondaryAction,  */ListItem } from '@material-ui/core';
import FlashingButton from '../../components/UI/FlashingButton/FlashingButton';
/* import Spinner from '../../components/UI/Spinner/Spinner'; */
import classes from './DashBoardScreen';
import Input from '../../components/UI/Input/Input';
import balanceIMG from '../../assets/images/balance.png';
//import giveMoney from '../../assets/images/giveMoney.png';
//import receiveMoney from '../../assets/images/receiveMoney.png';

import giveMoney from '../../assets/images/redArrow.png';
import receiveMoney from '../../assets/images/greenArrow.png';
import wallet from '../../assets/images/wallet.png';
import password from '../../assets/images/password.png';
import clock from '../../assets/images/clock.png';
import Moment from 'moment';
import Card from '../../components/UI/Card/Card';
import { BrowserView, MobileView, /* isBrowser, isMobile */ } from "react-device-detect";

const UserTypeControl = props => {
    const [balance, setBalance] = useState(0);
    const [transList, setTransList] = useState([]);
    const [rechargeCode, setRechargeCode] = useState('');

    const [transferName, setTransferName] = useState('');
    const [transferDocID, setTransferDocID] = useState('');
    const [transferAmount, setTransferAmount] = useState('');
    const [newTransfer, setNewTransfer] = useState(false);
    const { userType } = props;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { if (userType === 'control') { props.onControlDetails(props.userId).then(res => { if (res.status === '501') setBalance(0); if (res.status === '200') { setBalance(res.data.result[0].Balance); }; }); props.onControlTList(props.userId).then(res => { if (res.status === '501') { setTransList([]); } if (res.status === '200') { const list = _.orderBy(res.data.result, 'Date', 'desc'); setTransList([...list]); } }); } }, []);
    const generateNewCode = () => {

        if (transferName.length < 1) return alert('... Nombre')
        if (transferDocID.length < 1) return alert('... Documientos')
        if ((transferAmount.length === 0) && (transferAmount < 0)) return alert('... Impostos')

        props.onControlGenerateCode(props.userId, transferName, transferDocID, transferAmount)
            .then(res => {
                setRechargeCode(res.data.result[0].Code);
                props.onControlDetails(props.userId).then(res => {
                    if (res.status === '501') setBalance(0)
                    if (res.status === '200') { setBalance(res.data.result[0].Balance); };
                });
                props.onControlTList(props.userId).then(res => {
                    if (res.status === '501') { setTransList([]); }
                    if (res.status === '200') { setTransList([...res.data.result]); }

                });
            });
    }
    return (<div className={classes.container} style={{ display: 'inline' }}>
        <div className={classes.container} style={{ display: 'inline', position: 'relative', width: '100%',/*  minHeight: '500px', */ backgroundPosition: 'center' }}>
            <BrowserView>
                < div style={{ display: 'contents', justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap', }}>
                    <Grid container item spacing={4} justify="flex-start" alignItems="flex-start">
                        <Grid zeroMinWidth container item xs={12} sm={6} lg={4} spacing={1}>
                            <Card title={'Saldo'} backgroundimage={wallet}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div style={{ marginTop: '4%', paddingTop: '10%', paddingRight: '4%' }}>
                                        <img src={balanceIMG} alt="balanceIMG" />
                                    </div>
                                    <div>
                                        <p style={{ color: +balance > 0 ? 'green' : 'red' }} ><b>{+balance * 41624.00 || 0}</b> $ Bolívares</p>
                                        <p style={{ color: +balance > 0 ? 'green' : 'red' }} ><b>{balance}</b> $ USD</p>
                                        <div style={{ marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'inline-block', fontFamily: 'AvenirBlack', width: '98%', height: '30%' }}
                                        >
                                            <FlashingButton
                                                clicked={(e) => alert('CAMBIAR')}
                                                label={'CAMBIAR'}
                                                style={{ color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '10px', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }} />
                                        </div>
                                    </div>

                                </div>
                            </Card>
                        </Grid>
                        <Grid zeroMinWidth container item xs={12} sm={6} lg={4} spacing={1}>
                            <Card title={'Operaciones recientes'} minWidth={'90%'} backgroundimage={clock}  >
                                <List style={{ minWidth: '98%' }} >
                                    {transList && transList.length
                                        ? transList.map((item, idx) => {
                                            /*    const labelId = `checkbox-list-secondary-label-${item.Name || item.PassportNumber}`;
                                               let checked = false; */
                                            return (
                                                <ListItem key={idx} button style={{ width: '100%' }} >
                                                    {/*    <ListItemAvatar>
                                                            <Avatar alt={`Avatar n°${idx + 1}`} src={+ item.Amount > 0 ? receiveMoney : giveMoney} style={{ padding: '10%' }} />
                                                        </ListItemAvatar> */}
                                                    < img alt={`Avatar n°${idx + 1}`} src={+item.Amount > 0 ? receiveMoney : giveMoney} style={{ width: '10px', height: '10px', marginRight: '2px', resize: 'contain', justifyContent: 'center', transform: 'rotate(180deg)' }} />
                                                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                                        <div style={{ display: 'flex', flex: 1, flexDirection: 'row', lineHeight: '1.1' }}>
                                                            <ListItemText id={idx + '3'} primary={+item.Amount > 0 ? 'Recibiste' : 'Enviaste'} style={{ color: +item.Amount > 0 ? 'green' : 'red', fontWeight: '900', paddingLeft: '5px', marginBottom: 0 }} />
                                                            <ListItemText id={idx + '1'} primary={'$' + item.Amount} style={{ color: 'blue', fontWeight: '900', width: '20%', display: 'flex', justifyContent: 'center' }} />
                                                            <ListItemText id={idx + '3'} primary={+item.Amount > 0 ? 'de ' : 'a ' + item.Name} style={{ color: 'green', fontWeight: '900', width: '20%', display: 'flex', justifyContent: 'center' }} />
                                                            <ListItemText id={idx + '4'} primary={'(' + item.PassportNumber + ')'} style={{ color: 'blue', fontWeight: '900', width: '20%', display: 'flex', justifyContent: 'center' }} />
                                                        </div>
                                                        <div style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'left' }}>
                                                            <ListItemText id={idx + '2'} primary={' in ' + item.Date} style={{ color: 'darkGray', paddingLeft: '5px', display: 'flex', marginTop: 0 }} />

                                                        </div>
                                                    </div>

                                                    {/* <ListItemSecondaryAction>
                                                                        <Checkbox

                                                            onChange={() => { checked = !checked }}
                                                            checked={checked}
                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                          />
                                                        </ListItemSecondaryAction> */}
                                                </ListItem>
                                            );
                                        })
                                        : (<ListItem key={1} button>
                                            <ListItemAvatar>
                                                <Avatar alt={`Avatar n°1`} src={balanceIMG} />
                                            </ListItemAvatar>
                                            <ListItemText id={1} primary={'No tienes operaciones recientes'} style={{ color: 'black', fontWeight: '900' }} />
                                        </ListItem>)
                                    }
                                </List>
                            </Card>
                        </Grid>
                        <Grid zeroMinWidth container item xs={12} sm={6} lg={4} spacing={1}   /*  xs={10} sm={8} md={6} lg={6} xl={3} */>
                            <Card title={'Generar código'} backgroundimage={password} >
                                <div style={{ display: 'flex', flexDirectiom: 'column', justifyContent: 'center', width: '100%', height: '100%', alignItems: 'center', textAlign: 'center' }}>
                                    {!(newTransfer) && (
                                        <div style={{ flex: 2, marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'flex', justifyContent: 'center', fontFamily: 'AvenirBlack', width: '70%', height: '60%' }}                                        >
                                            <FlashingButton
                                                clicked={(e) => { setNewTransfer(!newTransfer) }}
                                                label={'GENERAR'}
                                                style={{ color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '10px', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }}
                                            />
                                        </div>
                                    )}
                                    {(newTransfer && !rechargeCode && <div style={{ display: 'flex', paddingTop: '20px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '90%' }}>
                                        <Input

                                            containerStyle={{ width: '90%' }}
                                            labelStyle={{ textAlign: 'left', paddingLeft: '10px', }}
                                            inputStyle={{ paddingTop: '10px', minHeight: '40px', fontSize: '16px', marginLeft: '10px', paddingLeft: '10px', marginRight: '5px', textAlign: 'left' }}

                                            elementType='input'
                                            label={'Nombre'}
                                            elementConfig={{ type: 'text', placeholder: 'Nombre', }}
                                            value={transferName}
                                            changed={e => setTransferName(e.currentTarget.value)}
                                        />
                                        <Input
                                            containerStyle={{ width: '90%' }}
                                            labelStyle={{ textAlign: 'left', paddingLeft: '10px', }}
                                            inputStyle={{ paddingTop: '10px', minHeight: '40px', fontSize: '16px', marginLeft: '10px', paddingLeft: '10px', marginRight: '5px', textAlign: 'left' }}
                                            elementType='input'
                                            label={'Numero Documento'}
                                            elementConfig={{ type: 'text', placeholder: 'No. Documento', }}
                                            value={transferDocID}
                                            changed={e => setTransferDocID(e.currentTarget.value)}
                                        />
                                        <Input
                                            containerStyle={{ width: '90%' }}
                                            labelStyle={{ textAlign: 'left', paddingLeft: '10px', }}
                                            inputStyle={{ paddingTop: '10px', minHeight: '40px', fontSize: '16px', marginLeft: '10px', paddingLeft: '10px', marginRight: '5px', }}
                                            elementType='input'
                                            label={'Monto ricebido'}
                                            elementConfig={{ type: 'number', placeholder: '$ Monto', }}
                                            value={transferAmount}
                                            changed={e => setTransferAmount(e.currentTarget.value)}

                                        />

                                        {/*   <Input
      elementType='date'
      elementConfig={{ type: 'text', placeholder: 'Date' }}
      changed={text => setTransferDate({ ...transferDate, date: Moment(text).format('DD/MM/YYYY') })}
    /> */}

                                        <div style={{ flex: 2, marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'flex', justifyContent: 'center', fontFamily: 'AvenirBlack', width: '70%', height: '60%' }}                                        >
                                            <FlashingButton
                                                clicked={(e) => { generateNewCode() }}
                                                label={'ENVIAR'}
                                                style={{ color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '10px', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }} />
                                        </div>

                                        {/* <Button color="primary"
                                            style={{ marginTop: '12px', color: 'white', backgroundColor: '#f8bb48', borderRadius: '5px', fontSize: ' bold', textAlign: ' center', display: 'inline-block' }}
                                            onClick={(e) => generateNewCode()} >
                                            ENVIAR
      </Button> */}
                                    </div>)}
                                    {(rechargeCode) && <div>
                                        <p> <b>Nombre:</b> {transferName}</p>
                                        <p><b>No. Documento:</b> {transferDocID}</p>
                                        <p><b>Monto:</b> {transferAmount}</p>
                                        <p ><b>Fecha:</b> {Moment(new Date()).format('DD/MM/YYYY')}</p>
                                        <p style={{ fontSize: '22px', color: 'green', padding: '5px', fontWeight: '900', textAlilgn: 'center' }}> {rechargeCode}</p>

                                        <div style={{ flex: 2, marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'flex', justifyContent: 'center', fontFamily: 'AvenirBlack', width: '70%', height: '60%' }}                                        >
                                            <FlashingButton
                                                clicked={(e) => { setRechargeCode(null); setNewTransfer(true) }}
                                                label={'REGENERAR'}
                                                style={{ backgroundColor: '#f8bb48', color: 'white', alignSelf: 'center', borderRadius: '10px', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }} />
                                        </div>


                                        {/*   <Button color="primary"
                                                style={{ marginTop: '12px', marginBottom: '12px', color: 'white', backgroundColor: '#f8bb48', borderRadius: '5px', fontSize: ' bold', textAlign: ' center', display: 'inline-block' }}
                                                onClick={(e) => { setRechargeCode(null); setNewTransfer(true) }} >
                                                REGENERAR  </Button> */}
                                    </div>
                                    }
                                </div>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </BrowserView>
            <MobileView>
                <div className={classes.container} style={{ display: 'inline', marginBottom: '10%' }}>
                    < div style={{ display: 'contents', justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap', }}>
                        <Grid container item spacing={4} justify="flex-start" alignItems="flex-start">
                            <Grid zeroMinWidth container item xs={12} sm={12} md={6} lg={4} spacing={1}   /*  xs={10} sm={8} md={6} lg={6} xl={3} */>
                                <Card title={'Saldo'} backgroundimage={wallet}>
                                    <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                                        <div style={{ marginTop: '4%', paddingTop: '10%', paddingRight: '4%' }}>
                                            <img src={balanceIMG} alt="balanceIMG" />
                                        </div>
                                        <div>
                                            <div  >
                                                <p style={{ color: +balance > 0 ? 'blue' : 'orange' }} >
                                                    <b style={{ color: +balance > 0 ? 'green' : 'red' }}>
                                                        {+balance * 41624.00 || 0}
                                                    </b> $ Bolívares</p>
                                                <p style={{ color: +balance > 0 ? 'blue' : 'orange' }} >
                                                    <b style={{ color: +balance > 0 ? 'green' : 'red' }} >
                                                        {balance}
                                                    </b> $ USD</p>
                                            </div>
                                            <div style={{ marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'inline-block', fontFamily: 'AvenirBlack', width: '98%', height: '30%' }}
                                            >
                                                <FlashingButton
                                                    clicked={(e) => alert('CAMBIAR')}
                                                    label={'CAMBIAR'}
                                                    style={{ color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '10px', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }} />
                                            </div>
                                            {/* 
                                            <Button color="primary"
                                                style={{ marginTop: '12px', marginBottom: '12px', color: 'white', backgroundColor: '#f8bb48', borderRadius: '5px', fontSize: ' bold', textAlign: ' center', display: 'inline-block', fontFamily: 'AvenirBlack', width: '90%', height: '30%' }}
                                                onClick={(e) => alert('CAMBIAR')}>
                                                CAMBIAR
                                        </Button> */}
                                        </div>
                                    </div>
                                </Card>
                            </Grid>
                            <Grid zeroMinWidth container item xs={12} sm={12} md={6} lg={4} spacing={1}   /*  xs={10} sm={8} md={6} lg={6} xl={3} */>
                                <Card title={'Operaciones recientes'} backgroundimage={clock} >
                                    <List dense style={{ minWidth: '95%' }} >
                                        {transList && transList.length
                                            ? transList.map((item, idx) => {
                                                /*    const labelId = `checkbox-list-secondary-label-${item.Name || item.PassportNumber}`;
                                                   let checked = false; */
                                                return (
                                                    <ListItem key={idx} button>
                                                        {/*    <ListItemAvatar>
                                                            <Avatar alt={`Avatar n°${idx + 1}`} src={+ item.Amount > 0 ? receiveMoney : giveMoney} style={{ padding: '10%' }} />
                                                        </ListItemAvatar> */}
                                                        <img alt={`Avatar n°${idx + 1}`} src={+item.Amount > 0 ? receiveMoney : giveMoney} style={{ width: '10px', height: '10px', marginRight: '2px', resize: 'contain', justifyContent: 'center', transform: 'rotate(180deg)' }} />
                                                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                                            <div style={{ display: 'flex', flex: 1, flexDirection: 'row', lineHeight: '1.1' }}>
                                                                <ListItemText id={idx + '3'} primary={+item.Amount > 0 ? 'Recibiste' : 'Enviaste'} style={{ color: +item.Amount > 0 ? 'green' : 'red', fontWeight: '900', paddingLeft: '5px', marginBottom: 0 }} />
                                                                <ListItemText id={idx + '1'} primary={'$' + item.Amount} style={{ color: 'blue', fontWeight: '900', width: '20%', display: 'flex', justifyContent: 'center' }} />
                                                                <ListItemText id={idx + '3'} primary={+item.Amount > 0 ? 'de ' : 'a ' + item.Name} style={{ color: 'green', fontWeight: '900', width: '20%', display: 'flex', justifyContent: 'center' }} />
                                                                <ListItemText id={idx + '4'} primary={'(' + item.PassportNumber + ')'} style={{ color: 'blue', fontWeight: '900', width: '20%', display: 'flex', justifyContent: 'center' }} />
                                                            </div>
                                                            <div style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'left' }}>
                                                                <ListItemText id={idx + '2'} primary={' in ' + item.Date} style={{ color: 'darkGray', paddingLeft: '5px', display: 'flex', marginTop: 0 }} />

                                                            </div>
                                                        </div>

                                                        {/* <ListItemSecondaryAction>
                                                                        <Checkbox

                                                            onChange={() => { checked = !checked }}
                                                            checked={checked}
                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                          />
                                                        </ListItemSecondaryAction> */}
                                                    </ListItem>
                                                );
                                            })
                                            : (<ListItem key={1} button>
                                                <ListItemAvatar>
                                                    <Avatar alt={`Avatar n°1`} src={balanceIMG} />
                                                </ListItemAvatar>
                                                <ListItemText id={1} primary={'No tienes operaciones recientes'} style={{ color: 'black', fontWeight: '900' }} />
                                            </ListItem>)
                                        }
                                    </List>
                                </Card>
                            </Grid>
                            <Grid zeroMinWidth container item xs={12} sm={12} md={6} lg={4} spacing={1}   /*  xs={10} sm={8} md={6} lg={6} xl={3} */>
                                <Card title={'Generar código'} backgroundimage={password} >
                                    <div style={{ display: 'flex', flexDirectiom: 'column', justifyContent: 'center', width: '100%', height: '100%', alignItems: 'center', textAlign: 'center' }}>

                                        {!(newTransfer) && (
                                            <div style={{ flex: 2, marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'flex', justifyContent: 'center', fontFamily: 'AvenirBlack', width: '70%', height: '60%' }}                                        >
                                                <FlashingButton
                                                    clicked={(e) => { setNewTransfer(!newTransfer) }}
                                                    label={'GENERAR'}
                                                    style={{ color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '10px', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }}
                                                />
                                            </div>
                                        )}
                                        {(newTransfer && !rechargeCode && <div style={{ display: 'flex', paddingTop: '20px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '90%' }}>
                                            <Input

                                                containerStyle={{ width: '90%' }}
                                                labelStyle={{ textAlign: 'left', paddingLeft: '10px', }}
                                                inputStyle={{ paddingTop: '10px', minHeight: '40px', fontSize: '16px', marginLeft: '10px', paddingLeft: '10px', marginRight: '5px', textAlign: 'left' }}

                                                elementType='input'
                                                label={'Nombre'}
                                                elementConfig={{ type: 'text', placeholder: 'Nombre', }}
                                                value={transferName}
                                                changed={e => setTransferName(e.currentTarget.value)}
                                            />
                                            <Input
                                                containerStyle={{ width: '90%' }}
                                                labelStyle={{ textAlign: 'left', paddingLeft: '10px', }}
                                                inputStyle={{ paddingTop: '10px', minHeight: '40px', fontSize: '16px', marginLeft: '10px', paddingLeft: '10px', marginRight: '5px', textAlign: 'left' }}
                                                elementType='input'
                                                label={'Numero Documento'}
                                                elementConfig={{ type: 'text', placeholder: 'No. Documento', }}
                                                value={transferDocID}
                                                changed={e => setTransferDocID(e.currentTarget.value)}
                                            />
                                            <Input
                                                containerStyle={{ width: '90%' }}
                                                labelStyle={{ textAlign: 'left', paddingLeft: '10px', }}
                                                inputStyle={{ paddingTop: '10px', minHeight: '40px', fontSize: '16px', marginLeft: '10px', paddingLeft: '10px', marginRight: '5px', }}
                                                elementType='input'
                                                label={'Monto ricebido'}
                                                elementConfig={{ type: 'number', placeholder: '$ Monto', }}
                                                value={transferAmount}
                                                changed={e => setTransferAmount(e.currentTarget.value)}

                                            />

                                            {/*   <Input
      elementType='date'
      elementConfig={{ type: 'text', placeholder: 'Date' }}
      changed={text => setTransferDate({ ...transferDate, date: Moment(text).format('DD/MM/YYYY') })}
    /> */}

                                            <div style={{ flex: 2, marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'flex', justifyContent: 'center', fontFamily: 'AvenirBlack', width: '70%', height: '60%' }}                                        >
                                                <FlashingButton
                                                    clicked={(e) => { generateNewCode() }}
                                                    label={'ENVIAR'}
                                                    style={{ color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '10px', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }} />
                                            </div>

                                            {/* <Button color="primary"
                                            style={{ marginTop: '12px', color: 'white', backgroundColor: '#f8bb48', borderRadius: '5px', fontSize: ' bold', textAlign: ' center', display: 'inline-block' }}
                                            onClick={(e) => generateNewCode()} >
                                            ENVIAR
      </Button> */}
                                        </div>)}
                                        {(rechargeCode) && <div>
                                            <p> <b>Nombre:</b> {transferName}</p>
                                            <p><b>No. Documento:</b> {transferDocID}</p>
                                            <p><b>Monto:</b> {transferAmount}</p>
                                            <p ><b>Fecha:</b> {Moment(new Date()).format('DD/MM/YYYY')}</p>
                                            <p style={{ fontSize: '22px', color: 'green', padding: '5px', fontWeight: '900', textAlilgn: 'center' }}> {rechargeCode}</p>

                                            <div style={{ flex: 2, marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'flex', justifyContent: 'center', fontFamily: 'AvenirBlack', width: '70%', height: '60%' }}                                        >
                                                <FlashingButton
                                                    clicked={(e) => { setRechargeCode(null); setNewTransfer(true) }}
                                                    label={'REGENERAR'}
                                                    style={{ backgroundColor: '#f8bb48', color: 'white', alignSelf: 'center', borderRadius: '10px', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }} />
                                            </div>


                                            {/*   <Button color="primary"
                                                style={{ marginTop: '12px', marginBottom: '12px', color: 'white', backgroundColor: '#f8bb48', borderRadius: '5px', fontSize: ' bold', textAlign: ' center', display: 'inline-block' }}
                                                onClick={(e) => { setRechargeCode(null); setNewTransfer(true) }} >
                                                REGENERAR  </Button> */}
                                        </div>
                                        }
                                    </div>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                </div >
            </MobileView>
        </div >
    </div >);
};

const mapStateToProps = state => {
    return {
        userType: state.auth.userType,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),

        onClientDetails: (id) => dispatch(actions.clientGetDetails({ type: a.VEN_CONTROL_GET_DETAILS, data: { in_ID: id } })),
        onComercioDetails: (id) => dispatch(actions.comercioGetDetails({ type: a.VEN_CONTROL_GET_DETAILS, data: { in_ID: id } })),
        onControlDetails: (id) => dispatch(actions.controlGetDetails({ type: a.VEN_CONTROL_GET_DETAILS, data: { in_ID: id } })),


        onClientTList: (id) => dispatch(actions.clientGetTransactionHistory({ type: a.VEN_CLIENT_GET_TRANSACTIONS_LIST, data: { in_ClientID: id } })),
        onComercioTList: (id) => dispatch(actions.comercioGetTransactionHistory({ type: a.VEN_COMERCIO_GET_TRANSACTIONS_LIST, data: { in_ComercioID: id } })),
        onControlTList: (id) => dispatch(actions.controlGetTransactionHistory({ type: a.VEN_CONTROL_GET_TRANSACTIONS_LIST, data: { in_ControlID: id } })),

        onControlGenerateCode: (id, name, docId, amount) => dispatch(actions.controlGenerateCode({ type: a.VEN_CONTROL_GENERATE_CODE, data: { in_ControlID: id, in_Name: name, in_PassportNumber: docId, in_Amount: amount } })),
        onClientChargeAccount: (id, code) => dispatch(actions.clientChargeAccount({ type: a.VEN_CLIENT_CHARGE_ACCOUNT, data: { in_ClientID: id, in_Code: code } })),

        onComercioAddPaymentRequest: (id, client_ID, reqAmount) => dispatch(actions.comercioAddPaymentRequest({ type: a.VEN_COMERCIO_ADD_PAYMENT_REQUEST, data: { in_ComercioID: id, in_ClientID: client_ID, in_Amount: reqAmount } })),
        onClientCheckPendingPayments: (id) => dispatch(actions.clientCheckPendingPayments({ type: a.VEN_CLIENT_CHECK_PENDING_PAYMENTS, data: { in_ClientID: id } })),
        onApprovePaymentTransfer: (reqId) => dispatch(actions.clientApprovePaymentTransfer({ type: a.VEN_CLIENT_APPROVE_PAYMENT_TRANSFER, data: { in_RequestID: reqId } }))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(UserTypeControl, axios));


