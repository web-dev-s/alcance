import React, { useEffect, useState } from 'react';
import classes from './EffectsWrapper.css';

import Modal from '../../components/UI/Modal/Modal';
import Uxi from '../Uxi/Uxi';

const withEffectsWrapper = (WrappedComponent, axios) => {



    return props => {
        const [opacity, setOpacity] = useState(1);
        const [checkTime, setCheckTime] = useState();
        const [attachedClasses, setAttachedClasses] = useState([classes.InfoModal, classes.Close]);
        const [mounted, setMounted] = useState(false);

        useEffect(() => {
            setMounted(true);

        }, []);
        useEffect(() => {
            setMounted(true);
            if (props.show) setAttachedClasses([classes.InfoModal, classes.Open])
            else setAttachedClasses([classes.SideDrawer, classes.Close]);
            let interval;
            if (opacity <= 1) {
                interval = setInterval(() => {
                    if (opacity === 1) { clearInterval(interval); return }
                    else { setCheckTime(Date.now()); }
                }, 50);
            }
            return () => {
                if (!props.show) setAttachedClasses([classes.InfoModal, classes.Close])
                else setAttachedClasses([classes.SideDrawer, classes.Open]);
                setMounted(false);
                clearInterval(interval);
            }
        }, [props, props.show, mounted, opacity]);


        useEffect(() => {
            /* if (opacity < 1 && props.show) */
            setOpacity(o => (o < 1) ? o + 0.1 : o > 0 ? o - 0.1 : o)
            //  if (opacity > 0 && !props.show && mounted) setOpacity(o=>o - 0.1);

        }, [checkTime]);

        const inEffect = `     @keyframes react-fade-in {       0%   { opacity: 0; }       50%  { opacity: 0; }       100% { opacity: 1; }     }   `;
        const outEffect = `     @keyframes react-fade-out {       0%   { opacity: 1; }       50%  { opacity: 0; }       100% { opacity: 0; }     }   `;




        return (

            <div  >
                <style children={!mounted ? outEffect : inEffect} />
                <div
                    className={attachedClasses.join(' ')}
                    style={{
                        /*   /*  transitionTimingFunction: props.show ? 'ease-in' : 'ease-out', */
                        transition: '2s',
                        transform: 'all 2s ease',// props.show ? 'translateY(0)':'translateY(-100vh)',
                        opacity: opacity,/*  props.show ? '1' : '0', */

                        animationDuration: '0.7s',
                        animationIterationCount: 1,
                        animationName: `react-fade-${(mounted ? 'in' : 'out')}`,
                        animationTimingFunction: mounted ? 'ease-in' : 'ease-out',
                        display: 'flex', justifyContent: 'center'

                    }}
                >
                    <WrappedComponent {...props} />
                </div>
            </div>

        );
    };
};

export default withEffectsWrapper;
