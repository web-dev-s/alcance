import React, {  Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import Layout from './hoc/Layout/NewLayout';
import Logout from './auth/Logout';
import Spinner from './components/UI/Spinner/Spinner';
import Intro from './intro/Intro';
/* import {isIE} from 'react-device-detect'; */
  /* eslint eqeqeq: 0 */
const Auth = React.lazy(() => { return import('./auth/Auth'); });

const UserClient = React.lazy(() => { return import('./client/client'); });
const UserClientCodigo = React.lazy(() => { return import('./client/codigo'); });
const UserClientOper = React.lazy(() => { return import('./client/operaciones'); });
const UserClientPago = React.lazy(() => { return import('./client/pago'); });
const UserClientRemesa = React.lazy(() => { return import('./client/remesa'); });
const UserClientAyuda = React.lazy(() => { return import('./client/ayuda'); });

const ProfileInfo = React.lazy(() => { return import('./profileInfo/Profile'); });


const UserComercio = React.lazy(() => { return import('./comercio/comercio'); });
const UserComercioOper = React.lazy(() => { return import('./comercio/operaciones'); });
const UserComercioSolicPago = React.lazy(() => { return import('./comercio/solicitarPago'); });



const App = props => {
  let routes = (
    <Switch>

      <Route path="/auth" render={props => <Auth {...props} history={props.history} />} />

      <Route path="/" exact component={Intro} />
      <Redirect to="/" />

    </Switch>
  );

  if (props.isAuthenticated) {
    if (props.userType == 'client') {
      routes = (
        <Switch>

          <Route path="/logout" component={Logout} />
          <Route path="/client" render={props => <UserClient {...props} />} />
          <Route path="/client_codigo" render={props => < UserClientCodigo {...props} />} />
          <Route path="/client_operaciones" render={props => <UserClientOper {...props} />} />
          <Route path="/client_pago" render={props => <UserClientPago {...props} />} />
          <Route path="/client_remesa" render={props => <UserClientRemesa {...props} />} />
          <Route path="/client_ayuda" render={props => <UserClientAyuda {...props} />} />

          <Route path="/profile_info" render={props => <ProfileInfo {...props} />} />

          <Route path="/" exact component={Intro} />

          <Redirect to="/" />

        </Switch>
      );
    }
    else {
      routes = (
        <Switch>

          <Route path="/profile_info" render={props => <ProfileInfo {...props} />} />
 
          <Route path="/comercio" render={props => <UserComercio {...props} />} />
          <Route path="/comercio_operaciones" render={props => <UserComercioOper {...props} />} />
          <Route path="/comercio_pago" render={props => <UserComercioSolicPago {...props} />} />

          <Route path="/" exact component={Intro} />


          <Route path="/logout" component={Logout} />

          <Redirect to="/" />

        </Switch>
      );

    }

  }
  return (

    <div>
      <Layout history={props.history} match={{ userInfo: '/dashboard/userInfo', register: '/register' }}  >
        <Suspense fallback={<Spinner />}> {routes}  </Suspense>
      </Layout>
    </div>
  );

}
const mapStateToProps = state => {

  return {
    isAuthenticated: state.auth.authenticated,
    userType: state.auth.userType
  }
}
export default withRouter(connect(mapStateToProps, null)(App));