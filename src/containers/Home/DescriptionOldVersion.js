import React from 'react';
import {/*  Button,  */Grid/* , List, Avatar, ListItemAvatar, ListItemText, ListItemSecondaryAction, ListItem  */ } from '@material-ui/core';
import classes from './Description.css';
import diagram from '../../assets/images/alcanceSchema.jpeg'
import { isMobile, BrowserView, MobileView } from "react-device-detect";
import Uxi from '../../hoc/Uxi/Uxi';

const Description = (props) => {

    const styles = {
        style1: {
            fontFamily: 'AvenirBlack', fontWeight: '900', color: '#4b443a', fontSize: '18.6px', paddingTop: '20px', paddingBottom: '15px'
        },
        style2: {
            fontFamily: 'AvenirBook', fontWeight: '700', alignItems: 'center', color: '#5e5a4f', fontSize: '13px', paddingLeft: '25px', paddingRight: '24px', lineHeight: '25px'
        },
        style3: {
            fontFamily: 'AvenirBlack', fontWeight: '900', color: '#4b443a', fontSize: '18.6px', paddingTop: '35px', paddingBottom: '8px'
        },
        style4: {
            fontFamily: 'AvenirBook', fontWeight: '700', display: 'block', justifyContent: 'center', alignItems: 'center', color: '#5e5a4f', fontSize: '13px'
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
                <Grid container spacing={4} justify="center" alignItems="center" direction="row">
                    <div className={classes.Description} style={{ paddingTop: '8%' }}>
                        <p style={styles.style1}>¿Cómo funciona Paquete Alcance?</p>
                        <Grid zeroMinWidth direction='column' container item xs={12} spacing={1} justify="center" alignItems="center" >
                            {/*   <div className={classes.Diagram}> */}
                            <div style={{ direction: 'flex' }}>
                                <img src={diagram} alt="diagram" style={{ width: isMobile ? '100%' : '80%', height: '100%', resizeMode: 'contain' }} />
                            </div>
                            {/*   </div> */}
                        </Grid>
                        <p style={styles.style1}>¿Qué es Paquete Alcance?</p>
                        <Grid zeroMinWidth direction='row' container item xs={12} spacing={1} justify="center" alignItems="center" >
                            <Grid zeroMinWidth direction='column' container item xs={12} md={6} spacing={1} justify="center" alignItems="center" >
                                <div style={{ display: 'flex', flexWrap: 'wrap', paddingLeft: '15px', paddingRight: '15px' }} >
                                    <p style={styles.style2/* { fontFamily: 'Arial', fontWeight: '400', paddingLeft: '15px', paddingRight: '15px' } */}>PAQUETE ALCANCE es una empresa de capital mexicano, que surgió al encontrar un nicho de mercado en las remesas, contra grandes empresas que solo buscan extraer la mayor cantidad de recursos de los migrantes, cobrando altas comisiones y usando un tipo de cambio no competitivo.</p>
                                </div>
                            </Grid >
                            <Grid zeroMinWidth direction='column' container item xs={12} md={6} spacing={1} justify="center" alignItems="center" >
                                <div style={{ display: 'flex', flexWrap: 'wrap', paddingLeft: '15px', paddingRight: '15px' }} >
                                    <p style={styles.style2/* { fontFamily: 'Arial', fontWeight: '400', paddingLeft: '15px', paddingRight: '15px' } */}>PAQUETE ALCANCE permite enviar remesas a Venezuela, con un tipo de cambio competitivo y con bajas comisiones, además de permitir el cambio directo por bienes y servicios.</p>
                                </div>
                            </Grid >
                        </Grid >
                        <p style={styles.style3/* { fontFamily: 'Arial', fontWeight: '900' } */}>Contacto</p>
                        <Grid zeroMinWidth direction='row' container item xs={12} spacing={1} justify="center" alignItems="center" >
                            <Grid zeroMinWidth direction='column' container item xs={12} md={6} spacing={1} justify="center" alignItems="center" >
                                <div /* style={{ paddingRight: '20px', display: 'flex', flexWrap: 'wrap' }}  */>
                                    <p style={styles.style4}><span style={{ fontFamily: 'AvenirBlack', fontWeight: '900' }}>Teléfono:</span> +525572084348</p>
                                </div>
                            </Grid >
                            <Grid zeroMinWidth direction='column' container item xs={12} md={6} spacing={1} justify="center" alignItems="center" >
                                <div /*  style={{ paddingLeft: '20px', display: 'flex', flexWrap: 'wrap' }}  */>
                                    <p style={styles.style4}><span style={{ fontFamily: 'AvenirBlack', fontWeight: '900' }}>Email:</span> contacto@paquetealcance.com</p>

                                </div>
                            </Grid >
                        </Grid >
                        <div style={{ paddingTop: '20px' }}>
                            <p style={styles.style4}>Copyright © Paquete Alcance 2019</p>
                        </div>
                    </div>
                </Grid>
            </MobileView>
        </Uxi>
    );
};
export default Description;