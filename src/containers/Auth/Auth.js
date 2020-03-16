import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import classes from './Auth.css';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { checkValidity } from '../../shared/utility';
import logo from '../../assets/images/logo.png';
import { BrowserView, MobileView } from "react-device-detect";
import Uxi from '../../hoc/Uxi/Uxi';
import ReactResizeDetector from 'react-resize-detector';
import FlashingButton from '../../components/UI/FlashingButton/FlashingButton';
//import * as P from '../../../shared/encode';
//import * as C from '../../../shared/crypto-pbkdf2-example';

const Login = (props) => {

    const [isRememberMe, setIsRememberMe] = useState(false);
    const [isForgottenPassword, setIsForgottenPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const [cliente, setCliente] = useState(false);
    const [comercio, setComercio] = useState(false);


    const [control, setControl] = useState(false);
    const [errorMssage, setErrorMessage] = useState(null);

    const [email, setEmail] = useState('');// useState('a@a.aaa');
    const [emailValid, setEmailValid] = useState(true);
    const [emailTouched, setEmailTouched] = useState(false);
    const [password, setPassword] = useState('');// useState('123456');
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [heightLogin, setHeightLogin] = useState(0);







    // eslint-disable-line
    useEffect(() => {
        //  retreiveUsed_CredetialsLocal(props.userType)
        if (props.authRedirectPath !== '/') { props.onSetAuthRedirectPath('/dashboard'); }

    }, [props]);


    useEffect(() => {
        setErrorMessage(<p style={{ textAlign: 'center' }}>{props.error}</p>);
    }, [props.error]);
    const storeUsed_CredetialsLocal = (email, password, type) => {

        //only in development mode to save time reentering all the time credentials
        switch (type) {
            case 'client': {
                localStorage.setItem('emailUsed4Client', email);
                localStorage.setItem('passwordUsed4Client', password);
                break;
            }
            case 'comercio': {
                localStorage.setItem('emailUsed4Comercio', email);
                localStorage.setItem('passwordUsed4Comercio', password);
                break;
            }
            case 'control': {
                localStorage.setItem('emailUsed4Control', email);
                localStorage.setItem('passwordUsed4Control', password);
                break;
            }
            default: return;
        }

    }
    /*    const retreiveUsed_CredetialsLocal = (type) => {
   
           switch (type) {
               case 'client': {
                   const emailUsed = localStorage.getItem('emailUsed4Client');
                   const passwordUsed = localStorage.getItem('passwordUsed4Client');
                   setEmail(emailUsed); setPassword(passwordUsed);
                   break;
               }
               case 'comercio': {
                   const emailUsed = localStorage.getItem('emailUsed4Comercio');
                   const passwordUsed = localStorage.getItem('passwordUsed4Comercio');
                   setEmail(emailUsed); setPassword(passwordUsed);
                   break;
               }
               case 'control': {
                   const emailUsed = localStorage.getItem('emailUsed4Control');
                   const passwordUsed = localStorage.getItem('passwordUsed4Control');
                   setEmail(emailUsed); setPassword(passwordUsed);
                   break;
               }
               default: return;
           }
       }
        */
    const inputEmailChanged = (e) => {
        setEmail(e.target.value);
        setEmailValid(checkValidity(e.target.value, { required: true, isEmail: true }));
        setEmailTouched(true);
    };

    const inputPasswordChanged = (e) => {
        setPassword(e.target.value);
        setPasswordValid(checkValidity(e.target.value, { required: true, minLength: 6 }));
        setPasswordTouched(true);
    };


    const loggingIn = event => {
        event.preventDefault();
        if (!emailValid) return alert('email not valid');
        if (!passwordValid) return alert('password not valid');




        if (!(cliente === true || comercio === true || control === true)) return alert('select type of account');


        /*    if (passwordValid) {
               const { passwordHash, salt } = P.saltHashPassword(null, password);
               const newInserted = P.saltHashPassword(salt, password);//  P.saltHashPassword('password'); // stored server pasword replacement
               console.log('hashed: ' + passwordHash +
                   ':------and server Stored string: ' + newInserted.passwordHash +
                   ' are matching: ' + P.compareHashedPasswords(passwordHash, newInserted.passwordHash)
               ) 
   
               /*   C.hashPassword(password, (err, combined) => callbackHashing(combined));
                 const callbackHashing = (p) => C.verifyPassword(password, p, (err, r) => callbackCompare('Passwords verification result : the two passwords match: ', r))
                 const callbackCompare = (message, p) => { console.log(message + (p != null ? p : 'null resulted')); }
      */

        //   C.hashPassword(password,
        //       (err, combined) => {
        //           console.log('Shape of stored password in frontend is: ' + JSON.stringify(combined));

        //           const { salt, hash } = splitCombined(combined);
        //           return C.verifyPassword(
        //               password,
        //          /*  combined */ C.modifyCombined(combined), //data base storred buffer array 
        //               (err, p) => console.log('Passwords verification result : the two passwords match: ' + (p != null ? p : 'null resulted-> ' + err))
        //           )
        //       }
        //   );

        /*  C.hashPassword(password, null,
             (err, verifComb) => {
                 const { salt } = C.splitCombined(verifComb);

                 var saltBytes = verifComb.readUInt32BE(0);
                 var hashBytes = verifComb.length - saltBytes - 8;
                 var iterations = verifComb.readUInt32BE(4);

                 C.hashPassword('123456', salt, (err, storedComb) => {
                     const { hash } = C.splitCombined(storedComb);
                     const storedString = hash.toString('binary');
                     C.verifCombined(password, salt, storedString, iterations, hashBytes, (err, storedComb) => {
                         return console.log('Passwords verification result : the two passwords match: ' + (storedComb != null ? storedComb : 'null resulted-> ' + err))
                     });
                 });

                 /*  C.hashPassword('789456', salt, (err, storedComb) => {
                      const { hash } = C.splitCombined(storedComb);
                      const storedString = hash.toString('binary');
                      return C.comparePasswords(
                          password, salt, storedString,                          
                          (err, p) => console.log('Passwords verification result : the two passwords match: ' + (p != null ? p : 'null resulted-> ' + err))
                      )
                  }); 
             }
         ); 
     }*/


        if (cliente === true) { props.onAuth(email, password, 'client', props.history, false); storeUsed_CredetialsLocal(email, password, 'client'); }
        if (comercio === true) { props.onAuth(email, password, 'comercio', props.history, false); storeUsed_CredetialsLocal(email, password, 'comercio'); }
        if (control === true) { props.onAuth(email, password, 'control', props.history, false); storeUsed_CredetialsLocal(email, password, 'control'); }

        //props.onAuth(authForm.email.value, authForm.password.value, isSignup);
    };
    let authRedirect = null;
    if (props.isAuthenticated) { authRedirect = <Redirect to={props.authRedirectPath} />; }
    const handleChangeCheckbox = event => { setIsRememberMe(!isRememberMe) }

    // eslint-disable-next-line 
    const Old = <BrowserView>
        <div className={classes.container} style={{/*  top: '20%', */ paddingTop: '5%' }}>
            <Grid container spacing={2} justify="center" alignItems="center" direction="row">

                <Grid zeroMinWidth container item direction='row' justify="center" alignItems="center" xs={10} md={10} lg={10} spacing={1}  >
                    <Grid zeroMinWidth container item direction='row' justify="center" alignItems="center" xs={12} md={12} lg={12} spacing={1} >

                        <div style={{ justifyContent: 'center', alignItems: 'center', paddingTop: '3%', paddingBottom: '8%' }}>
                            <img src={logo} alt="logo" style={{ width: '100%', height: '100%', resizeMode: 'cover', minWidth: '250px' }} />
                        </div>

                    </Grid>

                    <Grid zeroMinWidth container item direction='row' justify="center" alignItems="center" xs={10} md={10} lg={10} spacing={1}   /*  xs={10} sm={8} md={6} lg={6} xl={3} */>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto',/*  padding: '25px', */ margin: '0 auto' }}>
                            <Grid zeroMinWidth container item direction='row' justify="center" alignItems="center" xs={12} md={12} lg={12} spacing={0} >
                                <Grid zeroMinWidth container item direction='column' justify="center" alignItems="center" xs={4} md={4} lg={4} spacing={0}  >
                                    <div style={{
                                        boxShadow: '0 2px 3px #ccc',
                                        border: '1px solid #eee',
                                        boxSizing: 'border-box',
                                        display: 'flex',
                                        alignSelf: 'stretch',
                                        marginRight: '0px',

                                        height: heightLogin,
                                        borderTopLeftRadius: '5px',
                                        borderBottomLeftRadius: '5px'
                                    }} >
                                        <div className={[classes.title, /* { fontSize: '1.2vw', whiteSpace: 'nowrap', backgroundColor: '#F8BB47', width: '100%', height: '100%', color: 'white' } */]}>
                                            <h2 style={{ paddingLeft: '13px', lineHeight: '8px', margin: 0, marginTop: '12px', maxWidth: '98%', paddingRight: '8px', marginBottom: '0px', fontSize: '2vh' }}>Iniciar sesión</h2>
                                            <div style={{ margin: 0, marginTop: '5px', marginLeft: '13px', lineHeight: '1px', height: '2px', border: '1px solid white', backgroundColor: 'white', borderRadius: '2px', width: '20px' }} />
                                        </div>

                                        {/*  </Grid> */}
                                    </div>

                                </Grid>
                                <Grid zeroMinWidth container item direction='column' justify="center" alignItems="center" xs={8} md={8} lg={8} spacing={0}   >
                                    <ReactResizeDetector handleWidth handleHeight
                                        onResize={(width, height) => { setHeightLogin(height) }} />
                                    <div className={classes.Auth} style={{
                                        backgroundColor: 'white', marginLeft: '0px', width: '100%',  /*  text-align: center, */
                                        boxShadow: ' 0 2px 3px #ccc', border: '1px solid #eee', padding: '10px', boxSizing: ' border-box',
                                        height: 'max-content', borderTopRightRadius: ' 5px', borderBottomRightRadius: '5px', minWidth: '164px',

                                    }}
                                    >

                                        {authRedirect}
                                        {errorMssage}
                                        <Grid zeroMinWidth container item xs={11} md={11} lg={11} spacing={1}   /*  xs={10} sm={8} md={6} lg={6} xl={3} */>
                                            <form onSubmit={(e) => loggingIn(e)} >
                                                {!isForgottenPassword
                                                    ? <Grid zeroMinWidth container item direction='column' justify="center" alignItems="center" xs={12} md={12} lg={12} spacing={0}>
                                                        <Grid zeroMinWidth container item direction='row' justify="center" alignItems="center" xs={12} md={12} lg={12} spacing={1}>
                                                            <Grid zeroMinWidth container item direction='row' justify="flex-start" alignItems="center" xs={12} md={4} lg={4} spacing={1}>
                                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', textAlign: 'left', padding: '10px' }}>
                                                                    <FormControlLabel
                                                                        style={{ left: '2px', alignSelf: 'flex-start', fontFamily: 'AvenirBlack', height: '10px', fontWeight: '800' }}
                                                                        control={
                                                                            <Checkbox
                                                                                onChange={() => setTimeout(() => { setCliente(false); setComercio(false); setControl(!control) }, 0.5)}
                                                                                checked={control}
                                                                                value={control}
                                                                                color='primary'
                                                                            />
                                                                        }
                                                                        label={'Control'}
                                                                    />
                                                                </div>
                                                            </Grid>
                                                            <Grid zeroMinWidth container item direction='row' justify="flex-start" alignItems="center" xs={12} md={4} lg={4} spacing={1}>
                                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', textAlign: 'left', padding: '10px' }}>
                                                                    <FormControlLabel
                                                                        style={{ left: '2px', alignSelf: 'flex-start', fontFamily: 'AvenirBlack', height: '10px', fontWeight: '800' }}
                                                                        control={
                                                                            <Checkbox
                                                                                onChange={() => setTimeout(() => { setCliente(!cliente); setComercio(false); setControl(false) }, 0.5)}
                                                                                checked={cliente}
                                                                                value={cliente}
                                                                                color='primary'
                                                                            />
                                                                        }
                                                                        label={'Cliente'} />
                                                                </div>
                                                            </Grid>
                                                            <Grid zeroMinWidth container item direction='row' justify="flex-start" alignItems="center" xs={12} md={4} lg={4} spacing={1}>
                                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', textAlign: 'left', padding: '10px' }}>
                                                                    <FormControlLabel
                                                                        style={{ left: '2px', alignSelf: 'flex-start', fontFamily: 'AvenirBlack', height: '10px', fontWeight: '800' }}
                                                                        control={
                                                                            <Checkbox
                                                                                onChange={() => setTimeout(() => { setCliente(false); setComercio(!comercio); setControl(false) }, 0.5)}
                                                                                checked={comercio}
                                                                                value={comercio}
                                                                                color='primary'
                                                                            />
                                                                        }
                                                                        label={'Comercio'}
                                                                    />
                                                                </div>
                                                            </Grid>
                                                        </Grid>


                                                    </Grid>
                                                    : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', textAlign: 'left', padding: '10px' }}>
                                                        <p style={{ color: '#534d41', alignSelf: 'center', textAlign: ' center', fontSize: '16px', fontFamily: 'AvenirRoman', }}>
                                                            Inserte la dirección de correo electrónico asociada a su cuenta para enviarle la nueva contraseña</p>
                                                    </div>


                                                }
                                                {(props.loading)
                                                    ? <div style={{ paddingTop: '-10px' }}><Spinner /></div>
                                                    : <div style={{ paddingTop: '10px' }}>
                                                        <Grid zeroMinWidth container item direction='column' justify="center" alignItems="center" xs={12} md={12} lg={12} spacing={0}>
                                                            <Grid zeroMinWidth container item direction='row' justify="center" alignItems="center" xs={12} md={12} lg={12} spacing={0}>
                                                                <Input

                                                                    key={1}
                                                                    containerStyle={{ width: '95%' }}
                                                                    labelStyle={{ textAlign: 'left', paddingLeft: '2px', fontFamily: 'AvenirRoman', fontWeight: '800' }}
                                                                    inputStyle={{ paddingTop: '10px', minHeight: '40px', fontFamily: 'AvenirRoman', fontSize: '16px', marginRight: '5px', }}


                                                                    elementType='input'
                                                                    label={'Usuario/Email:'}
                                                                    elementConfig={{ type: 'email', placeholder: 'Usuario/Email', }}
                                                                    value={email}
                                                                    invalid={!emailValid}
                                                                    shouldValidate={{ required: true, isEmail: true }}
                                                                    touched={emailTouched}
                                                                    changed={event => inputEmailChanged(event)}
                                                                />
                                                            </Grid>
                                                            <Grid zeroMinWidth container item direction='row' justify="center" alignItems="center" xs={12} md={12} lg={12} spacing={0}>
                                                                {!isForgottenPassword && <Input

                                                                    key={2}
                                                                    containerStyle={{ width: '95%' }}
                                                                    labelStyle={{ textAlign: 'left', paddingLeft: '2px', fontFamily: 'AvenirRoman', fontWeight: '800' }}
                                                                    inputStyle={{ paddingTop: '10px', minHeight: '40px', fontFamily: 'AvenirRoman', fontSize: '16px', marginRight: '5px', }}

                                                                    elementType='input'
                                                                    label={'Contrasena:'}
                                                                    elementConfig={{ type: 'password', placeholder: 'Contrasena', }}
                                                                    value={password}
                                                                    invalid={!passwordValid}
                                                                    shouldValidate={{ required: true, minLength: 6 }}
                                                                    touched={passwordTouched}
                                                                    changed={event => inputPasswordChanged(event)}
                                                                />}
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                }
                                                {(!props.loading && !isForgottenPassword) &&
                                                    <Grid zeroMinWidth container item direction='column' justify="center" alignItems="center" xs={12} md={12} lg={12} spacing={0}>
                                                        <Grid zeroMinWidth container item direction='row' justify="center" alignItems="center" xs={11} md={11} lg={11} spacing={0}>
                                                            <div style={{ flex: 1, padding: '10px' }}>
                                                                < FormControlLabel
                                                                    style={{ left: '2px', alignSelf: 'flex-start', fontFamily: 'sans', height: '15px' }}
                                                                    control={
                                                                        <Checkbox
                                                                            onChange={(e) => handleChangeCheckbox()}
                                                                            value={isRememberMe}
                                                                            checked={isRememberMe}
                                                                            color='primary'
                                                                        />
                                                                    }
                                                                    label={'Recuérdame'}
                                                                />
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                }
                                                {(!props.loading) &&
                                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingTop: '10px' }}>
                                                        {/*   <Grid zeroMinWidth container item direction='row' justify="space-around" alignItems="center" xs={12} md={12} lg={12} spacing={0}> */}
                                                        <div style={{ flex: 2, marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'flex', justifyContent: 'center', fontFamily: 'AvenirBlack', width: '100%', height: '60%' }}                                        >
                                                            <FlashingButton
                                                                clicked={(e) => { isForgottenPassword ? setIsForgottenPassword(false) : loggingIn(e) }}
                                                                label={isForgottenPassword ? 'ENVIAR CLAVE' : 'ENVIAR'}
                                                                style={{ color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '10px', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }} />
                                                        </div>
                                                        <div style={{ flex: 0.5, padding: '0px', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', textAlign: 'center' }}>
                                                            <h2 style={{ margin: 0, color: 'gray' }}>o</h2>
                                                        </div>
                                                        <div style={{ flex: 2, marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'flex', justifyContent: 'center', fontFamily: 'AvenirBlack', width: '100%', height: '60%' }}                                        >
                                                            <FlashingButton
                                                                clicked={(e) => { isForgottenPassword ? setIsForgottenPassword(false) : props.history.push('/register') }}
                                                                label={isForgottenPassword ? 'ÁTRAS' : 'REGISTRATE'}
                                                                style={{ backgroundColor: 'white', alignSelf: 'center', color: '#f8bb48', borderRadius: '10px', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }} />
                                                        </div>
                                                        {/*   </Grid> */}

                                                    </div>
                                                }
                                            </form>

                                        </Grid>
                                        {!isForgottenPassword && <div onClick={() => setIsForgottenPassword(true)} style={{

                                            display: 'flex',
                                            alignSelf: 'stretch',
                                            marginRight: '0px',

                                            /*   backgroundColor: '#f5f5f5', */
                                        }} >
                                            {/*  <div className={[classes.title, { fontSize: '1.2vw', whiteSpace: 'nowrap', borderTopLeftRadius: '15px', borderTopRightRadius: '15px', backgroundColor: '#F8BB47', width: '100%', height: '100%' }]}>
                                */}     <p style={{ color: '#534d41', alignSelf: 'center', textAlign: ' center', fontSize: '16px', fontFamily: 'AvenirRoman', textTransform: 'initial', marginLeft: '10px' }}>Olvidaste tu contrasena?</p>
                                            {/*  </div> */}
                                        </div>}
                                    </div>


                                </Grid>
                            </Grid>
                        </div>

                    </Grid>

                </Grid>
            </Grid>
        </div >
    </BrowserView>



    return (
        <Uxi>
            <BrowserView>

                <Grid zeroMinWidth container item direction='row' justify="center" alignItems="center" xs={10} md={10} lg={10} spacing={1}  >
                    <Grid zeroMinWidth container item direction='row' justify="center" alignItems="center" xs={12} md={12} lg={12} spacing={1} >

                        <div style={{ justifyContent: 'center', alignItems: 'center', paddingTop: '3%', paddingBottom: '8%' }}>
                            <img src={logo} alt="logo" style={{ width: '100%', height: '100%', resizeMode: 'cover', minWidth: '250px' }} />
                        </div>

                    </Grid>
                </Grid>
                <div className={classes.container} style={{/*  top: '20%', */ paddingTop: '15px' }}>
                    <Grid container spacing={2} justify="center" alignItems="center" direction="row">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto',/*  padding: '25px', */ margin: '0 auto' }}>
                            <Grid zeroMinWidth container item direction='row' justify="center" alignItems="center" xs={12} md={12} lg={12} spacing={0} >
                                <Grid zeroMinWidth container item direction='column' justify="center" alignItems="center" xs={11} md={11} lg={11} spacing={0}  >
                                    <div style={{ flex: 0, display: 'flex', flexDirection: 'row', backgroundColor: '#F8BB47', boxShadow: '0 2px 3px #ccc', border: '1px solid #eee', padding: '10px', boxSizing: 'border-box', borderRadius: '25px', }}>
                                        <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                                            <div className={[classes.title, /* { fontSize: '1.2vw', whiteSpace: 'nowrap', backgroundColor: '#F8BB47', width: '100%', height: '100%', color: 'white' } */]}>
                                                <h2 style={{ paddingLeft: '13px', lineHeight: '8px', margin: 0, marginTop: '12px', maxWidth: '98%', paddingRight: '8px', marginBottom: '0px', fontSize: '1.4vh' }}>Iniciar sesión</h2>
                                                <div style={{ margin: 0, marginTop: '5px', paddingLeft: '13px', marginLeft: '10%', lineHeight: '1px', height: '2px', border: '1px solid white', backgroundColor: 'white', borderRadius: '2px', width: '20px' }} />
                                            </div>
                                        </div>
                                        <div style={{
                                            paddingLeft: '0px', margin: 0,
                                            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                                            marginTop: '-9px', marginBottom: '-10px', marginRight: '-10px',
                                            borderTopRightRadius: '25px', borderBottomRightRadius: '25px',
                                            backgroundColor: 'white',
                                        }}>

                                            {authRedirect}
                                            {errorMssage}
                                            <Grid zeroMinWidth container item xs={11} md={11} lg={11} spacing={1}   /*  xs={10} sm={8} md={6} lg={6} xl={3} */>
                                                <form onSubmit={(e) => loggingIn(e)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', minWidth: '90%' }}>
                                                    {!isForgottenPassword
                                                        ?
                                                        <Grid zeroMinWidth container item direction='column' justify="center" alignItems="center" xs={12} md={12} lg={12} spacing={0}>
                                                            <Grid zeroMinWidth container item direction='row' justify="center" alignItems="center" xs={12} md={12} lg={12} spacing={1}>
                                                                <Grid zeroMinWidth container item direction='row' justify="flex-start" alignItems="center" xs={12} md={4} lg={4} spacing={1}>
                                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', textAlign: 'left', padding: '10px' }}>
                                                                        <FormControlLabel
                                                                            style={{ left: '2px', alignSelf: 'flex-start', fontFamily: 'AvenirBlack', height: '10px', fontWeight: '800' }}
                                                                            control={
                                                                                <Checkbox
                                                                                    onChange={() => setTimeout(() => { setCliente(false); setComercio(false); setControl(!control) }, 0.5)}
                                                                                    checked={control}
                                                                                    value={control}
                                                                                    color='primary'
                                                                                />
                                                                            }
                                                                            label={'Control'}
                                                                        />
                                                                    </div>
                                                                </Grid>
                                                                <Grid zeroMinWidth container item direction='row' justify="flex-start" alignItems="center" xs={12} md={4} lg={4} spacing={1}>
                                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', textAlign: 'left', padding: '10px' }}>
                                                                        <FormControlLabel
                                                                            style={{ left: '2px', alignSelf: 'flex-start', fontFamily: 'AvenirBlack', height: '10px', fontWeight: '800' }}
                                                                            control={
                                                                                <Checkbox
                                                                                    onChange={() => setTimeout(() => { setCliente(!cliente); setComercio(false); setControl(false) }, 0.5)}
                                                                                    checked={cliente}
                                                                                    value={cliente}
                                                                                    color='primary'
                                                                                />
                                                                            }
                                                                            label={'Cliente'} />
                                                                    </div>
                                                                </Grid>
                                                                <Grid zeroMinWidth container item direction='row' justify="flex-start" alignItems="center" xs={12} md={4} lg={4} spacing={1}>
                                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', textAlign: 'left', padding: '10px', paddingRight: '80px' }}>
                                                                        <FormControlLabel
                                                                            style={{ left: '2px', alignSelf: 'flex-start', fontFamily: 'AvenirBlack', height: '10px', fontWeight: '800' }}
                                                                            control={
                                                                                <Checkbox
                                                                                    onChange={() => setTimeout(() => { setCliente(false); setComercio(!comercio); setControl(false) }, 0.5)}
                                                                                    checked={comercio}
                                                                                    value={comercio}
                                                                                    color='primary'
                                                                                />
                                                                            }
                                                                            label={'Comercio'}
                                                                        />
                                                                    </div>
                                                                </Grid>
                                                            </Grid>


                                                        </Grid>

                                                        : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', textAlign: 'left', padding: '10px' }}>
                                                            <p style={{ color: '#534d41', alignSelf: 'center', textAlign: ' center', fontSize: '16px', fontFamily: 'AvenirRoman', }}>
                                                                Inserte la dirección de correo electrónico asociada a su cuenta para enviarle la nueva contraseña</p>
                                                        </div>
                                                    }
                                                    {(props.loading)
                                                        ? <div style={{ paddingTop: '10px', paddingLeft: '40%' }}><Spinner /></div>
                                                        : <div style={{ paddingTop: '10px', width: '100%' }}>
                                                            <Grid zeroMinWidth container item direction='column' justify="center" alignItems="center" xs={12} md={12} lg={12} spacing={0}>
                                                                <Grid zeroMinWidth container item direction='row' justify="center" alignItems="center" xs={12} md={12} lg={12} spacing={0}>
                                                                    <Input

                                                                        key={1}
                                                                        containerStyle={{ width: '95%' }}
                                                                        labelStyle={{ textAlign: 'left', paddingLeft: '2px', fontFamily: 'AvenirRoman', fontWeight: '800' }}
                                                                        inputStyle={{ paddingTop: '10px', minHeight: '40px', fontFamily: 'AvenirRoman', fontSize: '16px', marginRight: '5px', }}


                                                                        elementType='input'
                                                                        label={'Usuario/Email:'}
                                                                        elementConfig={{ type: 'email', placeholder: 'Usuario/Email', }}
                                                                        value={email}
                                                                        invalid={!emailValid}
                                                                        shouldValidate={{ required: true, isEmail: true }}
                                                                        touched={emailTouched}
                                                                        changed={event => inputEmailChanged(event)}
                                                                    />
                                                                </Grid>
                                                                <Grid zeroMinWidth container item direction='row' justify="center" alignItems="center" xs={12} md={12} lg={12} spacing={0}>
                                                                    {!isForgottenPassword && <Input

                                                                        key={2}
                                                                        containerStyle={{ width: '95%' }}
                                                                        labelStyle={{ textAlign: 'left', paddingLeft: '2px', fontFamily: 'AvenirRoman', fontWeight: '800' }}
                                                                        inputStyle={{ paddingTop: '10px', minHeight: '40px', fontFamily: 'AvenirRoman', fontSize: '16px', marginRight: '5px', }}

                                                                        elementType='input'
                                                                        label={'Contrasena:'}
                                                                        elementConfig={{ type: 'password', placeholder: 'Contrasena', }}
                                                                        value={password}
                                                                        invalid={!passwordValid}
                                                                        shouldValidate={{ required: true, minLength: 6 }}
                                                                        touched={passwordTouched}
                                                                        changed={event => inputPasswordChanged(event)}
                                                                    />}
                                                                </Grid>
                                                            </Grid>
                                                        </div>
                                                    }
                                                </form>

                                            </Grid>

                                            {(!props.loading && !isForgottenPassword) &&
                                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', minWidth: '90%', marginTop: '10px' }}>
                                                    < FormControlLabel
                                                        style={{ left: '10px', alignSelf: 'flex-start', fontFamily: 'sans', height: '15px' }}
                                                        control={
                                                            <Checkbox
                                                                onChange={(e) => handleChangeCheckbox()}
                                                                value={isRememberMe}
                                                                checked={isRememberMe}
                                                                color='primary'
                                                            />
                                                        }
                                                        label={'Recuérdame'}
                                                    />
                                                </div>
                                            }
                                            {(!props.loading) &&
                                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', minWidth: '90%', paddingTop: '10px' }}>
                                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingTop: '10px', width: '100%' }}>
                                                        <Grid zeroMinWidth container item direction='row' justify="space-around" alignItems="center" xs={12} md={12} lg={12} spacing={0}>
                                                            <div style={{ flex: 2, marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'flex', justifyContent: 'center', fontFamily: 'AvenirBlack', width: '100%', height: '60%' }}                                        >
                                                                <FlashingButton
                                                                    clicked={(e) => { isForgottenPassword ? setIsForgottenPassword(false) : loggingIn(e) }}
                                                                    label={isForgottenPassword ? 'ENVIAR CLAVE' : 'ENVIAR'}
                                                                    style={{ color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '10px', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }} />
                                                            </div>
                                                            <div style={{ flex: 0.5, padding: '0px', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', textAlign: 'center' }}>
                                                                <h2 style={{ margin: 0, color: 'gray' }}>o</h2>
                                                            </div>
                                                            <div style={{ flex: 2, marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'flex', justifyContent: 'center', fontFamily: 'AvenirBlack', width: '100%', height: '60%' }}                                        >
                                                                <FlashingButton
                                                                    clicked={(e) => { isForgottenPassword ? setIsForgottenPassword(false) : props.history.push('/register') }}
                                                                    label={isForgottenPassword ? 'ÁTRAS' : 'REGISTRATE'}
                                                                    style={{ backgroundColor: 'white', alignSelf: 'center', color: '#f8bb48', borderRadius: '10px', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }} />
                                                            </div>
                                                        </Grid>

                                                    </div>
                                                </div>
                                            }
                                            {!isForgottenPassword &&
                                                <div onClick={() => setIsForgottenPassword(true)} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'stretch', minWidth: '90%', marginTop: '10px' }} >
                                                    <p style={{ color: '#534d41', alignSelf: 'center', textAlign: ' center', fontSize: '16px', fontFamily: 'AvenirRoman', textTransform: 'initial', marginLeft: '10px' }}>Olvidaste tu contrasena?</p>

                                                </div>}
                                        </div>

                                        {/* </div> */}
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </div >
            </BrowserView>

            <MobileView>
                <div className={classes.container} style={{
                    backgroundImage: " linear-gradient( rgba(96, 70, 17, 0.7), rgba(96, 70, 17, 0.7) ),url(" + require("../../assets/images/wallpaper.png") + ")",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'rgba(96, 70, 17, 0.7)'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginLeft: '5%', }}>
                        <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                            <h1 style={{ minWidth: '280px', color: 'white', marginTop: '25%' }}>{'Bienvenido a'}</h1>
                        </div>
                        <div style={{ marginTop: '1%', display: 'flex', flexDirection: 'row', flex: 1 }}>
                            <img src={require("../../assets/images/logo.png")} alt="logo" style={{ width: '70%', height: '100%', resizeMode: 'contain', zIndex: 2 }} />
                        </div>

                        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch', marginTop: '10%', width: '70%', }}>
                            <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div onClick={() => setIsLogin(true)}
                                    style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderBottom: isLogin ? '3px solid #f9ba45df' : undefined }}>
                                    <text style={{ color: 'white', fontSize: '12px', marginBottom: '10px' }}>{'INICIA SESIÓN'}</text>
                                </div>
                                <div onClick={() => setIsLogin(false)}
                                    style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderBottom: !isLogin ? '3px solid #f9ba45df' : undefined }}>
                                    <text style={{ color: 'white', fontSize: '12px', marginBottom: '10px' }}>{'REGÍSTRATE'}</text>
                                </div>
                            </div>
                            {isLogin && <div style={{ backgroundColor: 'white' }}>


                                <Input

                                    key={1}
                                    containerStyle={{ width: '95%',   paddingTop: '10px', minHeight: '40px', fontFamily: 'AvenirRoman', fontSize: '16px', marginRight: '5px', }}
                                     inputStyle={{minHeight: '40px',}}
                                    leftImage={require("../../assets/images/user.png")}

                                    elementType='input'
                                    /*    label={'Usuario/Email:'} */
                                    elementConfig={{ type: 'email', placeholder: 'Usuario/Email', }}
                                    value={email}
                                    invalid={!emailValid}
                                    shouldValidate={{ required: true, isEmail: true }}
                                    touched={emailTouched}
                                    changed={event => inputEmailChanged(event)}
                                />
                                <Input

                                    key={2}
                                    containerStyle={{ width: '95%' }}
                                    labelStyle={{ textAlign: 'left', paddingLeft: '2px', fontFamily: 'AvenirRoman', fontWeight: '800' }}
                                    inputStyle={{ paddingTop: '10px', minHeight: '40px', fontFamily: 'AvenirRoman', fontSize: '16px', marginRight: '5px', }}
                                    leftImage={require("../../assets/images/lock.png")}
                                    elementType='input'
                                    elementConfig={{ type: 'password', placeholder: 'Contrasena', }}
                                    value={password}
                                    invalid={!passwordValid}
                                    shouldValidate={{ required: true, minLength: 6 }}
                                    touched={passwordTouched}
                                    changed={event => inputPasswordChanged(event)}
                                />
                                
                            </div>}
                        </div>
                    </div>
                </div >
            </MobileView>
        </Uxi >

    );
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.authenticated,
        authRedirectPath: state.auth.authRedirectPath,
        userType: state.auth.userType,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, userType, history, isSignup, ) => dispatch(actions.auth(email, password, userType, history, isSignup)),

        onResetErrors: () => dispatch(actions.authFail()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login); 