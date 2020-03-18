import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import classes from './Auth.css';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity, color } from '../../shared/utility';
import logo from '../../assets/images/logo.png';
import arrow from '../../assets/images/chevron-left.png';
import arrow2 from '../../assets/images/arrow-left.png'
import { BrowserView, MobileView } from "react-device-detect";
import Uxi from '../../hoc/Uxi/Uxi';
import ReactResizeDetector from 'react-resize-detector';
import FlashingButton from '../../components/UI/FlashingButton/FlashingButton';
import useWindowDimensions from '../../hooks/useWindowsDimensions';
import Description from '../description/Description';

const Auth = (props) => {
    const { height, width } = useWindowDimensions();
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



    const [choice, setChoice] = useState(0);
    const [choiceText, setChoiceText] = useState('');
    const [authFormClient, setAuthFormClient] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Nombre',
                leftImage: require("../../assets/images/user.png")
            },
            value: '',
            validation: {
                required: true,
                isEmail: false
            },
            valid: false,
            touched: false
        },
        surnme: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Apellido',
                leftImage: require("../../assets/images/user.png")
            },
            value: '',
            validation: {
                required: true,
                isEmail: false
            },
            valid: false,
            touched: false
        },
        birthDate: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Fecha nacimiento',
                leftImage: require("../../assets/images/calendar.png")
            },
            value: '',
            validation: {
                required: true,
                isEmail: false
            },
            valid: false,
            touched: false
        },
        id: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Cédula de identidad',
                leftImage: require("../../assets/images/cedula.png")
            },
            value: '',
            validation: {
                required: true,
                isEmail: false
            },
            valid: false,
            touched: false
        },
        phone: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Teléfono',
                leftImage: require("../../assets/images/phone.png")
            },
            value: '',
            validation: {
                required: true,
                isEmail: false
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email',
                leftImage: require("../../assets/images/email.png")
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Contraseña',
                leftImage: require("../../assets/images/lock.png")
            },
            value: '',
            validation: {
                required: true,
                minLength: 3
            },
            valid: false,
            touched: false
        },
        passwordRepeat: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Repetir contraseña',
                leftImage: require("../../assets/images/lock.png")
            },
            value: '',
            validation: {
                required: true,
                minLength: 3,
            },
            valid: false,
            touched: false
        }
    });
    const [authFormComercio, setAuthFormComercio] = useState({

        legalName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Razón social/ Nombre legal',
                leftImage: require("../../assets/images/globe.png")
            },
            value: '',
            validation: {
                required: true,
                isEmail: false
            },
            valid: false,
            touched: false
        },
        department: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Dirección',
                leftImage: require("../../assets/images/location.png")
            },
            value: '',
            validation: {
                required: true,
                isEmail: false
            },
            valid: false,
            touched: false
        },
        state: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Estado',
                leftImage: require("../../assets/images/map.png")
            },
            value: '',
            validation: {
                required: true,
                isEmail: false
            },
            valid: false,
            touched: false
        },
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Nombre',
                leftImage: require("../../assets/images/user.png")
            },
            value: '',
            validation: {
                required: true,
                isEmail: false
            },
            valid: false,
            touched: false
        },
        surnme: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Apellido',
                leftImage: require("../../assets/images/user.png")
            },
            value: '',
            validation: {
                required: true,
                isEmail: false
            },
            valid: false,
            touched: false
        },
        phone: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Teléfono',
                leftImage: require("../../assets/images/phone.png")
            },
            value: '',
            validation: {
                required: true,
                isEmail: false
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email',
                leftImage: require("../../assets/images/email.png")
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Contraseña',
                leftImage: require("../../assets/images/lock.png")
            },
            value: '',
            validation: {
                required: true,
                minLength: 3
            },
            valid: false,
            touched: false
        },
        passwordRepeat: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Repetir contraseña',
                leftImage: require("../../assets/images/lock.png")
            },
            value: '',
            validation: {
                required: true,
                minLength: 3,
            },
            valid: false,
            touched: false
        }
    });

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

    const onRegisterClient = (e) => { props.history.push('/client'); }
    const onRegisterComercio = (e) => {        props.history.push('/comercio')}; // props.onSetAuthRedirectPath('/comercio'); }
        const loggingIn = event => {
            event.preventDefault();
            if (!emailValid) return alert('email not valid');
            if (!passwordValid) return alert('password not valid');




            //  if (!(cliente === true || comercio === true || control === true)) return alert('select type of account');



            if (cliente === true) { props.onAuth(email, password, 'client', props.history, false); storeUsed_CredetialsLocal(email, password, 'client'); }
            if (comercio === true) { props.onAuth(email, password, 'comercio', props.history, false); storeUsed_CredetialsLocal(email, password, 'comercio'); }
            if (control === true) { props.onAuth(email, password, 'control', props.history, false); storeUsed_CredetialsLocal(email, password, 'control'); }

            //props.onAuth(authForm.email.value, authForm.password.value, isSignup);
        };
        let authRedirect = null;
        if (props.isAuthenticated) { authRedirect = <Redirect to={props.authRedirectPath} />; }
        const handleChangeCheckbox = event => { setIsRememberMe(!isRememberMe) }


        const formElementClient = [], formElementComercio = [];
        for (let key in authFormClient) { formElementClient.push({ id: key, config: authFormClient[key] }); }
        for (let key in authFormComercio) { formElementComercio.push({ id: key, config: authFormComercio[key] }); }



        const formElementsClient = () => {
            return (<div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', }}>
                {formElementClient && formElementClient.length > 0 && formElementClient.map((item, index) => <Input
                    key={item.idx}
                    key={1}
                    containerStyle={{
                        borderBottom: '1px solid #ccc',
                        display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                        width: '95%', paddingTop: '2px', minHeight: '40px', fontSize: '12px', marginRight: '5px', marginLeft: '5px',
                    }}
                    middleContainerStyle={{ border: 'none', }}
                    inputStyle={{ minHeight: '30px', border: 'none', fontSize: '14px' }}
                    leftImage={item.config.elementConfig.leftImage}
                    elementType={item.config.elementType}
                    elementConfig={item.config.elementConfig}
                    value={item.config.value}
                    invalid={!item.config.valid}
                    shouldValidate={item.config.validation}
                    touched={item.config.touched}
                    changed={event => inputChangedHandlerClient(event, item.id)}
                />)}
            </div>)
        }
        const formElementsComercio = () => {
            return (<div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', }}>



                {formElementComercio && formElementComercio.length > 0 && formElementComercio.map((item, index) => (<>
                    {(index == 3) && <p style={{ textAlign: 'left', marginLeft: '5px', fontWeight: '800', color: color.brown, alignSelf: 'flex-start' }}>Representante legal</p>}
                    <Input
                        key={item.index}

                        containerStyle={{
                            borderBottom: '1px solid #ccc',
                            display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                            width: '95%', paddingTop: '2px', minHeight: '40px', fontSize: '12px', marginRight: '5px', marginLeft: '5px',
                        }}
                        middleContainerStyle={{ border: 'none', }}
                        inputStyle={{ minHeight: '30px', border: 'none', fontSize: '14px' }}
                        leftImage={item.config.elementConfig.leftImage}
                        elementType={item.config.elementType}
                        elementConfig={item.config.elementConfig}
                        value={item.config.value}
                        invalid={!item.config.valid}
                        shouldValidate={item.config.validation}
                        touched={item.config.touched}
                        changed={event => inputChangedHandlerComercio(event, item.id)}
                    />
                </>))}
            </div>)
        }
        const inputChangedHandlerClient = (event, controlName) => {

            let authForm = authFormClient;
            if (choice == 1) authForm = authFormClient;


            const updatedControls = updateObject(authForm, {
                [controlName]: updateObject(authForm[controlName], {
                    value: event.target.value,
                    valid: checkValidity(
                        event.target.value,
                        authForm[controlName].validation
                    ),
                    touched: true
                })
            });
            if (choiceText === 'Cliente') setAuthFormClient(updatedControls);
            //if (choiceText === 'Comercio') setAuthForm2(updatedControls);

        };
        const inputChangedHandlerComercio = (event, controlName) => {

            let authForm = authFormComercio;
            if (choice == 2) authForm = authFormComercio;
            const updatedControls = updateObject(authForm, {
                [controlName]: updateObject(authForm[controlName], {
                    value: event.target.value,
                    valid: checkValidity(
                        event.target.value,
                        authForm[controlName].validation
                    ),
                    touched: true
                })
            });
            if (choiceText === 'Comercio') setAuthFormComercio(updatedControls);

        };
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
                                                                            containerStyle={{
                                                                                borderBottom: '2px solid #ccc',
                                                                                display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                                                                                width: '95%', paddingTop: '2px', minHeight: '40px', fontSize: '12px', marginRight: '5px', marginLeft: '5px',
                                                                            }}
                                                                            middleContainerStyle={{ border: 'none', }}
                                                                            inputStyle={{ minHeight: '30px', border: 'none', fontSize: '14px' }}
                                                                            leftImage={require("../../assets/images/user.png")}
                                                                            elementType='input'
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
                                                                            containerStyle={{
                                                                                backgroundColor: 'white', paddingBottom: '2px', borderBottom: '2px solid #ccc',
                                                                                display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch',
                                                                                width: '95%', paddingTop: '2px', minHeight: '40px', fontSize: '12px', marginRight: 'auto', marginLeft: 'auto',
                                                                            }}
                                                                            middleContainerStyle={{ border: 'none' }}
                                                                            inputStyle={{ minHeight: '30px', border: 'none', fontSize: '14px' }}
                                                                            leftImage={require("../../assets/images/lock.png")}
                                                                            elementType='input'
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
                    <>
                        <div className={classes.container} style={{
                            display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', margin: '0px',
                            backgroundImage: " linear-gradient( rgba(96, 70, 17, 0.7), rgba(96, 70, 17, 0.7) ),url(" + require("../../assets/images/wallpaper.png") + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: 'rgba(96, 70, 17, 0.7)',
                            minHeight: (+height + (+28)).toString() + 'px',
                            minWidth: width,
                            color: color.brown
                        }}>
                            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', margin: '0px', }}>
                                {[1, 2].indexOf(choice) == -1 && <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '80%', }}>
                                    <h1 style={{ minWidth: '280px', color: 'white', marginTop: '25%' }}>{'Bienvenido a'}</h1>
                                </div>}
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '80%', paddingTop: [1, 2].indexOf(choice) != -1 ? '28px' : '0px' }}>
                                    <img src={require("../../assets/images/logo.png")} alt="logo" style={{ width: '100%', height: '100%', resizeMode: 'contain', zIndex: 2 }} />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch', width: '80%', marginTop: '10%', }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch' }}>
                                        <div onClick={() => { setChoice(0); setIsLogin(true) }}
                                            style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderBottom: isLogin ? '5px solid #f9ba45df' : undefined }}>
                                            <text style={{ color: 'white', fontSize: '12px', marginBottom: '10px' }}>{'INICIA SESIÓN'}</text>
                                        </div>
                                        <div onClick={() => { setChoice(0); setIsLogin(false) }}
                                            style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderBottom: !isLogin ? '5px solid #f9ba45df' : undefined }}>
                                            <text style={{ color: 'white', fontSize: '12px', marginBottom: '10px' }}>{'REGÍSTRATE'}</text>
                                        </div>
                                    </div>
                                    {isLogin
                                        ? <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'stretch' }}>
                                            <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', }}>
                                                <Input
                                                    key={1}
                                                    containerStyle={{
                                                        borderBottom: '2px solid #ccc',
                                                        display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                                                        width: '95%', paddingTop: '2px', minHeight: '50px', fontSize: '12px', marginRight: '5px', marginLeft: '5px',
                                                    }}
                                                    middleContainerStyle={{ border: 'none', }}
                                                    inputStyle={{ minHeight: '50px', border: 'none', fontSize: '14px' }}
                                                    leftImage={require("../../assets/images/user.png")}
                                                    elementType='input'
                                                    elementConfig={{ type: 'email', placeholder: 'Usuario/Email', }}
                                                    value={email}
                                                    invalid={!emailValid}
                                                    shouldValidate={{ required: true, isEmail: true }}
                                                    touched={emailTouched}
                                                    changed={event => inputEmailChanged(event)}
                                                />
                                                <Input
                                                    key={2}
                                                    containerStyle={{
                                                        backgroundColor: 'white',
                                                        display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch',
                                                        width: '95%', paddingTop: '2px', minHeight: '50px', fontSize: '12px', marginRight: 'auto', marginLeft: 'auto',
                                                    }}
                                                    middleContainerStyle={{ border: 'none', borderBottom: '1px solid #ccc' }}
                                                    inputStyle={{ minHeight: '50px', border: 'none', fontSize: '14px' }}
                                                    leftImage={require("../../assets/images/lock.png")}
                                                    elementType='input'
                                                    elementConfig={{ type: 'password', placeholder: 'Contrasena', }}
                                                    value={password}
                                                    invalid={!passwordValid}
                                                    shouldValidate={{ required: true, minLength: 6 }}
                                                    touched={passwordTouched}
                                                    changed={event => inputPasswordChanged(event)}
                                                />
                                            </div>
                                            <div style={{ marginTop: '0px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', fontFamily: 'AvenirBlack', width: '100%', height: '60%' }}>
                                                <div style={{ marginTop: '0px', marginBottom: '12px', fontSize: ' bold', display: 'flex', flex: 0.5, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', fontFamily: 'AvenirBlack', width: '50%', height: '60%', }}>
                                                    <FlashingButton
                                                        clicked={(e) => { isForgottenPassword ? setIsForgottenPassword(false) : loggingIn(e) }}
                                                        label={isForgottenPassword ? 'ENVIAR CLAVE' : 'ACCEDER'}
                                                        style={{
                                                            color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '2px', minHeight: '40px', fontWeight: 'bold',
                                                            textAlign: ' center',
                                                            display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
                                                        }} />
                                                </div>
                                            </div>
                                        </div>
                                        : <>
                                            {choice == 0 && <div style={{ margin: 0, paddingLeft: '3px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', textAlign: 'center', backgroundColor: 'white', }}>
                                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'flex-start', marginTop: '22px', marginBottom: '12px', marginLeft: '12px' }}>
                                                    <div style={{ flex: 0, marginTop: '12px', marginBottom: '5px', fontSize: ' bold', textAlign: ' center', display: 'flex', justifyContent: 'center', }}>
                                                        <FlashingButton label={'CLIENTE'}
                                                            clicked={(e) => { setChoice(1); setChoiceText('Cliente') }}
                                                            style={{
                                                                color: color.white, alignSelf: 'center', backgroundColor: '#f8bb48',
                                                                borderRadius: '1px', fontWeight: 'bold', textAlign: ' center', width: '80px'
                                                            }}
                                                            textStyle={{ fontSize: '12px' }}
                                                        />
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'row', flex: 0, justifyContent: 'center', }}>
                                                        <img src={arrow} alt="arrow" style={{ transform: 'rotate(0deg)', height: '25px', resize: 'contain' }} />
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'flex-start', }}>
                                                        <text style={{ fontSize: '12px', fontWeight: '400', color: color.brown, textAlign: 'left' }}
                                                        >{'Elige esto si vas a recibir dinero y comprar productos y servicios.'}</text>
                                                    </div>

                                                </div>
                                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'flex-start', marginTop: '12px', marginBottom: '22px', marginLeft: '12px' }}>
                                                    <div style={{ flex: 0, marginTop: '12px', marginBottom: '5px', fontSize: ' bold', textAlign: ' center', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'AvenirBlack', }}                                        >
                                                        <FlashingButton label={'COMERCIO'}
                                                            clicked={(e) => { setChoice(2); setChoiceText('Comercio') }} style={{
                                                                color: color.white, alignSelf: 'center', backgroundColor: '#f8bb48',
                                                                borderRadius: '1px', fontWeight: 'bold', textAlign: ' center', width: '80px'
                                                            }}
                                                            textStyle={{ fontSize: '12px' }}
                                                        />
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'row', flex: 0, justifyContent: 'center', }}>
                                                        <img src={arrow} alt="arrow" style={{ transform: 'rotate(0deg)', height: '25px', resize: 'contain' }} />
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'flex-start', }}>
                                                        <text style={{ fontSize: '12px', fontWeight: '400', color: color.brown, textAlign: 'left' }}
                                                        >{'Elige esto si eres un comercio que desea acceptar Paquete Alcance.'}</text>
                                                    </div>
                                                </div>
                                            </div>}
                                            {choice == 1 && <div style={{ margin: 0, paddingLeft: '3px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', textAlign: 'center', }}>
                                                <div style={{ margin: 0, paddingBottom: '15px', paddingLeft: '3px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', backgroundColor: 'white', }}>
                                                    <text style={{ color: color.alcanceOrange, fontSize: '16px', textAlign: 'left', marginTop: '2%', marginBottom: '4%', textAlign: 'left' }} >{'CLIENTE'}</text>

                                                    {formElementsClient()}
                                                </div>

                                                <div style={{ marginTop: '0px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', fontFamily: 'AvenirBlack', width: '100%', height: '60%' }}>
                                                    <div style={{ marginTop: '0px', marginBottom: '12px', fontSize: ' bold', display: 'flex', flex: 0.5, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', fontFamily: 'AvenirBlack', width: '50%', height: '60%', }}>
                                                        <FlashingButton
                                                            clicked={(e) => { onRegisterClient(e) }}
                                                            label={'ENVIAR'}
                                                            style={{
                                                                color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '2px', minHeight: '40px', fontWeight: 'bold',
                                                                textAlign: ' center',
                                                                display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
                                                            }} />
                                                    </div>
                                                </div>
                                            </div>}
                                            {choice == 2 && <div style={{ margin: 0, paddingLeft: '3px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', textAlign: 'center', }}>
                                                <div style={{ margin: 0, paddingBottom: '15px', paddingLeft: '3px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', backgroundColor: 'white', }}>
                                                    <text style={{ color: color.alcanceOrange, fontSize: '16px', textAlign: 'left', marginTop: '2%', marginBottom: '4%', textAlign: 'left' }} >{'COMERCIO'}</text>

                                                    {formElementsComercio()}
                                                </div>
                                                <div style={{ marginTop: '0px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', fontFamily: 'AvenirBlack', width: '100%', height: '60%' }}>
                                                    <div style={{ marginTop: '0px', marginBottom: '12px', fontSize: ' bold', display: 'flex', flex: 0.5, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', fontFamily: 'AvenirBlack', width: '50%', height: '60%', }}>
                                                        <FlashingButton
                                                            clicked={(e) => { onRegisterComercio(e) }}
                                                            label={'ENVIAR'}
                                                            style={{
                                                                color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '2px', minHeight: '40px', fontWeight: 'bold',
                                                                textAlign: ' center',
                                                                display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
                                                            }} />
                                                    </div>
                                                </div>
                                            </div>}
                                        </>}
                                </div>
                            </div>

                            {[1, 2].indexOf(choice) == -1 && <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', margin: '0px', position: 'absolute', bottom: '0px' }}>
                                <img src={require("../../assets/images/hand.png")} alt="logo" style={{ width: '25px', height: '25px', resizeMode: 'contain', }} />
                                <div style={{ width: '3px', backgroundColor: 'white', height: '60px', marginTop: '10px' }}></div>

                            </div>}

                        </div >
                        {[1, 2].indexOf(choice) == -1 && <Description isAuth={props.isAuthenticated} />}
                    </>
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

    export default connect(mapStateToProps, mapDispatchToProps)(Auth); 