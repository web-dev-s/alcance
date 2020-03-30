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
    useEffect(() => {
        if (props.show) setAttachedClasses([classes.InfoModal, classes.Open]);
        else setAttachedClasses([classes.InfoModal, classes.Close]);
        return () => {
            if (!props.show) setAttachedClasses([classes.InfoModal, classes.Close]);
            else if (mounted) setAttachedClasses([classes.InfoModal, classes.Open]);
        }
    }, [props.show]);

    useEffect(() => {
        if (!props.show) setTimeout(() => { setVisible(props.show) }, 0);
        else setVisible(props.show);
    }, [props.show]);



    return (
        visible ?
            <div className={[attachedClasses]}>
                <div className={classes.Backdrop} onClick={props.clicked}
                    style={{    // overflow: 'overlay', overflowY: 'scroll',  
                    }}
                >
                    {props.children}
                </div>
            </div>
            : null
    )
};

export default Backdrop;