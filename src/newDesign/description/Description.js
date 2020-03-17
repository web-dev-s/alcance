import React from 'react';
import {/*  Button,  */Grid/* , List, Avatar, ListItemAvatar, ListItemText, ListItemSecondaryAction, ListItem  */ } from '@material-ui/core';
import classes from './Description.css';
import diagram from '../../assets/images/alcanceSchema.jpeg'
import { isMobile, BrowserView, MobileView } from "react-device-detect";
import Uxi from '../../hoc/Uxi/Uxi';
import { color } from '../../shared/utility';
const Description = (props) => {

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
    return (
        <Uxi>
            <BrowserView>
                <Grid container spacing={4} justify="center" alignItems="center" direction="row">
                    <div className={classes.Description} style={{ paddingTop: '8%' }}>
                        <p style={styles.style5/* { fontFamily: 'Arial', fontWeight: '900' } */}>¿Cómo funciona Paquete Alcance?</p>
                        <Grid zeroMinWidth direction='column' container item xs={12} spacing={2} justify="center" alignItems="center" >
                            {/*   <div className={classes.Diagram}> */}
                            <div style={{ direction: 'flex' }}>
                                <img src={diagram} alt="diagram" style={{ width: isMobile ? '100%' : '80%', height: '100%', resizeMode: 'contain' }} />
                            </div>
                            {/*   </div> */}
                        </Grid>
                        <p style={styles.style5/* { fontFamily: 'AileronItalic', fontWeight: '900' } */}>¿Qué es Paquete Alcance?</p>
                        <Grid zeroMinWidth direction='row' container item xs={12} spacing={1} justify="center" alignItems="center" >
                            {/*  <Grid zeroMinWidth direction='column' container item xs={5} md={3} spacing={1}  alignItems="center" > */}
                            <div style={{ display: 'inherit', width: '60%' }} >
                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'wrap' }} >
                                    <p style={styles.style8}>PAQUETE ALCANCE es una empresa de capital mexicano, que surgió al encontrar un nicho de mercado en las remesas, contra grandes empresas que solo buscan extraer la mayor cantidad de recursos de los migrantes, cobrando altas comisiones y usando un tipo de cambio no competitivo.</p>
                                </div>
                                {/* </Grid > */}
                                {/*  <Grid zeroMinWidth direction='column' container item xs={5} md={3} spacing={1}> */}
                                <div style={{ display: 'flex', flex: 1, alignSelf: 'flex-start', flexDirection: 'row', flexWrap: 'wrap' }} >
                                    <p style={styles.style9/* { fontFamily: 'Arial', fontWeight: '400', paddingLeft: '15px', paddingRight: '15px' } */}>PAQUETE ALCANCE permite enviar remesas a Venezuela, con un tipo de cambio competitivo y con bajas comisiones, además de permitir el cambio directo por bienes y servicios.</p>
                                </div>
                            </div>
                            {/* </Grid > */}
                        </Grid >
                        <p style={styles.style5/* { fontFamily: 'Arial', fontWeight: '900' } */}>Contacto</p>
                        <Grid zeroMinWidth direction='row' container item xs={12} spacing={1} justify="center" alignItems="center" >
                            <Grid zeroMinWidth direction='column' container item xs={12} md={3} spacing={1} justify="center" alignItems="center" >
                                <div style={{ paddingRight: '20px', display: 'flex', flexWrap: 'wrap' }} >
                                    <p style={styles.style6}><b>Teléfono:</b>  +525572084348</p>
                                </div>
                            </Grid >
                            <Grid zeroMinWidth direction='column' container item xs={12} md={3} spacing={1} justify="center" alignItems="center" >
                                <div style={{ paddingLeft: '20px', display: 'flex', flexWrap: 'wrap' }} >
                                    <p style={styles.style6}><b>Email:</b> contacto@paquetealcance.com</p>

                                </div>
                            </Grid >
                        </Grid >
                        <p style={styles.style7}>Copyright © Paquete Alcance 2019</p>

                    </div >

                </Grid >
            </BrowserView>
            <MobileView>
                <div className={classes.Description} style={{ paddingTop: '8%', marginBottom: '8%' }}>


                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '20%', marginLeft: '20px' }}>
                            <img src={require("../../assets/images/question.png")} alt="logo" style={{ width: '25px', height: '30px', resizeMode: 'contain', }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '80%', }}>
                            <text style={styles.style1}>¿CÓMO FUNCIONA PAQUETE ALCANCE? </text>
                        </div>
                    </div>


                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '80%', }}>
                            <img src={diagram} alt="diagram" style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', }}>
                        <p style={styles.style1}>¿QUÉ ES PAQUETE ALCANCE?</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '90%', }} >
                            <p style={styles.style2}>PAQUETE ALCANCE es una empresa de capital mexicano, que surgió al encontrar un nicho de mercado en las remesas, contra grandes empresas que solo buscan extraer la mayor cantidad de recursos de los migrantes, cobrando altas comisiones y usando un tipo de cambio no competitivo.</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '90%', }} >
                            <p style={styles.style2}>PAQUETE ALCANCE permite enviar remesas a Venezuela, con un tipo de cambio competitivo y con bajas comisiones, además de permitir el cambio directo por bienes y servicios.</p>
                        </div>
                    </div>


                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign: 'left' }}>
                        <p style={styles.style1}>PREGUNTAS FRECUENTES</p>
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

                            <text style={{ ...styles.style2, lineHeight: '20px', marginTop: 0, fontWeight: '500', alignSelf: 'flex-start' }}>
                                <text style={{ ...styles.style2, marginBottom: 0, fontWeight: '800', alignSelf: 'flex-start', color: color.alcanceOrange }}>{'Nota:'}</text>
                                {' no nos hacemos responsable por el mal uso que pueda hacerse con la aplicación en caso de que no se reporte.'}</text>
                        </div>
                    </div>



                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', marginLeft: '20px', marginBottom: '8%' }} >
                        <p style={{ ...styles.style3, alignSelf: 'flex-start' }}>Contacto</p>
                        <text style={{ ...styles.style4, alignSelf: 'flex-start', }}>
                            <text style={{ fontFamily: 'AvenirBlack', fontWeight: '900', }}>{'Email:  '}</text>
                            {'contacto@paquetealcance.com'}</text>
                    </div>
                </div>

            </MobileView>
        </Uxi >
    );
};
export default Description;