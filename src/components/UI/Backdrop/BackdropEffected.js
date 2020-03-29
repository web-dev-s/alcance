import React, { useEffect, useState } from 'react';
import classes from './Backdrop.css';

const BackdropEffected = (props) => {

    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);
    useEffect(() => { 
        if (!props.show&& mounted) setTimeout(() => { setVisible(props.show) }, 1500);
        else setVisible(props.show);  
    }, [props.show]);
    const inEffect = `     @keyframes react-fade-in {       0%   { opacity: 0; }       50%  { opacity: 0.5; }       100% { opacity: 1; }     }   `;
    const outEffect = `     @keyframes react-fade-out {       0%   { opacity: 1; }       50%  { opacity: 0.5; }       100% { opacity: 0; }     }   `;

    return (
        visible ?
            <div /* className={[attachedClasses]} */ key={props.id ? props.id : "bkDrop"}>
                <style children={!visible ? outEffect : inEffect} />
                <div className={classes.Backdrop} onClick={props.clicked}
                    style={{
                        //  transition: '2s',
                        //  transform: 'all 2s ease',// visible ? 'translateY(0)':'translateY(-100vh)',
                        //   opacity: opacity,/*  visible ? '1' : '0', */

                        animationDuration: '0.7s',
                        animationIterationCount: 1,
                        animationName: `react-fade-${(visible ? 'in' : 'out')}`,
                        animationTimingFunction: visible ? 'ease-in' : 'ease-out',

                        // overflow: 'overlay', overflowY: 'scroll',
                    }}
                >
                    {props.children}
                </div>
            </div>
            : null
    )
};

export default BackdropEffected;