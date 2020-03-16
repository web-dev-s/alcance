import React from 'react';
import {  Grid} from '@material-ui/core';
import classes from './Modal.css';
import Uxi from '../../../hoc/Uxi/Uxi';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
 /*  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  } */

  return (
    <Uxi>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <Grid  container spacing={4} justify="center" alignItems="center">
        <div
          className={classes.Modal}
          style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0',
          }}
        >
          {/*   <Grid zeroMinWidth container item spacing={4} justify="center" alignItems="center">  */}
          {/* <div style={{ display: 'flex', justifyContent:'center',alignItems:'center' }}> */}
          {props.children}
          {/*  </div> */}
          {/* </Grid> */}
        </div>
      </Grid>
    </Uxi >
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
