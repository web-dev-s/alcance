import React, { useEffect, useState } from 'react';
import classes from './Backdrop.css';

const BackdropEffected = (props) => {
  //  const [opacity, setOpacity] = useState(0);
  //  const [checkTime, setCheckTime] = useState();
  //  const [attachedClasses, setAttachedClasses] = useState([classes.InfoModal, classes.Close]);
  //  const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  /*   useEffect(() => {

        setMounted(true);
        return () => { setMounted(false); }
    }, []); */
    // eslint-disable-next-line react-hooks/exhaustive-deps
   /*  useEffect(() => {
        if (!mounted) return;
        let interval;
        if (opacity <= 1) {
            interval = setInterval(() => {

                if (opacity === 1) { clearInterval(interval); return }
                else { setCheckTime(Date.now()); }
            }, 350);
        }
        return () => { clearInterval(interval); }
    }, [opacity]); */
    // eslint-disable-next-line react-hooks/exhaustive-deps
/*     useEffect(() => {

          if (props.show) setAttachedClasses([classes.InfoModal, classes.Open])
           else setAttachedClasses([classes.InfoModal, classes.Close]);  
        return () => {
                    if (!props.show) setAttachedClasses([classes.InfoModal, classes.Close])
                        else setAttachedClasses([classes.InfoModal, classes.Open]); 
        }

    }, [props.show]); */

  /*   useEffect(() => {
         if (opacity < 1 && props.show) 
        mounted && setOpacity(o => (o < 1) ? o + 0.1 : o > 0 ? o - 0.1 : o)
        //  if (opacity > 0 && !props.show && mounted) setOpacity(o=>o - 0.1);

    }, [checkTime]); */
    useEffect(() => {
        if (!props.show) setTimeout(() => { setVisible(props.show) }, 1500);
        else setVisible(props.show);
    }, [props.show]);
    const inEffect = `     @keyframes react-fade-in {       0%   { opacity: 0; }       50%  { opacity: 0.5; }       100% { opacity: 1; }     }   `;
    const outEffect = `     @keyframes react-fade-out {       0%   { opacity: 1; }       50%  { opacity: 0.5; }       100% { opacity: 0; }     }   `;




    return (
        visible ?
            <div /* className={[attachedClasses]} */>
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