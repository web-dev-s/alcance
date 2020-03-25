import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import Layout from './hoc/Layout/NewLayout';
import Logout from './containers/Auth/Logout/Logout';
import Spinner from './components/UI/Spinner/Spinner';
import Intro from './newDesign/intro/Intro';
/* import {isIE} from 'react-device-detect'; */

const Auth = React.lazy(() => { return import('./newDesign/auth/Auth'); });

const UserClient = React.lazy(() => { return import('./newDesign/client/client'); });
const UserClient_Codigo = React.lazy(() => { return import('./newDesign/client/codigo'); });
const UserClient_Oper = React.lazy(() => { return import('./newDesign/client/operaciones'); });
const UserClient_Pago = React.lazy(() => { return import('./newDesign/client/pago'); });
const UserClient_Remesa = React.lazy(() => { return import('./newDesign/client/remesa'); });
const UserClient_Ayuda = React.lazy(() => { return import('./newDesign/client/ayuda'); });

const ProfileInfo = React.lazy(() => { return import('./newDesign/profileInfo/Profile'); });


const UserComercio = React.lazy(() => { return import('./newDesign/comercio/comercio'); });
const UserComercio_Oper = React.lazy(() => { return import('./newDesign/comercio/operaciones'); });
const UserComercio_SolicPago = React.lazy(() => { return import('./newDesign/comercio/solicitarPago'); });



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
          <Route path="/client_codigo" render={props => < UserClient_Codigo {...props} />} />
          <Route path="/client_operaciones" render={props => <UserClient_Oper {...props} />} />
          <Route path="/client_pago" render={props => <UserClient_Pago {...props} />} />
          <Route path="/client_remesa" render={props => <UserClient_Remesa {...props} />} />
          <Route path="/client_ayuda" render={props => <UserClient_Ayuda {...props} />} />

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
          <Route path="/comercio_operaciones" render={props => <UserComercio_Oper {...props} />} />
          <Route path="/comercio_pago" render={props => <UserComercio_SolicPago {...props} />} />

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