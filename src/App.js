import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import Logout from './containers/Auth/Logout/Logout';
import Spinner from './components/UI/Spinner/Spinner';
import Intro from './containers/Home/Home';
/* import {isIE} from 'react-device-detect'; */

const Auth = React.lazy(() => { return import('./newDesign/auth/Auth'); });
const UserClient = React.lazy(() => { return import('./newDesign/client/client'); });
const UserComercio = React.lazy(() => { return import('./newDesign/comercio/comercio'); });
const App = props => {


  let routes = (
    <Switch>
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/client" render={props => <UserClient {...props} />} />
      <Route path="/comercio" render={props => <UserComercio {...props} />} />
      <Route path="/" exact component={Intro} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {

    routes = (
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={Intro} />

        <Redirect to="/" />
      </Switch>
    );
  }
  return (

    <div>
      {/*    <Layout history={props.history} match={{ userInfo: '/dashboard/userInfo',register:'/register' }}  > */}
      <Suspense fallback={<Spinner />}> {routes}  </Suspense>
      {/*  </Layout> */}
    </div>
  );

}
const mapStateToProps = state => {

  return {
    isAuthenticated: state.auth.authenticated
  }
}
export default withRouter(connect(mapStateToProps, null)(App));