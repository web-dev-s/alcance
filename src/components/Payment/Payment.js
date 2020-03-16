import React, { useState, useEffect } from 'react';
/* import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'; */

import classes from './Payment.css';
import Input from '../../components/UI/Input/Input';
import { Button, Grid } from '@material-ui/core';
import Spinner from '../../components/UI/Spinner/Spinner';

/* import * as actions from '../../store/actions/index'; */
import { /* updateObject, */ checkValidity } from '../../shared/utility';
/* import { Checkbox, FormControlLabel } from '@material-ui/core'; */

export const PaymentError = (props) => (
  <div hidden={props.hidden}>
    <div className="ui active inverted dimmer">
      <div className="ui icon message">
        <i className="warning sign icon"></i>
        <div className="content">
          <div className="header">
            ERROR
          </div>
          <p>El pago no puede ser completado.</p>
        </div>
      </div>
    </div>
  </div>
);

export const PaymentSuccess = (props) => (
  <div hidden={props.hidden}>
    <div className="ui active inverted dimmer" hidden={props.hidden}>
      <div className="ui icon message">
        <i className="child icon"></i>
        <div className="content">
          <div className="header">
            Felicidades
          </div>
          <p>El pago fue exitoso</p>
        </div>
      </div>
    </div>
  </div>
);

