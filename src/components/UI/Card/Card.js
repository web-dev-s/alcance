import React/* , { useRef, useState, useEffect } */ from "react";
/* import classes from './card.css'; */
import { /* Button,  */Grid } from '@material-ui/core';
import { BrowserView, MobileView, /* isBrowser, isMobile */ } from "react-device-detect";
//import styled/* , { createGlobalStyle } */ from "styled-components";


const card = (props) => {

    /* const WrapperBackground = styled.img`
        display: flex;
        justify-content: flex-end;
        position: absolute;
        bottom: 0px;
        right: 0px;
       /*  height: 106.8px; 
       /*  width: 106.08px; 
        max-height: 60%;
        min-height: 40%;
       resize:contain;
` */
    ;
    return (
        <div style={{ lex: 1 }}>
            <BrowserView>
                <Grid container spacing={0} direction={'column'} justify="flex-start" alignItems="flex-start">
                    <Grid container zeroMinWidth item spacing={1}   /*  xs={10} sm={8} md={6} lg={6} xl={3} */>
                        <Grid container zeroMinWidth item xs={12} spacing={1}>
                            <div style={{ justifyContent: 'center', alignItems: 'flex-start', minWidth: props.minWidth ? props.minWidth : '300px' }}>
                                <h3 style={{ paddingLeft: '13px', lineHeight: '15px', margin: 0, marginTop: '40px' }}>{props.title}</h3>
                                <div style={{ marginTop: '5px', marginLeft: '13px', lineHeight: '1px', height: '2px', border: '1px solid #f9ba45df', backgroundColor: '#f9ba45df', borderRadius: '2px', width: '20px' }} />
                                {/*  <p style={{ marginLeft: '13px', lineHeight: '5px', top: '0px', borderTop: '5px solid #f9ba45df', width: '30px' }} /> */}
                            </div>
                        </Grid>
                        <Grid container item zeroMinWidth spacing={1} justify="center" alignItems="center">
                            <div style={{
                                marginTop: '5px',
                                boxSizing: 'border-box', boxShadow: '0 2px 3px #ccc',
                                border: '1px solid lightgray', borderRadius: '8px',
                                display: 'block', padding: '5px',
                                overflowY: 'auto',
                                justifyContent: 'center', textAlign: 'center',
                                minHeight: '60%',
                                maxHeight: '800px',
                                minWidth: props.minWidth ? props.minWidth : ('60%' || '300px'),
                                maxWidth: '90%',
                                paddingBottom: '5px'
                            }}>
                                <Grid zeroMinWidth container item spacing={1} justify="center" alignItems="center">
                                    <div style={{ display: 'flex', position: 'relative', padding: '10px', width: '100%', justifyContent: 'center' }}>
                                        <img src={props.backgroundimage} alt={'bknd'} style={{
                                            display: 'flex', justifyContent: 'flex-end', position: 'absolute', bottom: 0, right: 0,
                                            maxHeight: '60%', minHeight: '5%',
                                            maxWidth: '30%',
                                            resize: 'contain', zIndex: '-2', ...props.style
                                        }} />

                                        {props.children}
                                    </div>
                                </Grid>
                                {/* <div style={{
                                            backgroundImage: `url(${props.backgroundimage})`,
                                            display: 'flex', justifyContent: 'flex-end', alignSelf: 'flex-end',/*  position: 'absolute', bottom: 0, right: 0, 
                                    maxHeight: '60%', minHeight: '10%', minWidth: '30px', minHeight: '20px',
                                maxWidth: '30%',
                                resize: 'contain', zIndex: '99999', ...props.style
                                        }}></div> */}
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </BrowserView>
            <MobileView>
                <div style={{ padding: '1%', }}>
                    {/* <Grid container item spacing={0} direction={'column'} justify="center" alignItems="center">
                 */}
                    <Grid container zeroMinWidth item direction={'row'} xs={12} spacing={1}   /*  xs={10} sm={8} md={6} lg={6} xl={3} */>
                        <Grid container zeroMinWidth item xs={12} spacing={0} justify="flex-start" alignItems="center">
                            <div style={{ justifyContent: 'flex-start', alignItems: 'center', minWidth: props.minWidth ? props.minWidth : '300px', margin: '2%' }}>
                                <h3 style={{ paddingLeft: '13px', /* lineHeight: '15px', */ marginBottom: 0 }}>{props.title}</h3>
                                <p style={{ marginLeft: '13px', marginTop: 0, lineHeight: '1.5', top: '0px', borderTop: '5px solid #f9ba45df', width: '30px', }} />
                            </div>
                        </Grid>
                        <Grid container item zeroMinWidth spacing={1} justify="center" alignItems="center">
                            <div style={{
                                boxSizing: 'border-box', boxShadow: '0 2px 8px #ccc',
                                border: '1px solid lightgray', borderRadius: '8px',
                                display: 'block', overflowY: 'auto', padding: '5px',
                                maxHeight: '800px',
                                minWidth: props.minWidth ? props.minWidth : ('60%' || '300px'),
                                justifyContent: 'center', textAlign: 'center',
                                minHeight: '60%',

                                maxWidth: '99%',
                                paddingBottom: '5px',
                                width: '90%',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <Grid zeroMinWidth container item spacing={1} xs={12} justify="center" alignItems="center">
                                    <div style={{ display: 'flex', padding: '1%', width: '100%', justifyContent: 'center', textAlign: 'center', }}>
                                        <div style={{ overflow: 'hidden', flex: 1 }}>

                                            <img src={props.backgroundimage} alt={'bkgd'} style={{
                                                display: 'flex', justifyContent: 'flex-end', position: 'absolute', bottom: 0, right: 0,
                                                maxHeight: '60%', minHeight: '10%',
                                                maxWidth: '30%',
                                                resize: 'contain', zIndex: -2, ...props.style
                                            }} />
                                            {/*      <img src={props.backgroundimage} style={{resize:'contain', display:'flex', justifyContent:'flex-end',position:'absolute', bottom:'0px', right:'0px', height:'70%' }}/> */}
                                            {props.children}
                                        </div>
                                    </div>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                    {/*  </Grid> */}
                </div>

            </MobileView>
        </div >

    )
};

export default card;