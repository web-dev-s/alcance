import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Uxi from '../../hoc/Uxi/Uxi';
import Auth from '../Auth/Auth';
import Description from './Description';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

const Home = props => {
  // eslint-disable-line
  useEffect(() => {
    if (props.authRedirectPath !== '/') {
      props.onSetAuthRedirectPath('/dashboard');
    }
  }, [props]);

  let mainPage = props.error ? <p>MainPage can't be loaded!</p> : <Spinner />;

  if (true) {
    mainPage = (
      <Uxi>
        {!props.isAuthenticated && <Auth {...props} />}
        <Description isAuth={props.isAuthenticated} />
      </Uxi>
    );
  }

  return (
    <Uxi>
      {mainPage}
    </Uxi>
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Home, axios));