const Payment = props => {
  const [formAttempted, setFormAtempted] = useState(null);
  const [formState, setFormState] = useState('pending');
  const [ccToken, setCcToken] = useState('');
  const [data, setData] = useState({ card: { name: '', number: '', exp_year: '', exp_month: '', cvc: '' } })
  const [amountData, setAmountData] = useState({ val: '', valid: false, touched: false });
  const [cardDataValid, setCardDataValid] = useState({ name: false, number: false, exp_year: false, exp_month: false, cvc: false, });
  const [cardInputTouched, setCardInputTouched] = useState({ name: false, number: false, exp_year: false, exp_month: false, cvc: false, });
  const [serverResponse, setServerResponse] = useState();

  useEffect(() => { setServerResponse(''); }, [cardInputTouched]);
  // const ConektaPubKey = 'key_Nw1zYq3q7m82RoeL8FqKWrw';
  const paymentEndpoint = 'https://localhost:3005/wc-api/WC_Conekta_Cash_Gateway';
  const validateAllFields = () => {
    setCardInputTouched({ name: true, number: true, exp_year: true, exp_month: true, cvc: true, });
    setCardDataValid({
      name: checkValidity(data.card.name, { required: true, minLength: 2, maxLength: 50 }),
      number: checkValidity(data.card.number, { required: true, exactLength: 16, isNumeric: true }),
      exp_month: checkValidity(data.card.exp_month, { required: true, minLength: 1, maxLength: 2, isNumeric: true }),
      exp_year: checkValidity(data.card.exp_year, { required: true, exactLength: 4, isNumeric: true }),
      cvc: checkValidity(data.card.cvc, { required: true, exactLength: 3, isNumeric: true })
    });
    const isValid = checkValidity(amountData.val, { required: true, minLength: 1, isNumeric: true })
    setAmountData({ ...amountData, valid: isValid, touched: true });

    if (cardDataValid.name && cardDataValid.number && cardDataValid.exp_year && cardDataValid.exp_month && cardDataValid.cvc && amountData.valid) return true;
    else return false;

  };
  const handleCcSubmit = (event) => {

    if (validateAllFields()) {
      setFormAtempted(true);
      /* window.Conekta.setPublishableKey(ConektaPubKey); */
      window.Conekta.api_key = "key_eYvWV7gSDkNYXsmr"
      window.Conekta.api_version = "2.0.0"
      window.Conekta.token.create(data, conektaSuccessResponseHandler, conektaErrorResponseHandler)
      setTimeout(() => {
        if (ccToken && ccToken.id && ccToken.id.length > 1) { createPayment(data); }
        /*   else { alert('Token is: ' + ccToken) } */
      }, 2000);

    }

  }
  // CONEKTA
  function createPayment(form) {
    fetch(paymentEndpoint, { method: 'POST', body: form })
      .then((response) => response.json()) //if POST =404 (Not Found)=>throws Uncaught (in promise) SyntaxError: Unexpected token < in JSON at position 0
      .then((responseData) => {
        if (responseData.ready) { setFormState('success'); }
        else { setFormState('error'); }
        setFormAtempted('false');
      });
  }
  var conektaSuccessResponseHandler = token => { setServerResponse(JSON.stringify(token)); setCcToken(token); createPayment(data); };
  var conektaErrorResponseHandler = response => { alert("Error: " + response.message_to_purchaser); setFormAtempted('false'); setServerResponse(response.message_to_purchaser); };

  const LoadingAnimation = () => (
    <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', paddingTop: '2%' }}>
      <Spinner />
      <div className="ui massive text loader">Por favor espere</div>
      <Button color="primary"
        style={{ color: 'black', backgroundColor: '#f8bb48', borderRadius: '5px', fontSize: ' bold', textAlign: ' center', textAlignVertical: 'center' }}
        onClick={(e) => { setCcToken(''); setFormAtempted('false'); setServerResponse(''); }}>
        {'Cancel'}
      </Button>

    </div>
  );
  return (
    <div style={{ display: 'flex', margin: '0, auto', flexDirection: 'column', justifyContent: 'center', fontFamily: 'Arial' }}>
      {
        false &&
        <div style={{ justifyContent: 'center', display: 'flex' }}>
          <div /* className='content'  */ style={{ justifyContent: 'center', display: 'flex' }}>
            <div /* className='ui form' */ style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
              <form onSubmit={handleCcSubmit} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                <div className={['field', classes.fullRow]} >
                  <div style={{ width: '50%' }}>
                    <label>Nombre del tarjeta habiente</label>
                  </div>
                  <div style={{ width: '50%' }}>
                    <input
                      type='text'
                      size='20'
                      data-conekta='card[name]'
                      name='card_holder_name'
                      value={data.card.name}
                      onChange={(event) => setData({ card: { ...data.card, name: event.target.value } })}
                      required={true}
                    />
                  </div>  </div>
                <div className={['field', classes.fullRow]} >

                  <div style={{ width: '50%' }}>
                    <label>Número de tarjeta de crédito</label>
                  </div>
                  <div style={{ width: '50%' }}>
                    <input
                      type='text'
                      size='20'
                      data-conekta='card[number]'
                      name='card_nb'
                      value={data.card.number}
                      onChange={(event) => setData({ card: { ...data.card, number: event.target.value } })}
                      required={true}
                    />
                  </div>  </div>
                <div className={['field', classes.fullRow]} >
                  <div style={{ width: '50%' }}>
                    <label>Mes de Expiración</label>
                  </div>
                  <div style={{ width: '50%' }}>
                    <input
                      type='text'
                      size='4'
                      data-conekta='card[exp_month]'
                      name='expMonth'
                      value={data.card.exp_month}
                      onChange={(event) => setData({ card: { ...data.card, exp_month: event.target.value } })}
                      required={true}
                    />
                  </div>  </div>
                <div className={['field', classes.fullRow]} >
                  <div style={{ width: '50%' }}> <label>Año de Expiración</label></div>
                  <div style={{ width: '50%' }}>
                    <input
                      type='text'
                      size='2'
                      data-conekta='card[exp_year]'
                      name='expYear'
                      value={data.card.exp_year}
                      onChange={(event) => setData({ card: { ...data.card, exp_year: event.target.value } })}

                    />
                  </div>  </div>

                <div className={['field', classes.fullRow]} >
                  <div style={{ width: '50%' }}> <label>CVC</label></div>
                  <div style={{ width: '50%' }}>
                    <input
                      type='text'
                      size='4'
                      data-conekta='card[cvc]'
                      name='cvc'
                      value={data.card.cvc}
                      onChange={(event) => setData({ card: { ...data.card, cvc: event.target.value } })}
                      required={true}
                    />
                  </div>  </div>
                <input type='hidden' id='payment_engine' value="conekta" name='payment_engine' />
                <input type='hidden' id='payment_type' value="credit_card" name='payment_type' />
                <input type='hidden' id='conekta_credit_card_token' name='conekta_credit_card_token' value={ccToken} />
              </form>
              <div className='ui two bottom attached buttons'>
                <button
                  className='ui basic blue button'
                  disabled={formAttempted === true}
                  onClick={handleCcSubmit}
                >
                  Pagar
          </button>
              </div>
            </div>
          </div>
        </div>
      }
      <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row', width: '100%', paddingTop: '2%' }} >
        <div className={classes.Auth} style={{
          backgroundColor: 'white', marginLeft: '0px', width: '100%',  /*  text-align: center, */
          boxShadow: ' 0 2px 3px #ccc', border: '1px solid #eee', padding: '10px', boxSizing: ' border-box',
          height: '750px', borderTopRightRadius: ' 5px', borderBottomRightRadius: '5px', paddingTop: '2%'
        }}>

          <Grid zeroMinWidth direction='row' container item xs={12} spacing={1} justify="center" alignItems="center" >
            <div className={classes.Auth} style={{ margin: '0px', height: 'max-content', width: '80%', display: 'table-cell' }}>

              <form onSubmit={handleCcSubmit} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', paddingTop: '2%' }}>
                <div className={['field', classes.row]} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                  <div style={{ width: '50%' }}>
                    <label>Nombre del tarjeta habiente</label>
                  </div>
                  <div style={{ width: '50%', display: 'flex', alignSelf: 'center', justifyContent: 'center' }}>
                    <input
                      type='text'
                      size='20'
                      data-conekta='card[name]'
                      name='card_holder_name'
                      value={data.card.name}
                      onChange={(event) => setData({ card: { ...data.card, name: event.target.value } })}
                      required={true}
                    />
                  </div>
                </div>
                <div className={['field', classes.row]} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                  <div style={{ width: '50%' }}>
                    <label>Número de tarjeta de crédito</label>
                  </div>
                  <div style={{ width: '50%', display: 'flex', alignSelf: 'center', justifyContent: 'center' }}>
                    <input
                      type='text'
                      size='20'
                      data-conekta='card[number]'
                      name='card_nb'
                      value={data.card.number}
                      onChange={(event) => setData({ card: { ...data.card, number: event.target.value } })}
                      required={true}
                    />
                  </div>
                </div>
                <div className={['field', classes.row]} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                  <div style={{ width: '50%' }}>
                    <label>Mes de Expiración</label>
                  </div>
                  <div style={{ width: '50%', display: 'flex', alignSelf: 'center', justifyContent: 'center' }}>
                    <input
                      type='text'
                      size='2'
                      data-conekta='card[exp_month]'
                      name='expMonth'
                      value={data.card.exp_month}
                      onChange={(event) => setData({ card: { ...data.card, exp_month: event.target.value } })}
                      required={true}
                    />
                  </div>
                </div>
                <div className={['field', classes.row]} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                  <div style={{ width: '50%' }}> <label>Año de Expiración</label></div>
                  <div style={{ width: '50%', display: 'flex', alignSelf: 'center', justifyContent: 'center' }}>
                    <input
                      type='text'
                      size='4'
                      data-conekta='card[exp_year]'
                      name='expYear'
                      value={data.card.exp_year}
                      onChange={(event) => setData({ card: { ...data.card, exp_year: event.target.value } })}

                    />
                  </div>
                </div>
                <div className={['field', classes.row]} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                  <div style={{ width: '50%' }}> <label>CVC</label></div>
                  <div style={{ width: '50%', display: 'flex', alignSelf: 'center', justifyContent: 'center' }}>
                    <input
                      type='text'
                      size='3'
                      data-conekta='card[cvc]'
                      name='cvc'
                      value={data.card.cvc}
                      onChange={(event) => setData({ card: { ...data.card, cvc: event.target.value } })}
                      required={true}
                    />
                  </div>
                </div>

                {/*     <div className={['field', classes.row]} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                  <input type='hidden' id='payment_engine' value="conekta" name='payment_engine' />
                </div>
                <div className={['field', classes.row]} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                  <input type='hidden' id='payment_type' value="credit_card" name='payment_type' />
                </div>
                <div className={['field', classes.row]} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                  <input type='hidden' id='conekta_credit_card_token' name='conekta_credit_card_token' value={ccToken} />
                </div> */}

              </form>
              {/* <div className='ui two bottom attached buttons'>
            <button
              className='ui basic blue button'
              disabled={formAttempted == true}
              onClick={handleCcSubmit}
            >
              Pagar
          </button>
          </div> */}
              <div className={[classes.row]} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                <p style={{ color: 'red' }}>{serverResponse}</p>
              </div>
              <div className={[classes.row]} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                <Button color="primary"
                  style={{ color: 'black', backgroundColor: '#f8bb48', borderRadius: '5px', fontSize: ' bold', textAlign: ' center' }}

                  disabled={formAttempted === true}


                  onClick={(e) => handleCcSubmit(e)}>
                  Pagar
                                           </Button>
              </div>
            </div>
          </Grid>

        </div>
        <div className={classes.Auth} style={{
          backgroundColor: 'white', marginLeft: '0px', width: '100%',  /*  text-align: center, */
          boxShadow: ' 0 2px 3px #ccc', border: '1px solid #eee', padding: '10px', boxSizing: ' border-box',
          height: '750px', borderTopRightRadius: ' 5px', borderBottomRightRadius: '5px', paddingTop: '2%'
        }}>

          <Grid zeroMinWidth direction='row' container item xs={12} spacing={1} justify="center" alignItems="center" >
            <div className={classes.Auth} style={{ margin: '0px', height: 'max-content', width: '80%', display: 'table-cell', paddingTop: '2%' }}>

              <div className={[classes.row]} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                <h3 style={{ color: 'black', fontWeight: '900' }}>{'Interfaz de pago electrónico con tarjeta de crédito'}</h3>
              </div>
              {
                amountData.val.length < 5 &&
                <div className={['field', classes.row]} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                  <div style={{ width: '50%', display: 'flex', alignSelf: 'center', justifyContent: 'center' }}>
                    <Input
                      label={'Amount:'}
                      inputStyle={{ textAlign: 'center' }}
                      elementType='cardInput'
                      elementConfig={{ type: 'numeric', }}
                      /*   data-conekta='card[cvc]' */
                      name='amount'
                      value={amountData.val}
                      invalid={!amountData.valid}
                      shouldValidate={{ required: true, minLength: 1, isNumeric: true }}
                      touched={amountData.touched}
                      changed={(event) => {
                        if (event.target.value.length > 0 && (!Number(event.target.value))) return;

                        let isValid = checkValidity(event.target.value, { required: true, minLength: 1, isNumeric: true });
                        setAmountData({ val: event.target.value, valid: isValid, touched: true });

                      }}
                    />
                  </div>
                </div>
              }
              {
                !ccToken &&
                <form onSubmit={handleCcSubmit} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', fontFamily: 'Arial' }}>
                  <div className={['field', classes.row]} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: '50%', display: 'flex', alignSelf: 'center', justifyContent: 'center' }}>
                      <Input label={'Nombre del tarjetahabiente:'}
                        inputStyle={{ textAlign: 'center' }}
                        elementType='cardInput'
                        elementConfig={{ type: 'text', }}
                        data-conekta='card[name]'
                        name='n_card_holder_name'
                        value={data.card.name}
                        invalid={!cardDataValid.name}
                        shouldValidate={{ required: true, minLength: 2, maxLength: 50 }}
                        touched={cardInputTouched.name}
                        changed={(event) => {
                          if (event.target.value.length < 0 || event.target.value.length > 50) return;
                          setData({ card: { ...data.card, name: event.target.value } });
                          if (event.target.value.length > 0) setCardDataValid({ ...cardDataValid, name: checkValidity(event.target.value, { required: true, minLength: 2, maxLength: 50 }) });
                          else setCardDataValid({ ...cardDataValid, name: true });
                          setCardInputTouched({ ...cardInputTouched, name: true });
                        }}
                      />
                    </div>
                  </div>
                  <div className={['field', classes.row]} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: '50%', display: 'flex', alignSelf: 'center', justifyContent: 'center' }}>
                      <Input label={'Número de tarjeta de crédito:'}
                        inputStyle={{ textAlign: 'center' }}
                        elementType='cardInput'
                        elementConfig={{ type: 'numeric', }}
                        data-conekta='card[number]'
                        name='n_card_nb'
                        value={data.card.number}
                        invalid={!cardDataValid.number}
                        shouldValidate={{ required: true, minLength: 16, maxLength: 16 }}
                        touched={cardInputTouched.number}
                        changed={(event) => {
                          if (event.target.value.length > 0 && (event.target.value.length > 16 || !Number(event.target.value))) return;
                          setData({ card: { ...data.card, number: event.target.value } });
                          if (event.target.value.length > 0) setCardDataValid({ ...cardDataValid, number: checkValidity(event.target.value, { required: true, exactLength: 16, isNumeric: true }) });
                          else setCardDataValid({ ...cardDataValid, number: true });
                          setCardInputTouched({ ...cardInputTouched, number: true });
                        }}
                      />
                    </div>
                  </div>
                  <div className={['field', classes.row]} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: '50%', display: 'flex', alignSelf: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '50%', display: 'flex', alignSelf: 'center', justifyContent: 'center' }}>
                        <Input label={'Mes de Expiración:'}
                          inputStyle={{ textAlign: 'center', }}
                          elementType='cardInput'
                          elementConfig={{ type: 'numeric', }}
                          data-conekta='card[exp_month]'
                          name='n_expMonth'
                          value={data.card.exp_month}
                          invalid={!cardDataValid.exp_month}
                          shouldValidate={{ required: true, minLength: 1, maxLength: 2, isNumeric: true }}
                          touched={cardInputTouched.exp_month}
                          changed={(event) => {
                            if (event.target.value.length > 0 && (event.target.value.length > 2 || !Number(event.target.value))) return;
                            setData({ card: { ...data.card, exp_month: event.target.value } });
                            if (event.target.value.length > 0) setCardDataValid({ ...cardDataValid, exp_month: checkValidity(event.target.value, { required: true, minLength: 1, maxLength: 2, isNumeric: true }) });
                            else setCardDataValid({ ...cardDataValid, exp_month: true });
                            setCardInputTouched({ ...cardInputTouched, exp_month: true });
                          }}
                        />

                      </div>
                      <div style={{ width: '50%', display: 'flex', alignSelf: 'center', justifyContent: 'center' }}>
                        <Input label={'Año de Expiración:'}
                          inputStyle={{ textAlign: 'center', }}
                          elementType='cardInput'
                          elementConfig={{ type: 'numeric', }}
                          data-conekta='card[exp_year]'
                          name='n_expYear'
                          value={data.card.exp_year}
                          invalid={!cardDataValid.exp_year}
                          shouldValidate={{ required: true, minLength: 4, maxLength: 4, isNumeric: true }}
                          touched={cardInputTouched.exp_year}
                          changed={(event) => {

                            if (event.target.value.length > 0 && (event.target.value.length > 4 || !Number(event.target.value))) return;
                            setData({ card: { ...data.card, exp_year: event.target.value } });
                            if (event.target.value.length > 0) setCardDataValid({ ...cardDataValid, exp_year: checkValidity(event.target.value, { required: true, exactLength: 4, isNumeric: true }) });
                            else setCardDataValid({ ...cardDataValid, exp_year: true });
                            setCardInputTouched({ ...cardInputTouched, exp_year: true });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={['field', classes.row]} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: '50%', display: 'flex', alignSelf: 'center', justifyContent: 'center' }}>
                      <Input label={'CVC:'}
                        inputStyle={{ textAlign: 'center' }}
                        elementType='cardInput'
                        elementConfig={{ type: 'numeric', }}
                        data-conekta='card[cvc]'
                        name='n_cvc'
                        value={data.card.cvc}
                        invalid={!cardDataValid.cvc}
                        shouldValidate={{ required: true, exactLength: 3, isNumeric: true }}
                        touched={cardInputTouched.cvc}
                        changed={(event) => {
                          if (event.target.value.length > 0 && (event.target.value.length > 3 || !Number(event.target.value))) return;
                          setData({ card: { ...data.card, cvc: event.target.value } });
                          if (event.target.value.length > 0) setCardDataValid({ ...cardDataValid, cvc: checkValidity(event.target.value, { required: true, exactLength: 3, isNumeric: true }) });
                          else setCardDataValid({ ...cardDataValid, cvc: true });
                          setCardInputTouched({ ...cardInputTouched, cvc: true });
                        }}
                      />
                    </div>
                  </div>

                  <div className={['field', classes.row]} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                    <input type='hidden' id='payment_engine' value="conekta" name='payment_engine' />
                  </div>
                  <div className={['field', classes.row]} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                    <input type='hidden' id='payment_type' value="credit_card" name='payment_type' />
                  </div>
                  <div className={['field', classes.row]} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                    <input type='hidden' id='conekta_credit_card_token' name='conekta_credit_card_token' value={ccToken} />
                  </div>

                </form>
              }
              {
                /* <div className='ui two bottom attached buttons'>
              <button
                className='ui basic blue button'
                disabled={formAttempted == true}
                onClick={handleCcSubmit}
              >
                Pagar
            </button>
            </div> */
              }

              <div className={[classes.row]} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                <p style={{ color: 'red' }}>{serverResponse}</p>
              </div>
              <div className={[classes.row]} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row', paddingTop: '2%' }}>
                <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', paddingTop: '2%' }}>
                  {
                    amountData.val.length > 0 && <div className={['field', classes.row]} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                      <p style={{ color: 'green' }}>{'Amount:  '}</p>
                      <p style={{ color: 'green', fontWeight: '900' }}>{amountData.val}</p>
                      <div onClick={() => { setAmountData({ ...amountData, val: '', touched: false }); }}
                        style={{ display: 'flex', justifyContent: 'center', textAlign: ' center', textAlignVertical: 'center' }}
                      >
                        <p style={{ color: 'red', paddingLeft: '30px', paddingRight: '-1px' }}>{'X'}</p></div>
                    </div>
                  }
                  <Button color="primary"
                    style={{ color: 'black', backgroundColor: '#f8bb48', borderRadius: '5px', fontSize: ' bold', textAlign: ' center', textAlignVertical: 'center' }}

                    /*  disabled={formAttempted == true} */
                    onClick={handleCcSubmit}

                  >
                    {!ccToken ? 'Solicitar pago' : 'Pagar'}
                  </Button>

                </div>

              </div>
            </div>
          </Grid>
        </div>
      </div>
      {formAttempted === true && <LoadingAnimation />}
      <PaymentSuccess
        hidden={formState !== 'success'}
      />
      <PaymentError
        hidden={formState !== 'error'}
      />
    </div >
  );

}
export default Payment;