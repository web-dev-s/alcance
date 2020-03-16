import React, { useEffect, useState } from 'react';
import classes from './Backdrop.css';

const Backdrop = (props) => {


    const [attachedClasses, setAttachedClasses] = useState([classes.InfoModal, classes.Close]);
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        // console.log('SetMounted')
        setMounted(true);
        return () => { setMounted(false); }
    }, []);


    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { if (props.show) setAttachedClasses([classes.InfoModal, classes.Open]); else setAttachedClasses([classes.InfoModal, classes.Close]); return () => { if (!props.show) setAttachedClasses([classes.InfoModal, classes.Close]); else if (mounted) setAttachedClasses([classes.InfoModal, classes.Open]); } }, [props.show]);

    useEffect(() => {
        if (!props.show) setTimeout(() => { setVisible(props.show) }, 0);
        else setVisible(props.show);
    }, [props.show]);
    const inEffect = `     @keyframes react-fade-in {       0%   { opacity: 0; }       50%  { opacity: 0; }       100% { opacity: 1; }     }   `;
    const outEffect = `     @keyframes react-fade-out {       0%   { opacity: 1; }       50%  { opacity: 0; }       100% { opacity: 0; }     }   `;




    return (
        visible ?
            <div className={[attachedClasses]}>
                <style children={!visible ? outEffect : inEffect} />
                <div className={classes.Backdrop} onClick={props.clicked}
                    style={{
                        //   transition: '2s',
                        transform: 'all 2s ease',// visible ? 'translateY(0)':'translateY(-100vh)',
                        opacity: visible ? '1' : '0',

                        animationDuration: '0.7s',
                        animationIterationCount: 1,
                        //  animationName: `react-fade-${(visible ? 'in' : 'out')}`,
                        //  animationTimingFunction: visible ? 'ease-in' : 'ease-out',

                        // overflow: 'overlay', overflowY: 'scroll',
                    }}
                >
                    {props.children}
                </div>
            </div>
            : null
    )
};

export default Backdrop;