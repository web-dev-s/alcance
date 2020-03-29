import React, { useEffect, useState } from 'react';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import axios from '../axios-orders';
import * as a from '../store/actions/actionTypes';
import * as actions from '../store/actions/index';
import * as _ from 'lodash';
import { updateObject, checkValidity, color } from '../shared/utility';
import FlashingButton from '../components/UI/FlashingButton/FlashingButton';
/* import Spinner from '../../components/UI/Spinner/Spinner'; */
import classes from './client.css';
import Input from '../components/UI/Input/Input';

import error from '../assets/images/error.png'

import { BrowserView, MobileView, /* isBrowser, isMobile */ } from "react-device-detect";
import useWindowDimensions from '../hooks/useWindowsDimensions';
const Client_Remesa = props => {
    const { height, width } = useWindowDimensions();

    const [rechargeCode, setRechargeCode] = useState('');
    const [message, setMessage] = useState('');

    const { userType, userId } = props;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //  useEffect(() => {  }, []);
    const chargeAcount = () => {
        props.onRechargeBallances(props.userToken, rechargeCode).then(res => {

            if (res.status == 200) {
                setMessage('Monto ingresado');
                //  props.history.push('/client')
            } else setMessage('Código invalido');
        });
    }
    return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingLeft: '5%', paddingRight: '5%' }} >

        <MobileView style={{ width: width, height: height, marginTop: '48px', position: 'relative' }}>
            <div className={classes.container} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', }}>
                < div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', }}>
                    <div style={{ marginBottom: '4%', borderLeft: `5px solid ${color.alcanceOrange}`, display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', }}>
                        <label style={{ fontSize: '1.4rem', color: color.alcanceOrange, marginLeft: '10px' }}>{'Código remesa'}</label>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', width: '100%', textAlign: 'left', marginTop: '40px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', width: '100%', textAlign: 'left' }}>
                            <label style={{ fontSize: '12px', textAlign: 'left' }} > {'Introduzca el codigo de la remesa que recibiste:'}</label>

                            <Input
                                label={'Código:'}
                                labelStyle={{ color: color.alcanceOrange, /* fontStyle: 'italic', */ textAlign: 'left', fontSize: '12px' }}
                                containerStyle={{
                                    borderBottom: '2px solid #ccc', marginTop: '15px',
                                    display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center',
                                    width: '100%', paddingTop: '2px', minHeight: '50px', fontSize: '12px', marginRight: '5px', marginLeft: '5px',
                                }}
                                middleContainerStyle={{ border: 'none', }}
                                inputStyle={{ minHeight: '50px', border: 'none', fontSize: '14px', outline: 'none' }}
                                // leftImage={require("../../assets/images/user.png")}
                                elementType='input'
                                elementConfig={{ type: 'text', placeholder: '', }}
                                defaultValue={''}
                                value={rechargeCode || ''}
                                // invalid={!emailValid}
                                // shouldValidate={{ required: true, isEmail: true }}
                                // touched={emailTouched}
                                changed={(e) => { setRechargeCode(e.target.value) }}
                                onFocus={(e) => { setMessage(''); }}
                            />
                        </div>
                        {message && message.length > 2 && <div style={{ marginTop: '15px', marginBottom: '15px', display: 'flex', flex: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }}>
                            <img src={error} alt="error" style={{ width: '25px', height: '25px', resizeMode: 'contain', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: '0px' }} />
                            <label style={{ paddingLeft: '5px', color: color.red, fontSize: '12px' }}>{message}</label>
                        </div>
                        }
                        <div style={{ marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'flex', justifyContent: 'center', fontFamily: 'AvenirBlack', width: '40%', height: '30%', alignSelf: 'center' }}                                        >
                            <FlashingButton
                                clicked={(e) => { chargeAcount() }}
                                label={'ENVIAR'}
                                style={{ color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '2px', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }} />
                        </div>
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
        onGenerateTransferCode: (token, amount, currency) => dispatch(actions.generateTransferCode({ type: a.VEN_GENERATE_TRANSFER_CODE, data: { in_Token: token, in_Amount: amount, in_Currency: currency } })),
        onRechargeBallances: (token, code) => dispatch(actions.rechargeBallances({ type: a.VEN_RECHARGE_BALLANCE, data: { in_Token: token, in_Code: code, } })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Client_Remesa, axios));
