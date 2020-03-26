import React, {  useState, useRef } from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';
//import classes from './UserInfo.css';
import Uxi from '../../hoc/Uxi/Uxi';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../shared/utility';
//import { Button } from '@material-ui/core';
import FlashingButton from '../../components/UI/FlashingButton/FlashingButton'
import { BrowserView, MobileView, /* isBrowser, isMobile */ } from "react-device-detect";
const InfoForm = props => {
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
            validation: {
                required: true,
                isEmail: false
            },
            value: '',
            valid: false,
            touched: false
        },
        department: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Dirección'
            },
            validation: {
                required: true,
                isEmail: false
            },
            value: '',
            valid: false,
            touched: false
        },
        state: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Estado'
            },
            validation: {
                required: true,
                isEmail: false
            },
            value: '',
            valid: false,
            touched: false
        },
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Nombre'
            },
            validation: {
                required: true,
                isEmail: false
            },
            value: '',
            valid: false,
            touched: false
        },
        surnme: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Apellido'
            },
            validation: {
                required: true,
                isEmail: false
            },
            value: '',
            valid: false,
            touched: false
        },
        phone: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Teléfono'
            },
            validation: {
                required: true,
                isEmail: false
            },
            value: '',
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email'
            },
            validation: {
                required: true,
                isEmail: true
            },
            value: '',
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Clave'
            },
            validation: {
                required: true,
                minLength: 6
            },
            value: '',
            valid: false,
            touched: false
        },
        passwordRepeat: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Repetir Clave'
            },
            validation: {
                required: true,
                minLength: 6

            },
            value: '',
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
            validation: {
                required: true,
                isEmail: false
            },
            value: '',
            valid: false,
            touched: false
        },
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Nombre'
            },
            validation: {
                required: true,
                isEmail: false
            },
            value: '',
            valid: false,
            touched: false
        },
        surnme: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Apellido'
            },
            validation: {
                required: true,
                isEmail: false
            },
            value: '',
            valid: false,
            touched: false
        },
        birthDate: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Fecha nacimento'
            },
            validation: {
                required: true,
                isEmail: false
            },
            value: '',
            valid: false,
            touched: false
        },
        id: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Num. nacional identidad'
            },
            validation: {
                required: true,
                isEmail: false
            },
            value: '',
            valid: false,
            touched: false
        },
        department: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Dirección'
            },
            validation: {
                required: true,
                isEmail: false
            },
            value: '',
            valid: false,
            touched: false
        },
        state: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Estado'
            },
            validation: {
                required: true,
                isEmail: false
            },
            value: '',
            valid: false,
            touched: false
        },
        phone: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Teléfono'
            },
            validation: {
                required: true,
                isEmail: false
            },
            value: '',
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email'
            },
            validation: {
                required: true,
                isEmail: true
            },
            value: '',
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Clave'
            },
            validation: {
                required: true,
                minLength: 6
            },
            value: '',
            valid: false,
            touched: false
        },
        passwordRepeat: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Repetir Clave'
            },
            validation: {
                required: true,
                minLength: 6
            },
            value: '',
            valid: false,
            touched: false
        }
    });
    const [isChangingPswd, setIsChangingPswd] = useState(null);

    const [pass, setPass] = useState({
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Clave',
            autoFocus: true
        },
        value: '',
        validation: {
            required: true,
            minLength: 6
        },
        valid: false,
        touched: false
    });
    const [passVer, setPassVer] = useState({
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Repetir Clave',

        },
        validation: {
            required: true,
            minLength: 6,
            equals: { val: `${pass.value}` }
        },
        value: '',
        valid: false,
        touched: false
    });

 


    let info1 = useRef(null), info2 = useRef(null), info3 = useRef(null);
    const formElementsArray1 = [], formElementsArray2 = [], formElementsArray3 = [];
    for (let key in authForm1) { formElementsArray1.push({ id: key, config: authForm1[key] }); }
    for (let key in authForm2) { formElementsArray2.push({ id: key, config: authForm2[key] }); }
    for (let key in authForm3) { formElementsArray3.push({ id: key, config: authForm3[key] }); }

    let form1 = formElementsArray1.map((formElement, idx) => {

        return (
            (idx < formElementsArray1.length - 2)
                ? <div style={{ display: 'flex', flexDirection: 'column' }} key={formElement.id}>

                    <div style={{ display: 'flex', flexDirection: 'row' }} ref={re => re && re.current && re.current.focus()}>
                        <Input
                            key={idx}

                            labelStyle={{ textAlign: 'left', paddingLeft: '0px', }}
                            inputStyle={{ paddingTop: '10px', minHeight: '40px', fontSize: '16px', marginLeft: '0px', paddingLeft: '10px', marginRight: '5px', }}

                            label={formElement.config.elementConfig.placeholder}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={event => inputChangedHandler(event, formElement.id)}
                        />

                    </div>
                </div>
                : null
        )
    });
    let form2 = formElementsArray2.map((formElement, idx) => {

        return (
            (idx < formElementsArray2.length - 2)
                ? <div style={{ display: 'flex', flexDirection: 'column' }} key={formElement.id}>
                    {(idx === 2) && <p style={{ textAlign: 'left', paddingLeft: '12px' }}>Representante legal</p>}
                    <div style={{ display: 'flex', flexDirection: 'row' }}>


                        <div style={{ display: 'flex', flex: 1, }}
                        >

                            <Uxi>
                                <Input
                                    key={formElement.idx}

                                    labelStyle={{ textAlign: 'left', paddingLeft: '0px', }}
                                    inputStyle={{ paddingTop: '10px', minHeight: '40px', fontSize: '16px', marginLeft: '0px', paddingLeft: '10px', marginRight: '5px', }}

                                    label={formElement.config.elementConfig.placeholder}

                                    elementType={formElement.config.elementType}
                                    elementConfig={formElement.config.elementConfig}
                                    value={formElement.config.value}
                                    invalid={!formElement.config.valid}
                                    shouldValidate={formElement.config.validation}
                                    touched={formElement.config.touched}
                                    changed={event => inputChangedHandler(event, formElement.id)}
                                />

                            </Uxi>
                        </div>
                    </div>
                </div>
                : null
        )
    });

    let form3 = formElementsArray3.map((formElement, idx) => {
        return (
            (idx < formElementsArray3.length - 2)
                ? <div style={{ display: 'flex', flexDirection: 'row' }} key={formElement.id}>
                    <div style={{ display: 'flex', flex: 1, }}>
                        <Input
                            key={idx}

                            labelStyle={{ textAlign: 'left', paddingLeft: '0px', }}
                            inputStyle={{ paddingTop: '10px', minHeight: '40px', fontSize: '16px', marginLeft: '0px', paddingLeft: '10px', marginRight: '5px', }}

                            label={formElement.config.elementConfig.placeholder}

                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={event => inputChangedHandler(event, formElement.id)}
                        />
                    </div>
                </div>
                : null
        )
    });

    info1 = <div ref={re => info2 = re} name='info1' style={{ width: '100%' }}>
        {formElementsArray1.map((formElement, idx) => {

            return ((idx < formElementsArray1.length - 2)
                ? <div style={{ display: 'flex', flexDirection: 'row', borderBottom: '1px solid lightgray' /* '1px solid #f8bb48' */, width: '100%' }} key={formElement.id}>
                    <div style={{ flex: 1, display: 'flex', height: '30%', width: '70%', alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start', alignSelf: 'center', flexWrap: 'wrap', }}>
                        <p style={{ textAlign: 'left', fontWeight: '400', color: 'gray', fontFamily: 'AvenirRoman' }}>{formElement.config.elementConfig.placeholder}</p>
                    </div>
                    <div style={{ flex: 1, display: 'flex', height: '30%', width: '70%', alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end', alignSelf: 'center', flexWrap: 'wrap', }}  >
                        <p style={{ textAlign: 'right', fontWeight: '900' }}>{formElement.config.value}</p>
                    </div>
                </div>
                : null

            )
        })}</div>
    info2 = <div ref={re => info2 = re} name='info2' style={{ width: '100%' }}>
        {
            formElementsArray2.map((formElement, idx) => {
                return ((idx < formElementsArray2.length - 2)
                    ? <div style={{ display: 'flex', flexDirection: 'column' }} key={formElement.id}>
                        {(idx === 2) && <p style={{ textAlign: 'left', paddingLeft: '12px' }}>Representante legal</p>}
                        <div style={{ display: 'flex', flexDirection: 'row', borderBottom: '1px solid lightgray', }} >

                            <div style={{ flex: 1, display: 'flex', height: '30%', width: '70%', alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start', alignSelf: 'center', flexWrap: 'wrap', }}>
                                <p style={{ textAlign: 'left', fontWeight: '400', color: 'gray', fontFamily: 'AvenirRoman' }}>{formElement.config.elementConfig.placeholder}</p>
                            </div>
                            <div style={{ flex: 1, display: 'flex', height: '30%', width: '70%', alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end', alignSelf: 'center', flexWrap: 'wrap', }}  >
                                <p style={{ textAlign: 'right', fontWeight: '900' }}>{formElement.config.value}</p>
                            </div>
                        </div>
                    </div>
                    : null
                )

            })}
    </div>
    info3 = <div ref={re => info1 = re} name='info3' style={{ width: '100%' }}>
        {
            formElementsArray3.map((formElement, idx) => {
                /*   console.log('formElementsArray1.map->: '+ JSON.stringify(formElement));
               */
                return ((idx < formElementsArray3.length - 2)
                    ? <div style={{ display: 'flex', flexDirection: 'row', borderBottom: '1px solid lightgray', }} key={formElement.id}>
                        <div style={{ flex: 1, display: 'flex', height: '30%', width: '70%', alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start', alignSelf: 'center', flexWrap: 'wrap', }}>
                            <p style={{ textAlign: 'left', fontWeight: '400', color: 'gray', fontFamily: 'AvenirRoman' }}>{formElement.config.elementConfig.placeholder}</p>
                        </div>
                        <div style={{ flex: 1, display: 'flex', height: '30%', width: '70%', alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end', alignSelf: 'center', flexWrap: 'wrap', }}  >
                            <p style={{ textAlign: 'right', fontWeight: '900' }}>{formElement.config.value}</p>
                        </div>
                    </div>
                    : null
                )
            })
        }</div>

    if (props.loading) { form1 = <Spinner />; form2 = <Spinner />; form3 = <Spinner />; }
    const inputChangedHandler = (event, controlName) => {
       // console.log('=>', controlName);
        let authForm = authForm1;
        if (props.userType === 'client') authForm = authForm1;
        if (props.userType === 'comercio') authForm = authForm2;
        if (props.userType === 'control') authForm = authForm3;
      //  console.log('=>', JSON.stringify(props.userType));
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


        //   console.log('=>', JSON.stringify(updatedControls));
        if (props.userType === 'client') setAuthForm1(updatedControls);
        if (props.userType === 'comercio') setAuthForm2(updatedControls);
        if (props.userType === 'control') setAuthForm3(updatedControls);


    };



    return (<div style={{ display: 'flex', flex: 1, width: '100%', justifyContent: 'center' }}>
        <BrowserView style={{ width: '100%' }}>
            <div style={{ marginTop: '10%', zIndex: '100', flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', }}>
                {
                    (props.editable)
                        ?
                        <div style={{ position: 'relative', flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', /* marginTop: !changingAvatar ? '30%' : '0px' */ }}>
                            <div style={{ width: '60%' }}>
                                <form onSubmit={(e) => { }} style={{ width: '100%' }}>
                                    {props.userType === 'client' && form1}
                                    {props.userType === 'comercio' && form2}
                                    {props.userType === 'control' && form3}
                                </form>
                            </div>

                        </div>
                        : <div style={{ position: 'relative', flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', /* marginTop: !changingAvatar ? '30%' : '0px' */ }}>
                            <div style={{ width: '100%' }}>
                                {props.userType === 'client' && info1}
                                {props.userType === 'comercio' && info2}
                                {props.userType === 'control' && info3}
                            </div>
                        </div>
                }
                <div style={{ paddingTop: '5px', width: '60%' }}>
                    <div style={{ width: '100%', paddingTop: '5px', }}  >
                        <FlashingButton
                            clicked={() => {
                                setIsChangingPswd(!isChangingPswd);
                                setPassVer(updateObject(passVer, { value: '', valid: false, touched: false, }));
                            }}
                            label={!isChangingPswd ? 'CHANGE PASSWORD' : 'CANCEL'}
                            style={{ height: '35px', fontSize: '14px', color: '#f8bb48', backgroundColor: 'white', /* width: '60%', paddingLeft: '20%', paddingRight: '20%' */ }}
                        />
                        {isChangingPswd && <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Input
                                key={'pass'}
                                labelStyle={{ textAlign: 'left', paddingLeft: '0px', }}
                                inputStyle={{ paddingTop: '10px', minHeight: '40px', fontSize: '16px', marginLeft: '0px', paddingLeft: '10px', marginRight: '5px', }}
                                label={pass.elementConfig.placeholder}
                                elementType={pass.elementType}
                                elementConfig={pass.elementConfig}
                                value={pass.value}
                                invalid={!pass.valid}
                                shouldValidate={pass.validation}
                                touched={pass.touched}
                                changed={event => {
                                    setPass(updateObject(pass, { value: event.target.value, valid: checkValidity(event.target.value, pass.validation), touched: true }));
                                }}
                            />

                            {pass.valid &&
                                <Input

                                    key={'passVer'}
                                    labelStyle={{ textAlign: 'left', paddingLeft: '0px', }}
                                    inputStyle={{ paddingTop: '10px', minHeight: '40px', fontSize: '16px', marginLeft: '0px', paddingLeft: '10px', marginRight: '5px', }}
                                    label={passVer.elementConfig.placeholder}
                                    elementType={passVer.elementType}
                                    elementConfig={passVer.elementConfig}
                                    value={passVer.value}
                                    invalid={!passVer.valid}
                                    shouldValidate={passVer.validation}
                                    touched={passVer.touched}
                                    changed={event => {
                                        setPassVer(updateObject(passVer, { value: event.target.value, valid: checkValidity(event.target.value, { ...passVer.validation, equals: { val: `${pass.value}` } }), touched: true }));
                                    }}
                                />
                            }
                            {passVer.valid &&
                                <div ref={saveDiv => saveDiv && saveDiv.focus()} style={{ marginBottom: '30%' }}>
                                    <FlashingButton
                                        clicked={() => {
                                            setIsChangingPswd(!isChangingPswd);
                                            setPassVer(updateObject(passVer, { value: '', valid: false, touched: false, }));

                                        }}

                                        label={'Save new password'}
                                        style={{ height: '35px', fontSize: '14px', color: '#f8bb48', backgroundColor: 'white', /* width: '60%', paddingLeft: '20%', paddingRight: '20%' */ }}
                                    />
                                </div>
                            }

                        </div>
                        }
                    </div>
                </div >
            </div >
        </BrowserView>
        <MobileView style={{ width: '100%' }}>
            <div style={{ marginTop: '10%', zIndex: '100', flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                {
                    (props.editable)
                        ?
                        <div style={{ position: 'relative', flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', /* marginTop: !changingAvatar ? '30%' : '0px' */ }}>
                            <div style={{ width: '100%' }}>
                                <form onSubmit={(e) => { }}>
                                    {props.userType === 'client' && form1}
                                    {props.userType === 'comercio' && form2}
                                    {props.userType === 'control' && form3}
                                </form>
                            </div>

                        </div>
                        : <div style={{ position: 'relative', flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', /* marginTop: !changingAvatar ? '30%' : '0px' */ }}>
                            <div style={{ width: '100%' }}>
                                {props.userType === 'client' && info1}
                                {props.userType === 'comercio' && info2}
                                {props.userType === 'control' && info3}
                            </div>
                        </div>
                }
                <div style={{ width: '100%', paddingTop: '5px' }}>
                    <div style={{ width: '100%', paddingTop: '5px', }}  >
                        <FlashingButton
                            clicked={() => {
                                setIsChangingPswd(!isChangingPswd);
                                setPassVer(updateObject(passVer, { value: '', valid: false, touched: false, }));
                            }}
                            label={!isChangingPswd ? 'CHANGE PASSWORD' : 'CANCEL'}
                            style={{ height: '35px', fontSize: '14px', color: '#f8bb48', backgroundColor: 'white', /* width: '60%', paddingLeft: '20%', paddingRight: '20%' */ }}
                        />
                        {isChangingPswd && <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Input
                                key={'pass'}
                                labelStyle={{ textAlign: 'left', paddingLeft: '0px', }}
                                inputStyle={{ paddingTop: '10px', minHeight: '40px', fontSize: '16px', marginLeft: '0px', paddingLeft: '10px', marginRight: '5px', }}
                                label={pass.elementConfig.placeholder}
                                elementType={pass.elementType}
                                elementConfig={pass.elementConfig}
                                value={pass.value}
                                invalid={!pass.valid}
                                shouldValidate={pass.validation}
                                touched={pass.touched}
                                changed={event => {
                                    setPass(updateObject(pass, { value: event.target.value, valid: checkValidity(event.target.value, pass.validation), touched: true }));
                                }}
                            />

                            {pass.valid &&
                                <Input

                                    key={'passVer'}
                                    labelStyle={{ textAlign: 'left', paddingLeft: '0px', }}
                                    inputStyle={{ paddingTop: '10px', minHeight: '40px', fontSize: '16px', marginLeft: '0px', paddingLeft: '10px', marginRight: '5px', }}
                                    label={passVer.elementConfig.placeholder}
                                    elementType={passVer.elementType}
                                    elementConfig={passVer.elementConfig}
                                    value={passVer.value}
                                    invalid={!passVer.valid}
                                    shouldValidate={passVer.validation}
                                    touched={passVer.touched}
                                    changed={event => {
                                        setPassVer(updateObject(passVer, { value: event.target.value, valid: checkValidity(event.target.value, { ...passVer.validation, equals: { val: `${pass.value}` } }), touched: true }));
                                    }}
                                />
                            }
                            {passVer.valid &&
                                <div ref={saveDiv => saveDiv && saveDiv.focus()} style={{ marginBottom: '30%' }}>
                                    <FlashingButton
                                        clicked={() => {
                                            setIsChangingPswd(!isChangingPswd);
                                            setPassVer(updateObject(passVer, { value: '', valid: false, touched: false, }));

                                        }}

                                        label={'Save new password'}
                                        style={{ height: '35px', fontSize: '14px', color: '#f8bb48', backgroundColor: 'white', /* width: '60%', paddingLeft: '20%', paddingRight: '20%' */ }}
                                    />
                                </div>
                            }

                        </div>
                        }
                    </div>
                </div >
            </div >
        </MobileView>
    </div>);
};

const mapStateToProps = state => {
    return {
        profileImage: state.al.profileImage,
        showUserInfo: state.al.showUserInfo,
        loading: state.auth.loading,
        userType: state.auth.userType,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
      
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),

        onSetShowUserInfo: (showUserInfo) => dispatch(actions.setShowUserInfo({ showUserInfo: showUserInfo })),
        onSetProfileImage: (proifileImage) => dispatch(actions.setProfileImage({ profileImage: proifileImage })),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(InfoForm, axios));
