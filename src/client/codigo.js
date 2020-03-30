import React, { useEffect, useState } from 'react';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import axios from '../axios-orders';
import * as a from '../store/actions/actionTypes';
import * as actions from '../store/actions/index';
import * as _ from 'lodash';

import { updateObject, checkValidity, color } from '../shared/utility';
import FlashingButton from '../components/UI/FlashingButton/FlashingButton';
import FlashingButtonShare from '../components/UI/FlashingButton/FlasingButtonShare';
/* import Spinner from '../../components/UI/Spinner/Spinner'; */
import classes from './client.css';
import Input from '../components/UI/Input/Input';
import copy from '../assets/images/copy.png';
import share from '../assets/images/share.png';
import error from '../assets/images/error.png'
import { BrowserView, MobileView, /* isBrowser, isMobile */ } from "react-device-detect";
import useWindowDimensions from '../hooks/useWindowsDimensions';
const Client_Codigo = props => {
    const { height, width } = useWindowDimensions();
    const [amount, setAmount] = useState('');

    const [balance, setBalance] = useState({ currency: 'USD', value: +props.showUserInfo.BalanceUSD });

    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const { BalanceUSD, BalanceMXN, BalanceBS } = props.showUserInfo;
        switch (balance.currency) {
            case 'USD': setBalance({ ...balance, value: +BalanceUSD }); break;
            case 'MXN': setBalance({ ...balance, value: +BalanceMXN }); break;
            case 'BS': setBalance({ ...balance, value: +BalanceBS }); break;
            default: setBalance({ currency: 'USD', value: +props.showUserInfo.BalanceUSD })
        }

    }, []);
    useEffect(() => {
        const { BalanceUSD, BalanceMXN, BalanceBS } = props.showUserInfo;
        switch (balance.currency) {
            case 'USD': setBalance({ ...balance, value: +BalanceUSD }); break;
            case 'MXN': setBalance({ ...balance, value: +BalanceMXN }); break;
            case 'BS': setBalance({ ...balance, value: +BalanceBS }); break;
            default: setBalance({ currency: 'USD', value: +props.showUserInfo.BalanceUSD })
        }

    }, [balance.currency]);


    const generateCode = () => {
        if (!+amount > 0) return setMessage('Monto no puede ser inferior a 1');
        if (!(balance.currency.length > 1)) return setMessage('Seleccione el tipo de moneda');

        if ((balance.currency.length > 1) && (balance.currency.length > 1)) {

            console.log('-------------------------------------------------------------');
            console.log(props);
            console.log(amount);
            console.log(balance.currency);
            //props.onGenerateTransferCode(props.userToken, amount, currency);
            props.onGenerateTransferCode(props.userToken, amount, balance.currency)
                .then(res => {

                    if (res.status == 200) {
                        if (res.data && res.data.result)
                            setCode(res.data.result[0].Code);
                    }
                    if (res.status == 501) {
                        setMessage(res.message);

                    }

                });
        }


    }

    const copyToClipboard = () => {
        const textField = document.createElement('textarea');
        textField.innerText = code;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
    };
    const showMessage = (element, msg) => {
        alert(msg);

    }
    return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingLeft: '5%', paddingRight: '5%' }} >

        <MobileView style={{ width: width, height: height, marginTop: '48px', position: 'relative' }}>
            <div className={classes.container} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', }}>
                < div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch', }}>
                    <div style={{ marginBottom: '4%', borderLeft: `5px solid ${color.alcanceOrange}`, display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center', }}>
                        <label style={{ fontSize: '1.4rem', color: color.alcanceOrange, marginLeft: '10px' }}>{'Generar  código'}</label>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', textAlign: 'left', marginTop: '0px' }}>
                        <p style={{ fontSize: '12px' }} > {'Introduzca el monto para generar el codigo:'}</p>
                        <Input

                            label={'Monto:'}
                            labelStyle={{ color: color.alcanceOrange, /* fontStyle: 'italic', */ textAlign: 'left', fontSize: '12px' }}
                            containerStyle={{
                                borderBottom: '2px solid #ccc',
                                display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center',
                                width: '100%', paddingTop: '2px', minHeight: '50px', fontSize: '12px', marginRight: '5px', marginLeft: '5px',
                            }}
                            middleContainerStyle={{ border: 'none', }}
                            inputStyle={{ minHeight: '50px', border: 'none', fontSize: '14px', outline: 'none' }}
                            // leftImage={require("../../assets/images/user.png")}
                            elementType='input'
                            elementConfig={{ type: 'number', placeholder: 'monto', }}
                            value={amount}
                            // invalid={!emailValid}
                            // shouldValidate={{ required: true, isEmail: true }}
                            // touched={emailTouched}
                            changed={(e) => { setAmount(e.target.value) }}
                            onFocus={(e) => { setMessage(''); }}
                        />
                        <Input
                            label={'Moneda:'}
                            labelStyle={{ color: color.black, /* fontStyle: 'italic', */ textAlign: 'left', fontSize: '12px' }}
                            containerStyle={{
                                borderBottom: '2px solid #ccc', outline: 'none',
                                display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center',
                                width: '100%', paddingTop: '2px', minHeight: '50px', fontSize: '12px', marginRight: '5px', marginLeft: '5px', marginTop: '20px'
                            }}
                            middleContainerStyle={{ border: 'none', outline: 'none' }}
                            inputStyle={{ minHeight: '50px', outline: 'none', fontSize: '14px', border: 0, boxShadow: 'none' }}
                            // leftImage={require("../../assets/images/user.png")}
                            elementType={'select'}
                            elementConfig={{ options: [{ value: 'USD', displayValue: 'USD' }, { value: 'MXN', displayValue: 'MXN' }, { value: 'BS', displayValue: 'BS' }] }}
                            optionStyle={{ outline: 'none', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            value={balance.currency}
                            // invalid={!emailValid}
                            // shouldValidate={{ required: true, isEmail: true }}
                            // touched={emailTouched}
                            changed={e => { setBalance({ ...balance, currency: e.currentTarget.value, }); }}
                            onFocus={() => { setMessage(''); }}
                        />
                        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch', alignSelf: 'flex-start', marginTop: '20px', width: '100%' }}>
                            <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', marginTop: '5px' }}>
                                <label style={{ fontSize: '12px', marginRight: '10px' }}>{'Disponible: '}</label>
                                <label style={{ fontSize: '12px', color: color.alcanceOrange, marginLeft: '10px' }} >{(amount > 0) ? new Intl.NumberFormat('en-EN').format(+(balance.value - amount).toFixed(2)) : new Intl.NumberFormat('en-EN').format(+(balance.value).toFixed(2))}  {balance.currency}</label>
                            </div>
                            <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', marginTop: '5px' }}>
                                <div style={{ display: 'flex', flex: 3, flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', marginTop: '5px', alignSelf: 'flex-start', wordWrap: 'wrap' }}>
                                    <label style={{ fontSize: '12px', marginRight: '10px' }}>{'CÓDIGO: '}</label>
                                    <label style={{ fontSize: '12px', color: color.alcanceOrange, marginLeft: '10px', marginRight: '10px', maxWidth: '140px' }} > {code} </label>
                                </div>
                                {code && code.length > 2 && <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignSelf: 'stretch', paddingLeft: '5px', marginLeft: '20px', paddingLeft: '10px', paddingRight: '0px', marginRight: '0px' }}>

                                    <FlashingButton
                                        clicked={(e) => { copyToClipboard() }}
                                        clickableImage={true}
                                        image={copy}
                                    />
                                    {window.ReactNativeWebView && <FlashingButton
                                        shareOnSocial={true}
                                        clicked={(e) => {

                                            // this.sendMessage('some messsage');
                                            if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify(code));


                                            /*    if (navigator.share) {
                                                   navigator.share({
                                                       title: 'Share alcance Recharge code!',
                                                       text: code,
                                                       url: window.location.href
                                                   }).then(() => {
                                                       alert('Context API Menu works! 😄');
                                                       //  showMessage(null, 'Thanks! 😄')
                                                   })
                                                       .catch(err => {
                                                           alert(`Couldn't share 🙁`);
                                                       });
                                               } else {
                                                   alert('Context API Menu not supported 🙅‍');
                                               }; */

                                        }}
                                        clickableImage={true}
                                        image={share}
                                    />}

                                </div>}

                            </div>
                        </div>
                    </div>

                    {message && message.length > 2 && <div style={{ marginTop: '15px', marginBottom: '15px', display: 'flex', flex: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }}>
                        <img src={error} alt="error" style={{ width: '25px', height: '25px', resizeMode: 'contain', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: '0px' }} />
                        <label style={{ paddingLeft: '5px', color: color.red, fontSize: '12px' }}>{message}</label>
                    </div>
                    }
                    <div style={{ marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'flex', justifyContent: 'center', fontFamily: 'AvenirBlack', width: '120px', height: '30%', alignSelf: 'center' }} >
                        <FlashingButton
                            clicked={(e) => { generateCode(e) }}
                            label={'GENERAR'}
                            style={{ color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '2px', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }} />
                    </div>

                </div>
            </div>


        </MobileView>
        <BrowserView>
            <p>UNDER CONSTRUCTION</p>
        </BrowserView>
    </div >
    );
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
        onGenerateTransferCode: (token, amount, currency) => dispatch(actions.generateTransferCode({ type: a.VEN_GENERATE_TRANSFER_CODE, data: { in_Token: token, in_Amount: amount, in_Currency: currency } })),


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Client_Codigo, axios));