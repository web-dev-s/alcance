import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Uxi from '../../hoc/Uxi/Uxi';
import Auth from '../auth/Auth';
/* import logo from '../../assets/images/logo.png' */
import Description from '../description/Description';
import {  color } from '../../shared/utility';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

const Intro = props => {
  // eslint-disable-line
  useEffect(() => { }, [props]);
  let mainPage = props.error ? <p>MainPage can't be loaded!</p> : <Spinner />;

  if (true) {
    mainPage = (
      <>
        {!props.isAuthenticated && <Auth {...props} />}        
      </>
    );
  }

  return (
    <>
      {mainPage}
    </>
  );
};

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.authenticated };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Intro, axios));
