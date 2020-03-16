import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {   Grid } from '@material-ui/core';
import classes from './Register.css';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity, color } from '../../shared/utility';
import { BrowserView, MobileView } from "react-device-detect";
import Uxi from '../../hoc/Uxi/Uxi';
import ReactResizeDetector from 'react-resize-detector';
import arrow from '../../assets/images/arrow.png';
import arrow2 from '../../assets/images/arrow-left.png'
import FlashingButton from '../../components/UI/FlashingButton/FlashingButton';

/* import alcaImg from '../../assets/images/paqAlcance.png'; */
const Register = (props) => {
    const [authForm1, setAuthForm1] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Nombre'
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
                placeholder: 'Apellido'
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
                placeholder: 'Fecha nacimiento'
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
                placeholder: 'Num. nacional identidad'
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
                placeholder: 'Dirección'
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
                placeholder: 'Estado'
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
                placeholder: 'Teléfono'
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
                placeholder: 'Email'
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
                placeholder: 'Clave'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        },
        passwordRepeat: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Repetir Clave'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });
    const [authForm2, setAuthForm2] = useState({

        legalName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Razón social/ Nombre legal'
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
                placeholder: 'Dirección'
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
                placeholder: 'Estado'
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
                placeholder: 'Nombre'
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
                placeholder: 'Apellido'
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
                placeholder: 'Teléfono'
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
                placeholder: 'Email'
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
                placeholder: 'Clave'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        },
        passwordRepeat: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Repetir Clave'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });
    const [authForm3, setAuthForm3] = useState({
        ubicacion: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Ubicación (nombre)'
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
                placeholder: 'Nombre'
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
                placeholder: 'Apellido'
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
                placeholder: 'Fecha nacimento'
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
                placeholder: 'Num. nacional identidad'
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
                placeholder: 'Dirección'
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
                placeholder: 'Estado'
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
                placeholder: 'Teléfono'
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
                placeholder: 'Email'
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
                placeholder: 'Clave'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        },
        passwordRepeat: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Repetir Clave'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });
    const [choice, setChoice] = useState(0);
    const [choiceText, setChoiceText] = useState('Comercio');
  //  const [heightLogin, setHeightLogin] = useState(0);
    // eslint-disable-line
    useEffect(() => { if (props.authRedirectPath !== '/') { props.onSetAuthRedirectPath('/dashboard'); } }, [props]);
    const inputChangedHandler = (event, controlName) => {

        let authForm = authForm1;
        if (choiceText === 'Cliente') authForm = authForm1;
        if (choiceText === 'Comercio') authForm = authForm2;
        if (choiceText === 'Control') authForm = authForm3;

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
        if (choiceText === 'Cliente') setAuthForm1(updatedControls);
        if (choiceText === 'Comercio') setAuthForm2(updatedControls);
        if (choiceText === 'Control') setAuthForm3(updatedControls);
    };

    const register = event => {
        event.preventDefault();


        if (choiceText === 'Cliente') { props.onAuth(authForm1.email.value, authForm1.password.value, 'client', props.history, true); }
        if (choiceText === 'Comercio') { props.onAuth(authForm2.email.value, authForm2.password.value, 'comercio', props.history, true); }
        if (choiceText === 'Control') { props.onAuth(authForm3.email.value, authForm3.password.value, 'control', props.history, true); }

    };

    const formElementsArray1 = [], formElementsArray2 = [], formElementsArray3 = [];
    for (let key in authForm1) { formElementsArray1.push({ id: key, config: authForm1[key] }); }
    for (let key in authForm2) { formElementsArray2.push({ id: key, config: authForm2[key] }); }
    for (let key in authForm3) { formElementsArray3.push({ id: key, config: authForm3[key] }); }
    let form1 = formElementsArray1.map((formElement, idx) => (
        <div style={{ display: 'column', flexDirection: 'row', fontFamily: 'AvenirRoman', alignItems: 'center' }} key={formElement.id}>
            <Input
                key={formElement.idx}
                containerStyle={{ width: '100%' }}
                labelStyle={{ textAlign: 'left', paddingLeft: '1px', fontWeight: '800' }}
                inputStyle={{ paddingTop: '10px', minHeight: '40px', fontSize: '16px', marginLeft: '0px', paddingLeft: '10px', marginRight: '5px', }}
                label={formElement.config.elementConfig.placeholder + ':'}

                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={event => inputChangedHandler(event, formElement.id)}
            />


        </div>
    ));
    let form2 = formElementsArray2.map((formElement, idx) => (
        <div style={{ display: 'column', flexDirection: 'row', fontFamily: 'AvenirRoman', alignItems: 'center' }} key={formElement.id}>
            {(idx === 3) && <p style={{ textAlign: 'left', paddingLeft: '12px', fontWeight: '800' }}>Representante legal</p>}

            <Input
                key={formElement.idx}
                containerStyle={{ width: '100%' }}
                labelStyle={{ textAlign: 'left', paddingLeft: '1px', fontWeight: '800' }}
                inputStyle={{ paddingTop: '10px', minHeight: '40px', fontSize: '16px', marginLeft: '0px', paddingLeft: '10px', marginRight: '5px', }}
                label={formElement.config.elementConfig.placeholder + ':'}

                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={event => inputChangedHandler(event, formElement.id)}
            />



        </div>
    ));
    let form3 = formElementsArray3.map((formElement, idx) => (
        <div style={{ display: 'column', flexDirection: 'row', fontFamily: 'AvenirRoman', alignItems: 'center' }} key={formElement.id}>
            <Input
                key={idx}
                containerStyle={{ width: '100%' }}
                labelStyle={{ textAlign: 'left', paddingLeft: '1px', fontWeight: '800' }}
                inputStyle={{ paddingTop: '10px', minHeight: '40px', fontSize: '16px', marginLeft: '0px', paddingLeft: '10px', marginRight: '5px', }}
                label={formElement.config.elementConfig.placeholder + ':'}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={event => inputChangedHandler(event, formElement.id)}
            />
        </div>
    ));



    if (props.loading) {
        form1 = <Spinner />;
        form2 = <Spinner />;
        form3 = <Spinner />;
    }
    let errorMessage = null;
    if (props.error) {
        errorMessage = <p>{props.error.message}</p>;
    }
    let authRedirect = null;
    if (props.isAuthenticated) {

        authRedirect = <Redirect to={props.authRedirectPath} />;
    } /* else {
        props.onSetAuthRedirectPath('/dashboard');
        authRedirect = <Redirect to={props.authRedirectPath} />;  
    } */
  //  var bg = require('../../assets/images/paqAlcance.png')


    return (<div className={classes.container} style={{ paddingTop: '5px' }}>
        {
            (choice === 0) && <Uxi>
                <BrowserView>
                    <div className={classes.container} style={{/*  top: '20%', */ paddingTop: '15px' }}>
                        <Grid container spacing={2} justify="center" alignItems="center" direction="row">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto',/*  padding: '25px', */ margin: '0 auto' }}>
                                <Grid zeroMinWidth container item direction='row' justify="center" alignItems="center" xs={12} md={12} lg={12} spacing={0} >
                                    <Grid zeroMinWidth container item direction='column' justify="center" alignItems="center" xs={8} md={8} lg={8} spacing={0}  >
                                        <div style={{
                                            flex: 0, display: 'flex', flexDirection: 'row', backgroundColor: '#F8BB47', boxShadow: '0 2px 3px #ccc',
                                            border: '1px solid #eee', padding: '10px', boxSizing: 'border-box', borderRadius: '25px',
                                        }}>
                                            <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                                                <div className={[classes.title, /* { fontSize: '1.2vw', whiteSpace: 'nowrap', backgroundColor: '#F8BB47', width: '100%', height: '100%', color: 'white' } */]}>
                                                    <h2 style={{ paddingLeft: '13px', lineHeight: '8px', margin: 0, marginTop: '12px', maxWidth: '98%', paddingRight: '8px', marginBottom: '0px', fontSize: '1.4vh' }}>Registrate</h2>
                                                    <div style={{ margin: 0, marginTop: '5px', paddingLeft: '13px', marginLeft: '10%', lineHeight: '1px', height: '2px', border: '1px solid white', backgroundColor: 'white', borderRadius: '2px', width: '20px' }} />
                                                </div>
                                            </div>
                                            <div style={{
                                                paddingLeft: '10px', margin: 0, 
                                                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                                                marginTop: '-9px', marginBottom: '-10px', marginRight: '-10px',
                                                borderTopRightRadius: '25px', borderBottomRightRadius: '25px',
                                                backgroundColor: 'white',
                                            }}>
                                                <div style={{ flex: 1 }}>
                                                    <h3 style={{ paddingLeft: '13px', color: '#f9ba45df' }}>Tipo de usuario</h3>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <div style={{ flex: 1, marginTop: '12px', marginBottom: '5px', fontSize: ' bold', textAlign: ' center', display: 'flex', justifyContent: 'center', fontFamily: 'AvenirBlack', }}                                        >
                                                        <FlashingButton label={'CLIENTE'}
                                                            clicked={(e) => { setChoice(1); setChoiceText('Cliente') }}
                                                            style={{
                                                                color: color.washedBlack, alignSelf: 'center', backgroundColor: '#f8bb48',
                                                                borderRadius: '10px', minHeight: '50px', fontWeight: 'bold', textAlign: ' center', width: '120px'
                                                            }}
                                                        />
                                                    </div>
                                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center',   }}>  <img src={arrow} alt="arrow" style={{ transform: 'rotate(0deg)' }} /> </div>
                                                    <div style={{ display: 'block', paddingLeft: '15px', paddingRight: '15px' }}>
                                                        <p>Elige esto si vas a recibir dinero y comprar productos y servicios.</p>
                                                    </div>

                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <div style={{ flex: 1, marginTop: '12px', marginBottom: '5px', fontSize: ' bold', textAlign: ' center', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', fontFamily: 'AvenirBlack', }}                                        >
                                                        <FlashingButton label={'COMERCIO'}
                                                            clicked={(e) => { setChoice(1); setChoiceText('Comercio') }} style={{
                                                                color: color.washedBlack, alignSelf: 'center', backgroundColor: '#f8bb48',
                                                                borderRadius: '10px', minHeight: '50px', fontWeight: 'bold', textAlign: ' center', width: '120px'
                                                            }}
                                                        />
                                                    </div>
                                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}> <img src={arrow} alt="arrow" /></div>
                                                    <div style={{ display: 'block', paddingLeft: '15px', paddingRight: '15px' }}><p>Elige esto si eres un comercio que desea acceptar Paquete Alcance.</p></div>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px', }}>
                                                    <div style={{ flex: 1, marginTop: '12px', marginBottom: '5px', fontWeight: 'bold', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', fontFamily: 'AvenirBlack', }}                                        >
                                                        <FlashingButton label={'CONTROL'}
                                                            clicked={(e) => { setChoice(1); setChoiceText('Control') }}
                                                            style={{
                                                                color: color.washedBlack, alignSelf: 'center', backgroundColor: '#f8bb48',
                                                                borderRadius: '10px', minHeight: '50px', fontWeight: 'bold', textAlign: ' center', width: '120px'
                                                            }} />
                                                    </div>
                                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}> <img src={arrow} alt="arrow" /></div>
                                                    <div style={{ display: 'block', paddingLeft: '15px', paddingRight: '15px' }}>   <p>Elige esto si pertenece a una embazada. </p></div>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </div >
                </BrowserView>
                <MobileView>
                    <div style={{/*  top: '20%', */ paddingTop: '5%' }}>
                        <Grid container spacing={2} justify="center" alignItems="center" direction="row">
                            <Grid zeroMinWidth container item direction='column' justify="center" alignItems="center" xs={11} md={11} lg={11} spacing={1}  >
                                <Grid zeroMinWidth container item direction='column' justify="center" alignItems="center" xs={12} md={12} lg={12} spacing={1}   /*  xs={10} sm={8} md={6} lg={6} xl={3} */>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto',/*  padding: '25px', */ margin: '0 auto' }}>
                                        <Grid zeroMinWidth container item direction='column' justify="center" alignItems="center" xs={12} md={12} lg={12} spacing={0} >
                                            <Grid zeroMinWidth container item direction='column' justify="center" alignItems="center" xs={12} md={12} lg={12} spacing={0}  >
                                                <div style={{
                                                    boxShadow: '0 2px 3px #ccc',
                                                    border: '1px solid #eee',
                                                    boxSizing: 'border-box',
                                                    display: 'flex',
                                                    alignSelf: 'stretch',
                                                    marginRight: '0px',
                                                    height: '30%',
                                                    width: '100%',
                                                    borderTopLeftRadius: '10px',
                                                    borderTopRightRadius: '10px',
                                                    backgroundColor: '#f7be3b',
                                                }} >
                                                    <div className={[classes.title, { fontSize: '1.2vw', whiteSpace: 'nowrap', borderTopLeftRadius: '15px', borderTopRightRadius: '15px', backgroundColor: '#F8BB47', width: '100%', height: '100%', }]}>
                                                        <h2 style={{ paddingLeft: '20px', lineHeight: '8px', maxWidth: '98%', paddingRight: '8px', marginTop: '35px', color: 'white', fontFamily: 'AvenirBook' }}>Registrate</h2>
                                                        {/*   <p style={{ marginLeft: '10%', lineHeight: '1px', top: '-6px', borderTop: '5px solid white', width: '20px' }} /> */}
                                                    </div>
                                                    {/*  </Grid> */}
                                                </div>
                                            </Grid>
                                            <Grid zeroMinWidth container item direction='row' justify="center" alignItems="center">
                                                <ReactResizeDetector handleWidth handleHeight
                                                    onResize={(width, height) => { }} />
                                                <div style={{
                                                    boxShadow: '0 2px 3px #ccc',
                                                    border: '1px solid #eee',
                                                    boxSizing: 'border-box',
                                                    alignSelf: 'center',
                                                    justifyContent: 'center',
                                                    marginLeft: '0px',
                                                    marginRight: '0px',
                                                    height: '80%',
                                                    width: '100%',
                                                    borderBottomLeftRadius: '10px',
                                                    borderBottomRightRadius: '10px',
                                                    backgroundColor: '#ffffff',
                                                    paddingTop: '30px',
                                                    marginBottom: '30px'
                                                }}>
                                                    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                                                        <div style={{ flex: 1, marginTop: '12px', marginBottom: '5px', fontSize: ' bold', textAlign: ' center', display: 'flex', justifyContent: 'center', fontFamily: 'AvenirBlack', width: '60%', height: '60%' }}                                        >
                                                            <FlashingButton label={'CLIENTE'}
                                                                clicked={(e) => { setChoice(1); setChoiceText('Cliente') }}
                                                                style={{
                                                                    color: color.washedBlack, alignSelf: 'center', backgroundColor: '#f8bb48',
                                                                    borderRadius: '10px', minHeight: '50px', fontWeight: 'bold', textAlign: ' center',
                                                                }}
                                                            />
                                                        </div>
                                                        <div style={{ display: 'block', paddingTop: '10px' }}> <img src={arrow2} alt="arrow2" /> </div>
                                                        <div style={{ display: 'block', paddingLeft: '15px', paddingRight: '15px' }}>
                                                            <p>Elige esto si vas a recibir dinero y comprar productos y servicios.</p>
                                                        </div>




                                                        <div style={{ flex: 1, marginTop: '12px', marginBottom: '5px', fontSize: ' bold', textAlign: ' center', display: 'flex', justifyContent: 'center', fontFamily: 'AvenirBlack', width: '60%', height: '60%' }}                                        >
                                                            <FlashingButton label={'COMERCIO'}
                                                                clicked={(e) => { setChoice(1); setChoiceText('Comercio') }} style={{
                                                                    color: color.washedBlack, alignSelf: 'center', backgroundColor: '#f8bb48',
                                                                    borderRadius: '10px', minHeight: '50px', fontWeight: 'bold', textAlign: ' center',
                                                                }}
                                                            />
                                                        </div>
                                                        <div style={{ display: 'block', paddingTop: '10px' }}> <img src={arrow2} alt="arrow2" /></div>
                                                        <div style={{ display: 'block', paddingLeft: '15px', paddingRight: '15px' }}><p>Elige esto si eres un comercio que desea acceptar Paquete Alcance.</p></div>




                                                        <div style={{ flex: 1, marginTop: '12px', marginBottom: '5px', fontSize: ' bold', textAlign: ' center', display: 'flex', justifyContent: 'center', fontFamily: 'AvenirBlack', width: '60%', height: '60%' }}                                        >
                                                            <FlashingButton label={'CONTROL'}
                                                                clicked={(e) => { setChoice(1); setChoiceText('Control') }}
                                                                style={{
                                                                    color: color.washedBlack, alignSelf: 'center', backgroundColor: '#f8bb48',
                                                                    borderRadius: '10px', minHeight: '50px', fontWeight: 'bold', textAlign: ' center',
                                                                }} />
                                                        </div>
                                                        <div style={{ display: 'block', paddingTop: '10px' }}> <img src={arrow2} alt="arrow2" /></div>
                                                        <div style={{ display: 'block', paddingLeft: '15px', paddingRight: '15px' }}>   <p>Elige esto si pertenece a una embazada. </p></div>


                                                    </div>

                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div >
                </MobileView>
            </Uxi>
        }

        {
            (choice > 0) && <Uxi>
                <BrowserView>
                    <div className={classes.container}>
                        <Grid container spacing={2} justify="center" alignItems="center" direction="row">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto',/*  padding: '25px', */ margin: '0 auto' }}>
                                <Grid zeroMinWidth container item direction='row' justify="center" alignItems="center" xs={12} md={12} lg={12} spacing={0} >
                                    <Grid zeroMinWidth container item direction='column' justify="center" alignItems="center" xs={10} md={10} lg={10} spacing={0}  >
                                        <div style={{
                                            flex: 0, display: 'flex', flexDirection: 'row', backgroundColor: '#F8BB47', boxShadow: '0 2px 3px #ccc',
                                            border: '1px solid #eee', padding: '10px', boxSizing: 'border-box', borderRadius: '25px', width: '100'
                                        }}>
                                            <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                                                <div className={[classes.title, /* { fontSize: '1.2vw', whiteSpace: 'nowrap', backgroundColor: '#F8BB47', width: '100%', height: '100%', color: 'white' } */]}>
                                                    <h2 style={{ paddingLeft: '13px', lineHeight: '8px', margin: 0, marginTop: '12px', maxWidth: '98%', paddingRight: '8px', marginBottom: '0px', fontSize: '1.4vh' }}>Registrate</h2>
                                                    <div style={{ margin: 0, marginTop: '5px', paddingLeft: '13px', marginLeft: '10%', lineHeight: '1px', height: '2px', border: '1px solid white', backgroundColor: 'white', borderRadius: '2px', width: '20px' }} />
                                                </div>
                                            </div>
                                            <div style={{
                                                paddingLeft: '10px', margin: 0, 
                                                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                                                marginTop: '-9px', marginBottom: '-10px', marginRight: '-10px',
                                                borderTopRightRadius: '25px', borderBottomRightRadius: '25px',
                                                backgroundColor: 'white', minWidth: '300px'
                                            }}>
                                                <div style={{ marginTop: '20px', width: '100%' }}>
                                                    {/*    <div className={classes.Auth} style={{ margin: '0px', height: 'max-content', width: '60%', display: 'table-cell' }}> */}
                                                    {authRedirect}
                                                    {errorMessage}
                                                    <form onSubmit={(e) => register(e)} style={{ width: '95%' }}>
                                                        {choiceText === 'Cliente' && form1}
                                                        {choiceText === 'Comercio' && form2}
                                                        {choiceText === 'Control' && form3}
                                                    </form>

                                                    <div className={classes.row}>
                                                        <div style={{ flex: 2, marginTop: '12px', marginBottom: '12px', fontSize: ' bold', textAlign: ' center', display: 'flex', justifyContent: 'center', fontFamily: 'AvenirBlack', width: '100%', height: '60%' }}                                        >
                                                            <FlashingButton
                                                                clicked={(e) => { register(e) }}
                                                                label={'ENVIAR'}
                                                                style={{ color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '10px', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }} />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </div >
                </BrowserView>




                <MobileView>
                    <div style={{ paddingTop: '5%' }}>
                        <Grid container spacing={2} justify="center" alignItems="center" direction="row">
                            <Grid zeroMinWidth container item direction='column' justify="center" alignItems="center" xs={11} md={11} lg={11} spacing={1}  >
                                <Grid zeroMinWidth container item direction='column' justify="center" alignItems="center" xs={12} md={12} lg={12} spacing={0} >
                                    <Grid zeroMinWidth container item direction='column' justify="center" alignItems="center" xs={12} md={12} lg={12} spacing={0}  >
                                        <div style={{
                                            boxShadow: '0 2px 3px #ccc',
                                            border: '1px solid #eee',
                                            boxSizing: 'border-box',
                                            display: 'flex',
                                            alignSelf: 'stretch',
                                            marginRight: '0px',
                                            height: '30%',
                                            width: '100%',
                                            borderTopLeftRadius: '10px',
                                            borderTopRightRadius: '10px',
                                            backgroundColor: '#f7be3b',
                                        }} >
                                            <div className={[classes.title, { fontSize: '1.2vw', whiteSpace: 'nowrap', borderTopLeftRadius: '15px', borderTopRightRadius: '15px', backgroundColor: '#F8BB47', width: '100%', height: '100%', }]}>
                                                <h2 style={{ paddingLeft: '20px', lineHeight: '8px', maxWidth: '98%', paddingRight: '8px', marginTop: '35px', color: 'white', fontFamily: 'AvenirRoman' }}>{choiceText}</h2>
                                                {/*   <p style={{ marginLeft: '10%', lineHeight: '1px', top: '-6px', borderTop: '5px solid white', width: '20px' }} /> */}
                                            </div>
                                            {/*  </Grid> */}
                                        </div>
                                    </Grid>

                                    <Grid zeroMinWidth container item direction='row' justify="center" alignItems="center" xs={12} md={12} lg={12} spacing={0} >

                                        <div style={{
                                            boxShadow: '0 2px 3px #ccc',
                                            border: '1px solid #eee',
                                            boxSizing: 'border-box',
                                            alignSelf: 'center',
                                            justifyContent: 'center',
                                            marginLeft: '0px',
                                            marginRight: '0px',
                                            height: '80%',
                                            width: '100%',
                                            borderBottomLeftRadius: '10px',
                                            borderBottomRightRadius: '10px',
                                            backgroundColor: '#ffffff',
                                            paddingTop: '30px',
                                            marginBottom: '30px'
                                        }}>



                                            {/*    <div className={classes.Auth} style={{ margin: '0px', height: 'max-content', width: '60%', display: 'table-cell' }}> */}
                                            {authRedirect}
                                            {errorMessage}
                                            <form onSubmit={(e) => register(e)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch', width: '90%', marginLeft: '5%' }}>
                                                {choiceText === 'Cliente' && form1}
                                                {choiceText === 'Comercio' && form2}
                                                {choiceText === 'Control' && form3}
                                            </form>
                                            <div style={{
                                                flex: 2, marginTop: '12px', marginBottom: '10%', fontSize: ' bold', textAlign: ' center',
                                                display: 'flex', justifyContent: 'center', fontFamily: 'AvenirBlack', height: '60%', width: '90%', marginLeft: '5%'
                                            }}                                        >
                                                <FlashingButton
                                                    clicked={(e) => { register(e) }}
                                                    label={'ENVIAR'}
                                                    style={{ color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '10px', minHeight: '40px', fontWeight: 'bold', textAlign: ' center', }} />
                                            </div>


                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>


                </MobileView>

            </Uxi>
        }
    </div >

    );
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.authenticated,
        authRedirectPath: state.auth.authRedirectPath
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, userType, history, isSignup, ) => dispatch(actions.auth(email, password, userType, history, isSignup)),

        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Register, axios));

