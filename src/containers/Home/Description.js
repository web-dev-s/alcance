import React from 'react';
import {/*  Button,  */Grid/* , List, Avatar, ListItemAvatar, ListItemText, ListItemSecondaryAction, ListItem  */ } from '@material-ui/core';
import classes from './Description.css';
import diagram from '../../assets/images/alcanceSchema.jpeg'
import questionMark from '../../assets/images/questionMark.png'
import { isMobile, BrowserView, MobileView } from "react-device-detect";
import Uxi from '../../hoc/Uxi/Uxi';


const QA = [
    {
        question: "1.¿Hay un límite de dinero que pueda enviar en un día?",
        answer: "Por seguridad, el monto máximo se puede enviar son US$500 o su equivalente por día."
    },
    {
        question: "2.¿Puedo enviar dólares de Estados Unidos?",
        answer: "Puedes acreditar saldo en USD, pero el uso es en la moneda local."
    },
    {
        question: "3.¿Puedo usar mi saldo para hacer compras en tiendas en línea?",
        answer: "Por el momento no es posible."
    },
    {
        question: "4.	Si tengo un problema, ¿a quién contacto?",
        answer: ["Mándanos un mensaje a ", "solucion@paquetealcance.ve"],
    },
    {
        question: "5.	¿En qué comercios puedo usar mi saldo?",
        answer: "En este momento, todas las tiendas Salvafoods aceptan Paquetealcance, pronto informaremos de nuevas opciones (bodegones, farmacias, restaurantes)"
    },
    {
        question: "6.	¿Puedo retirar en efectivo?",
        answer: "No, en este momento no es posible, te informaremos cuando se pueda hacer"
    },
    {
        question: "7.	¿Es posible enviar dinero hacia otros países?",
        answer: "Estamos trabajando para hacer la red más amplia, por el momento, solamente ofrecemos el servicio hacia Venezuela desde México, USA y Canadá"
    },
    {
        question: "8. ¿Expira mi saldo?",
        answer: "No, pero tienes un año calendario para usarlo, en caso contrario se cobrará una comisión equivalente a US$4.50"
    },
    {
        question: "9.	¿Me afecta el cambio de mi celular?",
        answer: "Ntrario se cobrará una comisión equivalo, pero tienes un año calendario para usarlo, en caso conente a US$4.50"
    }
];

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
                <div className="mlf-auto c-sec" style={{ width: "85%" }}>
                    <div className="row algn-i-c mb-5p mt-5p ta-c" style={{ padding: "20px 10px" }}>
                        <img src={questionMark} alt="question-mark" style={{ margin: "0 20px" }}></img>
                        <span className="uppercase">¿Cómo funciona Paquete Alcance? </span>
                    </div>

                    <img style={{ width: "100%" }} src={diagram} alt="diagram" />
                    <div className="fs-sm" style={{ textAlign: "justify", padding: "10px 0" }}>

                        <h3 className="mb-5p mt-5p uppercase fs-xm">QUé ES PAQUETE ALCANCE?</h3>
                        <p>
                            <span className="uppercase">PAQUETE ALCANCE </span>
                        es una empresa de capital
                        mexicano, que surgió al encontrar un nicho de
                        mercado en las remesas, contra grandes
                        empresas que solo buscan extraer la mayor
                        cantidad de recursos de los migrantes,
                        cobrando altas comisiones y usando un tipo de cambio no competitivo
                        </p>
                        <br />

                        <p>
                            <span className="uppercase">PAQUETE ALCANCE </span>
                        permite enviar remesas a
                        Venezuela, con un tipo de cambio competitivo
                        y con bajas comisiones, además de permitir el
                        cambio directo por bienes y servicios.
                        </p>

                        <h3 className="mb-5p mt-5p uppercase fs-xm">Preguntas frecuentes</h3>

                        {QA.map(qa => (<div key={qa.question} className={classes.QA}>
                            <h5 className="fs-sm" style={{ margin: "5px 0" }}>{qa.question}</h5>
                            {typeof qa.answer === "string"
                                ? <p className="fs-xsm"> {qa.answer}</p>
                                : qa.answer.map(answer => <p key={answer} className="fs-xsm">{answer}</p>)
                            }

                        </div>)
                        )}

                        <p className="fs-xsm">
                            <span className="c-prm"> Nota: </span>
                        no nos hacemos responsable por el mal uso que pueda hacerse con la aplicación en caso de que no se reporte.</p>

                        <h4 className="mb-5p mt-5p uppercase fs-xm">CONTACTO</h4>

                        <p>
                            <span className="fs-xm">EMAIL: </span>
                            <a href="mailto: contacto@paquetealcance.com">contacto@paquetealcance.com</a>
                        </p>

                    </div>



                </div>



            </MobileView >
        </Uxi >
    );
};
export default Description;