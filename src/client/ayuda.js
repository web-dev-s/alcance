import React, { useEffect, useState } from 'react';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import axios from '../axios-orders';
import * as a from '../store/actions/actionTypes';
import * as actions from '../store/actions/index';
import * as _ from 'lodash'; 
import { updateObject, checkValidity, color } from '../shared/utility'; 
/* import Spinner from '../../components/UI/Spinner/Spinner'; */ 
import classes from './client.css';  
import { BrowserView, MobileView, /* isBrowser, isMobile */ } from "react-device-detect";

const Client_Ayuda = props => { 
    const { userType, userId } = props;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //  useEffect(() => { props.onClientDetails(props.userId.toString()).then(res => { if (res.status === '501') { setBalance(0); } if (res.status === '200') { setBalance(res.data.result[0].Balance); }; }); props.onClientTList(props.userId).then(res => { if (res.status === '501') { setTransList([]); } if (res.status === '200') { const list = _.orderBy(res.data.result, 'Date', 'desc'); setTransList([...list]); } }); const interval = setInterval(() => { setCheckTime(Date.now()) }, 5000); return () => { clearInterval(interval) } }, []);
     
    const styles = {
        style1: {
            fontFamily: 'AvenirBlack', fontWeight: '900', color: '#4b443a', fontSize: '18.6px', paddingTop: '20px', paddingBottom: '15px', textAlign: 'left'
        },
        style2: {
            fontFamily: 'AvenirBook', fontWeight: '700', alignItems: 'center', color: '#5e5a4f', fontSize: '13px',/*  paddingLeft: '25px', paddingRight: '24px',  */lineHeight: '25px', textAlign: 'justify'
        },
        style3: {
            fontFamily: 'AvenirBlack', fontWeight: '900', color: '#4b443a', fontSize: '22px', paddingTop: '35px', paddingBottom: '8px', textAlign: 'left',
        },
        style4: {
            fontFamily: 'AvenirBook', fontWeight: '700', display: 'block', justifyContent: 'center', alignItems: 'center', color: '#5e5a4f', fontSize: '16px'
        },
        style5: {
            fontFamily: 'AvenirRoman', color: '#4b443a', fontSize: '24px', paddingTop: '20px', paddingBottom: '15px', fontWeight: '800'
        },
        style6: {
            fontFamily: 'AvenirBook', lineHeight: '25px', display: 'block', justifyContent: 'center', alignItems: 'center', color: '#5e5a4f', fontSize: '16px', marginLeft: '20px'
        },
        style7: {
            fontFamily: 'AvenirBook', lineHeight: '25px', display: 'block', justifyContent: 'center', alignItems: 'center', color: '#5e5a4f', fontSize: '16px', marginLeft: '20px', marginTop: '30px', marginBottom: '50px'
        },
        style8: {
            fontFamily: 'AvenirBook', lineHeight: '25px', display: 'block', color: '#5e5a4f', fontSize: '16px', marginLeft: '30px', paddingLeft: '20px'
        },
        style9: {
            fontFamily: 'AvenirBook', lineHeight: '25px', display: 'block', color: '#5e5a4f', fontSize: '16px', marginLeft: '30px', paddingLeft: '20px', paddingRight: '50px'
        }
    };

    return (<div   style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: '10px', marginRight: '10px', marginTop: '48px', marginBottom: '50px' }}>

        <MobileView>
            
            <div className={classes.container} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '10px', marginRight: '10px', marginTop: '2%' }}>

                < div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch', }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', width: '100%', textAlign: 'left' }}>
                        <div style={{ marginBottom: '25px', borderLeft: `5px solid ${color.alcanceOrange}` }}>
                            <label style={{ fontSize: '1.4rem', color: color.alcanceOrange, marginLeft: '10px' }}>{'Ayuda'}</label>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '90%', }} >
                            <p style={{ ...styles.style2, marginBottom: 0, fontWeight: '800', alignSelf: 'flex-start' }}
                            >{'1. ¿Hay un límite de dinero que pueda enviar en un día?'}</p>
                            <p style={{ ...styles.style2, lineHeight: '20px', marginTop: 0, fontWeight: '500', alignSelf: 'flex-start' }}
                            >{'Por seguridad, el monto máximo se puede enviar son US$500 o su equivalente por día.'}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '90%', }} >
                            <p style={{ ...styles.style2, marginBottom: 0, fontWeight: '800', alignSelf: 'flex-start' }}
                            >{'2. ¿Puedo enviar dólares de Estados Unidos?'}</p>
                            <p style={{ ...styles.style2, lineHeight: '20px', marginTop: 0, fontWeight: '500', alignSelf: 'flex-start' }}
                            >{'Puedes acreditar saldo en USD, pero el uso es en la moneda local.'}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '90%', }} >
                            <p style={{ ...styles.style2, marginBottom: 0, fontWeight: '800', alignSelf: 'flex-start' }}
                            >{'3. ¿Puedo usar mi saldo para hacer compras en tiendas en línea?'}</p>
                            <p style={{ ...styles.style2, lineHeight: '20px', marginTop: 0, fontWeight: '500', alignSelf: 'flex-start' }}
                            >{'Por el momento no es posible.'}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '90%', }} >
                            <p style={{ ...styles.style2, marginBottom: 0, fontWeight: '800', alignSelf: 'flex-start' }}
                            >{'4. Si tengo un problema, ¿a quién contacto?'}</p>
                            <p style={{ ...styles.style2, lineHeight: '20px', marginTop: 0, fontWeight: '500', alignSelf: 'flex-start', }}
                            >{'Mándanos un mensaje a solucion@paquetealcance.ve'}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '90%', }} >
                            <p style={{ ...styles.style2, marginBottom: 0, fontWeight: '800', alignSelf: 'flex-start' }}
                            >{'5. ¿En qué comercios puedo usar mi saldo?'}</p>
                            <p style={{ ...styles.style2, lineHeight: '20px', marginTop: 0, fontWeight: '500', alignSelf: 'flex-start' }}
                            >{'En este momento, todas las tiendas Salvafoods aceptan Paquetealcance, pronto informaremos de nuevas opciones (bodegones, farmacias, restaurantes)'}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '90%', }} >
                            <p style={{ ...styles.style2, marginBottom: 0, fontWeight: '800', alignSelf: 'flex-start' }}
                            >{'6. ¿Puedo retirar en efectivo?'}</p>
                            <p style={{ ...styles.style2, lineHeight: '20px', marginTop: 0, fontWeight: '500', alignSelf: 'flex-start' }}
                            >{'No, en este momento no es posible, te informaremos cuando se pueda hacer'}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '90%', }} >
                            <p style={{ ...styles.style2, marginBottom: 0, fontWeight: '800', alignSelf: 'flex-start' }}
                            >{'7. ¿Es posible enviar dinero hacia otros países?'}</p>
                            <p style={{ ...styles.style2, lineHeight: '20px', marginTop: 0, fontWeight: '500', alignSelf: 'flex-start' }}
                            >{'Estamos trabajando para hacer la red más amplia, por el momento, solamente ofrecemos el servicio hacia Venezuela desde México, USA y Canadá'}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '90%', }} >
                            <p style={{ ...styles.style2, marginBottom: 0, fontWeight: '800', alignSelf: 'flex-start' }}
                            >{'8. ¿Expira mi saldo?'}</p>
                            <p style={{ ...styles.style2, lineHeight: '20px', marginTop: 0, fontWeight: '500', alignSelf: 'flex-start' }}
                            >{'No, pero tienes un año calendario para usarlo, en caso contrario se cobrará una comisión equivalente a US$4.50'}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '90%', }} >
                            <p style={{ ...styles.style2, marginBottom: 0, fontWeight: '800', alignSelf: 'flex-start' }}
                            >{'9. ¿Me afecta el cambio de mi celular?'}</p>
                            <p style={{ ...styles.style2, lineHeight: '20px', marginTop: 0, fontWeight: '500', alignSelf: 'flex-start' }}
                            >{'No, si pierdes tu equipo, descarga la aplicación en tu nuevo equipo y tu saldo se verá reflejado en el nuevo.'}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '90%', }} >

                            <label style={{ ...styles.style2, lineHeight: '20px', marginTop: 0, fontWeight: '500', alignSelf: 'flex-start' }}>
                                <label style={{ ...styles.style2, marginBottom: 0, fontWeight: '800', alignSelf: 'flex-start', color: color.alcanceOrange }}>{'Nota:'}</label>
                                {' no nos hacemos responsable por el mal uso que pueda hacerse con la aplicación en caso de que no se reporte.'}</label>
                        </div>
                    </div> 
                </div>

            </div>
         {/*    <FooterComponent
                mainContainerStyle={{ bottom: '0px' }}
                onBackClick={() => props.history.push('/client')} /> */}
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),

       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Client_Ayuda, axios));
