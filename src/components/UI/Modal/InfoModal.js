import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import classes from './Modal.css';
//import Uxi from '../../../hoc/Uxi/Uxi';
import BackdropEffected from '../Backdrop/BackdropEffected';
import { BrowserView, MobileView, /* isBrowser, isMobile */ } from "react-device-detect";
const InfoModal = props => {

    const [opacity, setOpacity] = useState(0);
    const [checkTime, setCheckTime] = useState();
    const [attachedClasses, setAttachedClasses] = useState([classes.InfoModal, classes.Close]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (props.show) setAttachedClasses([classes.InfoModal, classes.Open])
        else setAttachedClasses([classes.SideDrawer, classes.Close]);
        let interval;
        if (opacity <= 1) { interval = setInterval(() => { if (opacity === 1) { clearInterval(interval); return } else { setCheckTime(Date.now()); } }, 50); }
        return () => {

            /*  if (!props.show) setAttachedClasses([classes.InfoModal, classes.Close])
             else setAttachedClasses([classes.SideDrawer, classes.Open]); */

            setMounted(false);
            clearInterval(interval);
        }
    }, [props, props.show, mounted, opacity]);


    useEffect(() => {
        /* if (opacity < 1 && props.show) */
        setOpacity(o => (o < 1) ? o + 0.1 : o > 0 ? o - 0.1 : o)
        //  if (opacity > 0 && !props.show && mounted) setOpacity(o=>o - 0.1);

    }, [checkTime]);

    const inEffect = ` @keyframes react-fade-in {       0%   { opacity: 0; }       50%  { opacity: 0.5; }       100% { opacity: 1; }     }   `;

    const outEffect = ` @keyframes react-fade-out {       0%   { opacity: 1; }       50%  { opacity: 0.5; }       100% { opacity: 0; }     }   `;

    return (

        <div key="modal">
            <BrowserView>
                <style children={!props.show ? outEffect : inEffect} />
                <BackdropEffected show={props.show} clicked={props.modalClosed} />
                <Grid container spacing={4} justify="center" alignItems="center">
                    {/*     <div style={{ flex: 1 }}> */}

                    <div
                        className={attachedClasses.join(' ')}
                        style={{
                            /*   /*  transitionTimingFunction: props.show ? 'ease-in' : 'ease-out', */
                            transition: '2s',
                            //   transform: 'all 2s ease',// props.show ? 'translateY(0)':'translateY(-100vh)',
                            //   opacity: opacity,/*  props.show ? '1' : '0', */

                            animationDuration: '0.7s',
                            animationIterationCount: 1,
                            animationName: `react-fade-${(props.show ? 'in' : 'out')}`,
                            animationTimingFunction: props.show ? 'ease-in' : 'ease-out',

                            overflow: 'auto',
                            width: '40%',marginLeft: '20%'

                        }}
                    >

                        {props.children}


                    </div>
                    {/* </div> */}
                </Grid>
            </BrowserView>
            <MobileView>
                <style children={!props.show ? outEffect : inEffect} />
                <BackdropEffected show={props.show} clicked={props.modalClosed} />
                <Grid container spacing={4} justify="center" alignItems="center">
                    {/*     <div style={{ flex: 1 }}> */}

                    <div
                        className={attachedClasses.join(' ')}
                        style={{
                            /*   /*  transitionTimingFunction: props.show ? 'ease-in' : 'ease-out', */
                            transition: '2s',
                            //   transform: 'all 2s ease',// props.show ? 'translateY(0)':'translateY(-100vh)',
                            //   opacity: opacity,/*  props.show ? '1' : '0', */

                            animationDuration: '0.7s',
                            animationIterationCount: 1,
                            animationName: `react-fade-${(props.show ? 'in' : 'out')}`,
                            animationTimingFunction: props.show ? 'ease-in' : 'ease-out',

                            overflow: 'scroll', overflowY: 'scroll',

                        }}
                    >

                        {props.children}


                    </div>
                    {/* </div> */}
                </Grid>
            </MobileView>


        </div >

    );
};

export default React.memo(
    InfoModal,
    (prevProps, nextProps) =>
        nextProps.show === prevProps.show &&
        nextProps.children === prevProps.children
);
