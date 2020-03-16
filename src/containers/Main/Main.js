import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Main.css';
import Input from '../../components/UI/Input/Input';
import Button from '@material-ui/core/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';
import { Checkbox, FormControlLabel } from '@material-ui/core';
 
const Main = (props) => {
    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Usuario/Email'
            },
            value:   'a@a.aaa' ,
            validation: {
                required: true,
                isEmail: true
            },
            valid:  true  ,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Contrasena'
            },
            value:  '123456',
            validation: {
                required: true,
                minLength: 6
            },
            valid: true  ,
            touched: false
        }
    });

    const [authForm1, setAuthForm1] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Usuario/Email'
            },
            value: '' ,
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
                placeholder: 'Contrasena'
            },
            value: '' ,
            validation: {
                required: true,
                minLength: 6
            },
            valid:  false,
            touched: false
        }
    });
    const [isSignup, setIsSignup] = useState(false);
    const [isRememberMe, setIsRememberMe] = useState(true);
    const [cliente, setCliente] = useState(false);
    const [comercio, setComercio] = useState(false);
    const [control, setControl] = useState(false);
    const [errorMssage, setErrorMessage] = useState(null);
    useEffect(() => {
        if (props.authRedirectPath !== '/') {
            props.onSetAuthRedirectPath('/dashboard');
         
        }

    }, []);
    useEffect(() => {
        setErrorMessage(<p style={{ textAlign: 'center' }}>{props.error}</p>);
    }, [props.error]);
    const inputChangedHandler = (event, controlName) => {
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
        setAuthForm(updatedControls);
    };

    const submitHandler = event => {
        event.preventDefault();
        if (!authForm.email.valid) return alert('email not valid');
        if (!authForm.password.valid) return alert('password not valid');

        if (!(cliente === true || comercio == true || control == true)) return alert('select type of account');
        if (cliente === true) { props.onAuth(authForm.email.value, authForm.password.value, 'client', props.history, isSignup); }
        if (comercio === true) { props.onAuth(authForm.email.value, authForm.password.value, 'comercio', props.history, isSignup); }
        if (control === true) { props.onAuth(authForm.email.value, authForm.password.value, 'control', props.history, isSignup); }


        //props.onAuth(authForm.email.value, authForm.password.value, isSignup);
    };

    const switchAuthModeHandler = () => {
        //  setIsSignup(!isSignup);
        props.onSetAuthRedirectPath('/');
        props.history.push('/register')
    };

    const formElementsArray = [];
    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key]
        });
    }

    let form = formElementsArray.map((formElement,idx) => (
        <Input
            key={idx}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => inputChangedHandler(event, formElement.id)}
        />
    ));

    if (props.loading) {
        form = <Spinner />;
    }





    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />;
    }

    const handleChangeCheckbox = event => { setIsRememberMe(!isRememberMe) }

    return (
        <div className={classes.container}>
            <div className={classes.centered}>

                <div className={classes.row}>
                    <div className={classes.loginFrmae} >
                        <div className={classes.title}>
                            <h2 style={{ paddingLeft: '13px', lineHeight: '15px', }}>Iniciar sesion</h2>
                            <p style={{ marginLeft: '10%', lineHeight: '1px', top: '0px', borderTop: '5px solid white', width: '20px' }} />
                        </div>
                    </div>
                    <div className={classes.Auth}>
                        {authRedirect}
                        {errorMssage}
                        <form onSubmit={submitHandler}>
                            {/* <FormControl variant="outlined" className={classes.formControl}>
                                {/*  <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                                    Age
                                   </InputLabel>  
                                <Select
                                    native
                                    value={userType}
                                    onChange={value => { return setUserType(value) }}
                                     labelWidth={labelWidth}  
                                    inputProps={{
                                        name: 'age',
                                        id: 'outlined-age-native-simple',
                                    }}
                                >

                                    <option value={10}>Cliente</option>
                                    <option value={20}>Comercio</option>
                                    <option value={30}>Control</option>
                                </Select>
                            </FormControl> */}
                            <div style={{ display: 'block', justifyContent: 'center', justifyItems: 'center', textAlign: 'center' }}>
                                <FormControlLabel
                                    style={{ left: '2px', alignSelf: 'flex-start', fontFamily: 'sans', height: '15px' }}
                                    control={
                                        <Checkbox
                                            onChange={() => setTimeout(() => { setCliente(!cliente); setComercio(false); setControl(false) }, 0.5)}
                                            checked={cliente}
                                            value={cliente}
                                            color='primary'
                                        />
                                    }
                                    label={'Cliente'}
                                />
                                <FormControlLabel
                                    style={{ left: '2px', alignSelf: 'flex-start', fontFamily: 'sans', height: '15px' }}
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
                                <FormControlLabel
                                    style={{ left: '2px', alignSelf: 'flex-start', fontFamily: 'sans', height: '15px' }}
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
                            {form}
                            <FormControlLabel
                                style={{ left: '2px', alignSelf: 'flex-start', fontFamily: 'sans', height: '15px' }}
                                control={
                                    <Checkbox
                                        onChange={handleChangeCheckbox}
                                        value={isRememberMe}
                                        color='primary'
                                    />
                                }
                                label={'Recuerdame'}
                            />
                        </form>

                        <div className={classes.row} style={{ display: 'flex', justifyContent: 'center', justifyItems: 'center', textAlign: 'center' }}>
                            <Button color="primary"
                                style={{ color: 'black', backgroundColor: '#f8bb48', borderRadius: '5px', fontSize: ' bold', textAlign: ' center', }}
                                onClick={(e) => submitHandler(e)}>
                                ENVIAR
                              </Button>
                            <p style={{ fontSize: '15px', textAlign: 'center', paddingLeft: '13px', paddingRight: '13px', }}>O</p>
                            <Button color="primary"
                                style={{ color: '#f8bb48', backgroundColor: 'white', borderRadius: '5px', border: '3px solid #f8bb48', borderColor: '#f8bb48 !important', fontSize: ' bold', textAlign: ' center' }}
                                onClick={switchAuthModeHandler}>
                                REGISTRATE
                              </Button>

                        </div>
                    </div>

                </div>

            </div>
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
  onResetErrors: () => dispatch(actions.authFail()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main); 