import React, { useEffect, useState } from 'react'; 
import classes from './Modal.css';
//import Uxi from '../../../hoc/Uxi/Uxi';
import Backdrop from '../Backdrop/Backdrop';
import { BrowserView, MobileView, /* isBrowser, isMobile */ } from "react-device-detect";
const Modal = props => {



    const [attachedClasses, setAttachedClasses] = useState([classes.InfoModal, classes.CloseSimple]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);
    useEffect(() => {

        if (props.show && mounted) setAttachedClasses([classes.InfoModal, classes.OpenSimple])
        else setAttachedClasses([classes.SideDrawer, classes.CloseSimple]);

    }, [props.show]);
    return (

        <div key="modal">
            <BrowserView>
                <Backdrop show={props.show} clicked={props.modalClosed} />
                <div style={{ flex: 1 }} >
                    <div className={attachedClasses.join(' ')}
                        style={{}}
                    >
                        {props.children}
                    </div>
                </div>

            </BrowserView >
            <MobileView>
                <Backdrop show={props.show} clicked={props.modalClosed} />
                <div style={{ flex: 1 }}>
                    <div className={attachedClasses.join(' ')}
                        style={{}}
                    >
                        {props.children}
                    </div>
                </div>
            </MobileView>
        </div >

    );
};

export default React.memo(
    Modal,
    (prevProps, nextProps) =>
        nextProps.show === prevProps.show &&
        nextProps.children === prevProps.children
);
