import React, { useEffect, useState } from 'react';
import x from '../../assets/images/xcircle.png';
import FlashingButton from '../../components/UI/FlashingButton/FlashingButton';
import classes from './comComponents.css';
//import Uxi from '../../../hoc/Uxi/Uxi';
import BackdropEffected from '../../components/UI/Backdrop/BackdropEffected';
import { BrowserView, MobileView, /* isBrowser, isMobile */ } from "react-device-detect";
const BdModal = props => {

    const [opacity, setOpacity] = useState(0);
    const [checkTime, setCheckTime] = useState();
    const [attachedClasses, setAttachedClasses] = useState([classes.BdModal, classes.Close]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (props.show) setAttachedClasses([classes.BdModal, classes.Open])
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
                        width: '40%', marginLeft: '20%'

                    }}
                >

                    {props.children}


                </div>
                {/* </div> */}

            </BrowserView>
            <MobileView>
                <style children={!props.show ? outEffect : inEffect} />
                <BackdropEffected show={props.show} clicked={props.modalClosed} />


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
                        display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', ...props.mobileStyle

                    }}
                >
                    <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                        <FlashingButton
                            clicked={props.modalClosed}
                            clickableImage={true}
                            image={x}
                        />
                    </div>

                    {props.children}


                </div>


            </MobileView>


        </div >

    );
};

export default React.memo(
    BdModal,
    (prevProps, nextProps) =>
        nextProps.show === prevProps.show &&
        nextProps.children === prevProps.children
);
