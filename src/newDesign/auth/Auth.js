import React, { useState, useEffect, useRef } from 'react';
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
import error from '../../assets/images/error.png'
import { BrowserView, MobileView } from "react-device-detect";
import Uxi from '../../hoc/Uxi/Uxi';
import ReactResizeDetector from 'react-resize-detector';
import FlashingButton from '../../components/UI/FlashingButton/FlashingButton';
import useWindowDimensions from '../../hooks/useWindowsDimensions';
import Description from '../description/Description';
import FooterComponent from '../comComponents/FooterComponent';

const Auth = (props) => {
    const { height, width } = useWindowDimensions();
    let elem = useRef(null);
    const [isRememberMe, setIsRememberMe] = useState(false);
    const [isForgottenPassword, setIsForgottenPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const [cliente, setCliente] = useState(false);
    const [comercio, setComercio] = useState(false);


    const [control, setControl] = useState(false);
    const [errorMesage, setErrorMessage] = useState(null);

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
                leftimage: require("../../assets/images/user.png")
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
                leftimage: require("../../assets/images/user.png")
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
                leftimage: require("../../assets/images/calendar.png")
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
                leftimage: require("../../assets/images/cedula.png")
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
                leftimage: require("../../assets/images/phone.png")
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
                leftimage: require("../../assets/images/email.png")
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
                leftimage: require("../../assets/images/lock.png")
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
                leftimage: require("../../assets/images/lock.png")
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
                leftimage: require("../../assets/images/globe.png")
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
                leftimage: require("../../assets/images/location.png")
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
                leftimage: require("../../assets/images/map.png")
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
                leftimage: require("../../assets/images/user.png")
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
                leftimage: require("../../assets/images/user.png")
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
                leftimage: require("../../assets/images/phone.png")
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
                leftimage: require("../../assets/images/email.png")
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
                leftimage: require("../../assets/images/lock.png")
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
                leftimage: require("../../assets/images/lock.png")
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
    let authRedirect = null;

    useEffect(() => {get_CredetialsLocal(); }, []);
    useEffect(() => { setErrorMessage(props.error); }, [props.error]);
  
    useEffect(() => {
        setErrorMessage(null);
        if (choice == 2) { scrollToBottom(elem); }
    }, [choice, isLogin]);


    useEffect(() => { if (props.isAuthenticated) { authRedirect = <Redirect to={props.authRedirectPath} />; } }, [props]);


    const get_CredetialsLocal = () => {
        const email = localStorage.getItem('emailUsed');
        const passwd = localStorage.getItem('passwordUsed');


        if(email&& email.length>2) setEmail(email);
        if(passwd&& passwd.length>2) setPassword(passwd);


    }
    const scrollToBottom = (element) => {
        const scrollHeight = element.scrollHeight;
        const height = element.clientHeight;
        const maxScrollTop = scrollHeight - height;
        element.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
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
        setPasswordValid(checkValidity(e.target.value, { required: true, minLength: 3 }));
        setPasswordTouched(true);
    };

    const onRegisterClient = (e) => {
        console.log('===email check valid:==============');
        console.log();
       
        if (!checkValidity(authFormClient.email.value, { required: true, isEmail: true, minLength: 2 })) return setErrorMessage('Email not valid');

        const dataSent = {
            in_Name: authFormClient.name.value,
            in_Surname: authFormClient.surnme.value,
            in_BirthDate: authFormClient.birthDate.value,
            in_IDCard: authFormClient.id.value,
            in_Phone: authFormClient.phone.value,

            in_Email: authFormClient.email.value,            
            in_Password: authFormClient.password.value,
            in_UserType: 'client',
           
            in_State: '',
            in_BusinessName: '',
            in_BusinessAddress:'' ,
           
        }


        props.onAuthRegister(dataSent, props.history);
    }
    const onRegisterComercio = (e) => {
        console.log('===email check valid:==============');
        if (!checkValidity(authFormComercio.email.value, { required: true, isEmail: true, minLength: 2 })) return setErrorMessage('Email not valid');

        const dataSent = {
           
            in_BusinessName: authFormComercio.legalName.value,
            in_BusinessAddress: authFormComercio.department.value,
            in_State: authFormComercio.state.value,

            in_Name: authFormComercio.name.value,
            in_Surname: authFormComercio.surnme.value,
            in_Email: authFormComercio.email.value,
            in_Phone: authFormComercio.phone.value,
            in_Password: authFormComercio.password.value,
            in_UserType: "comercio",
            in_IDCard: '',
           
            in_BirthDate: ''
        }

        console.log(dataSent);
        props.onAuthRegister(dataSent, props.history);


      //  props.history.push('/comercio')
    }; // props.onSetAuthRedirectPath('/comercio'); }
    const loggingIn = event => {
        event.preventDefault();

        console.log('===email check valid:==============');
        if (!checkValidity(email, { required: true, isEmail: true, minLength: 2 })) return setErrorMessage('Email not valid');
        if (!passwordValid) return setErrorMessage('password not valid');

        props.onAuthLogin(email, password, props.history)
        console.log('---------after auth---------------------');
        console.log(props);
    };


    const handleChangeCheckbox = event => { setIsRememberMe(!isRememberMe) }


    const formElementClient = [], formElementComercio = [];
    for (let key in authFormClient) { formElementClient.push({ id: key, config: authFormClient[key] }); }
    for (let key in authFormComercio) { formElementComercio.push({ id: key, config: authFormComercio[key] }); }

    const formElementsClient = () => {
        return (<div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', }}>
            {formElementClient && formElementClient.length > 0 && formElementClient.map((item, index) => <Input
                key={index}
                containerStyle={{
                    borderBottom: '1px solid #ccc',
                    display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                    width: '95%', paddingTop: '2px', minHeight: '40px', fontSize: '12px', marginRight: '5px', marginLeft: '5px',
                }}
                middleContainerStyle={{ border: 'none', }}
                inputStyle={{ minHeight: '30px', border: 'none', fontSize: '14px' }}
                leftimage={item.config.elementConfig.leftimage}
                elementType={item.config.elementType}
                elementConfig={item.config.elementConfig}
                value={item.config.value}
                invalid={!item.config.valid}
                shouldValidate={item.config.validation}
                touched={item.config.touched}
                changed={event => inputChangedHandlerClient(event, item.id)}
                onFocus={() => { setErrorMessage(null) }}
            />)}
        </div>)
    }
    const formElementsComercio = () => {
        return (<div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', }}>
            {formElementComercio && formElementComercio.length > 0 && formElementComercio.map((item, index) => (<div key={index} style={{ display: 'flex', flex: 1, margin: 0, width: '100%' }}>
                {(index == 3) ? <p key={'repLegal' + index} style={{ textAlign: 'left', marginLeft: '5px', fontWeight: '800', color: color.brown, alignSelf: 'flex-start' }}>Representante legal</p>
                    : <Input
                        key={index}
                        containerStyle={{
                            borderBottom: '1px solid #ccc',
                            display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                            width: '95%', paddingTop: '2px', minHeight: '40px', fontSize: '12px', marginRight: '5px', marginLeft: '5px',
                        }}
                        middleContainerStyle={{ border: 'none', }}
                        inputStyle={{ minHeight: '30px', border: 'none', fontSize: '14px' }}
                        leftimage={item.config.elementConfig.leftimage}
                        elementType={item.config.elementType}
                        elementConfig={item.config.elementConfig}
                        value={item.config.value}
                        invalid={!item.config.valid}
                        shouldValidate={item.config.validation}
                        touched={item.config.touched}
                        changed={event => inputChangedHandlerComercio(event, item.id)}
                        onFocus={() => { setErrorMessage(null) }}
                    />}
            </div>))}
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
        <>
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
                                            {errorMesage}
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
                                                                        leftimage={require("../../assets/images/user.png")}
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
                                                                        leftimage={require("../../assets/images/lock.png")}
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
                < div style={{ position: 'absolute', width: '100%',/*  height: '100%', */ overflow: 'hidden' }}>
                    <div key={'mainContainer'}
                        className={classes.container} style={{
                            display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', margin: '0px',
                            backgroundImage: " linear-gradient( rgba(96, 70, 17, 0.7), rgba(96, 70, 17, 0.7) ),url(" + require("../../assets/images/wallpaper.png") + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: 'rgba(96, 70, 17, 0.7)',
                            minHeight: (+height + 28 + ([1, 2].indexOf(choice) == -1 ? +28 : +0)).toString() + 'px',
                            minWidth: width,
                            color: color.brown,
                             }}>
                        <div style={{
                            display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', margin: '0px',
                            maxHeight: (+height + ([1, 2].indexOf(choice) == -1 ? 0 : -15)).toString() + 'px',
                            overflowY: 'auto',
                            position: 'absolute', top: 0, bottom: '0px', left: 0, right: 0,
                        }}
                            ref={r => elem = r}
                        >
                            {[1, 2].indexOf(choice) == -1 && <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '80%', }}>
                                <h1 style={{ minWidth: '280px', color: 'white', marginTop: '25%' }}>{'Bienvenido a'}</h1>
                            </div>}
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '80%', paddingTop: [1, 2].indexOf(choice) != -1 ? '38px' : '0px' }}>
                                <img src={require("../../assets/images/logo.png")} alt="logo" style={{ width: '100%', height: '100%', resizeMode: 'contain', zIndex: 2 }} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch', width: '80%', marginTop: '10%', }}>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch' }}>
                                    <div onClick={() => { setChoice(0); setIsLogin(true) }}
                                        style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderBottom: isLogin ? '5px solid #f9ba45df' : undefined }}>
                                        <label style={{ color: 'white', fontSize: '12px', marginBottom: '10px' }}>{'INICIA SESIÓN'}</label>
                                    </div>
                                    <div onClick={() => { setChoice(0); setIsLogin(false) }}
                                        style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderBottom: !isLogin ? '5px solid #f9ba45df' : undefined }}>
                                        <label style={{ color: 'white', fontSize: '12px', marginBottom: '10px' }}>{'REGÍSTRATE'} </label>
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
                                                leftimage={require("../../assets/images/user.png")}
                                                elementType='input'
                                                elementConfig={{ type: 'email', placeholder: 'Usuario/Email', }}
                                                value={email}
                                                invalid={!emailValid}
                                                shouldValidate={{ required: true, isEmail: true }}
                                                touched={emailTouched}
                                                changed={event => inputEmailChanged(event)}
                                                onFocus={() => { setErrorMessage(null) }}
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
                                                leftimage={require("../../assets/images/lock.png")}
                                                elementType='input'
                                                elementConfig={{ type: 'password', placeholder: 'Contrasena', }}
                                                value={password}
                                                invalid={!passwordValid}
                                                shouldValidate={{ required: true, minLength: 6 }}
                                                touched={passwordTouched}
                                                changed={event => inputPasswordChanged(event)}
                                                onFocus={() => { setErrorMessage(null) }}
                                            />
                                            {errorMesage && errorMesage.length > 2 && <div style={{ marginTop: '15px', marginBottom: '15px', display: 'flex', flex: '80%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', marginLeft: '10px', marginRight: '4%' }}>
                                                <img src={error} alt="logo" style={{ width: '25px', height: '25px', resizeMode: 'contain', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: '0px' }} />
                                                <label style={{ paddingLeft: '5px', color: color.red }}>{errorMesage}</label>

                                            </div>
                                            }
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
                                        {choice == 0 && <div key={'login'} style={{ margin: 0, paddingLeft: '3px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', textAlign: 'center', backgroundColor: color.white, }}>
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
                                                    <label style={{ fontSize: '12px', fontWeight: '400', color: color.brown, textAlign: 'left' }}
                                                    >{'Elige esto si vas a recibir dinero y comprar productos y servicios.'} </label>
                                                </div>

                                            </div>
                                            <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'flex-start', marginTop: '12px', marginBottom: '22px', marginLeft: '12px' }}>
                                                <div style={{ flex: 0, marginTop: '12px', marginBottom: '5px', fontSize: ' bold', textAlign: ' center', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'AvenirBlack', }}                                        >
                                                    <FlashingButton label={'COMERCIO'}
                                                        clicked={(e) => { setChoice(2); setChoiceText('Comercio'); }} style={{
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
                                                    <label style={{ fontSize: '12px', fontWeight: '400', color: color.brown, textAlign: 'left' }}
                                                    >{'Elige esto si eres un comercio que desea acceptar Paquete Alcance.'} </label>
                                                </div>
                                            </div>
                                        </div>}
                                        {choice == 1 && <div key={'registerClient'} style={{ margin: 0, paddingLeft: '3px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', textAlign: 'center', }}>
                                            <div style={{ margin: 0, paddingBottom: '15px', paddingLeft: '3px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', backgroundColor: color.white, }}>
                                                <div style={{ margin: 0, paddingTop: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: color.white, }}>
                                                    <div style={{ display: 'flex', flex: '20%', flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', marginLeft: '10px', marginRight: '4%' }}>
                                                        <label style={{ color: color.alcanceOrange, fontSize: '16px', textAlign: 'center' }} >{'CLIENTE'} </label>
                                                    </div>


                                                    <div style={{ display: 'flex', flex: '80%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', alignSelf: 'flex-end', marginLeft: '10px', marginRight: '4%' }}>
                                                        {errorMesage && errorMesage.length > 2 && <>
                                                            <img src={error} alt="logo" style={{ width: '25px', height: '25px', resizeMode: 'contain', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: '0px' }} />
                                                            <label style={{ paddingLeft: '5px', color: color.red }}>{errorMesage}</label>
                                                        </>}
                                                    </div>

                                                </div>
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
                                        {choice == 2 && <div key={'registerComercio'} style={{ margin: 0, paddingLeft: '3px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', textAlign: 'center', }}>
                                            <div style={{ margin: 0, paddingBottom: '15px', paddingLeft: '3px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', backgroundColor: color.white, }}>
                                                <div style={{ margin: 0, paddingTop: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: color.white, }}>
                                                    <div style={{ display: 'flex', flex: '20%', flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', marginLeft: '10px', marginRight: '4%' }}>
                                                        <label style={{ color: color.alcanceOrange, fontSize: '16px', textAlign: 'center' }} >{'COMERCIO'} </label>
                                                    </div>

                                                    <div style={{ display: 'flex', flex: '80%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', alignSelf: 'flex-end', marginLeft: '10px', marginRight: '4%' }}>
                                                        {errorMesage && errorMesage.length > 2 && <>
                                                            <img src={error} alt="logo" style={{ width: '25px', height: '25px', resizeMode: 'contain', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: '0px' }} />
                                                            <label style={{ paddingLeft: '5px', color: color.red }}>{errorMesage}</label>
                                                        </>}
                                                    </div>

                                                </div>
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
                                    </>
                                }

                            </div>
                        </div>

                        {[1, 2].indexOf(choice) == -1 ? <div key={'scroll'} style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', margin: '0px', position: 'absolute', bottom: '0px' }}>
                            <img src={require("../../assets/images/hand.png")} alt="logo" style={{ width: '25px', height: '25px', resizeMode: 'contain', }} />
                            <div style={{ width: '3px', backgroundColor: 'white', height: '60px', marginTop: '10px' }}></div>

                        </div>
                            : <FooterComponent onBackClick={() => setChoice(0)} />
                        }

                    </div >
                    {[1, 2].indexOf(choice) == -1 && <Description key={'description'} isAuth={props.isAuthenticated} />

                    }
                </div>
            </MobileView>
        </>

    );
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.authenticated,
        authRedirectPath: state.auth.authRedirectPath,
        userType: state.auth.userType,
        userToken: state.auth.userToken
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthLogin: (email, password, history, ) => dispatch(actions.authLogin(email, password, history)),
        onAuthRegister: (data, history) => dispatch(actions.authRegister(data, history)),
        onResetErrors: () => dispatch(actions.authFail()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth); 