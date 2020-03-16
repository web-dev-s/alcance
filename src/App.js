import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Logout from './containers/Auth/Logout/Logout';
import Spinner from './components/UI/Spinner/Spinner';
/* import {isIE} from 'react-device-detect'; */

const Auth = React.lazy(() => { return import('./containers/Auth/Login/Login'); });
const Register = React.lazy(() => { return import('./containers/Auth/Register'); });
const DashBoardScreen = React.lazy(() => { return import('./containers/DashboardScreen/DashBoardScreen'); });
const Payment = React.lazy(() => { return import('./components/Payment/Payment'); });
const UserInfo = React.lazy(() => { return import('./containers/UserInfo/UserInfo'); });
const App = props => {
  useEffect(() => {
    /*  window.addEventListener("message", onMessageIOS)
     document.addEventListener("message", onMessageANDROID); */
    return () => {
      /*   document.removeEventListener('message', onMessageANDROID);
        window.removeEventListener("message", onMessageIOS) */
    };
  }, []);
  /*  const logMessage = (message) => { console.log.append((new Date()) + " " + message + "\n"); }
   const onMessageIOS = event => {

      console.log("Send post message to IOS");
       logMessage("Sending post message from web to IOS..");
    window.postMessage("Post message from web", "*");
    window.postMessage({  data: props.match.url, eventData: event.data,   from: 'IOS' }, '*');
  };
  const onMessageANDROID = event => {
    console.log("Send post message to ANDROID");
    window.postMessage("Post message from web to ANDROID", "*");
    window.postMessage({  data: props.match.url, eventData: event.data,   from: 'ANDROID' }, '*');
  };
 */


  let routes = (
    <Switch>
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/register" render={props => <Register {...props} />} />
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {

    routes = (
      <Switch>
        {/*    <Route path="/dashboard" render={props => <DashBoardScreen {...props} />} /> */}
        <Route path="/payment" component={Payment} />
        <Route path="/logout" component={Logout} />
        {/*   <Route path="/auth" render={props => <Auth {...props} />} />
 */}
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" exact render={props => <DashBoardScreen {...props} match={{ url: '/dashboard' }} />} />
        <Route path={'/dashboard/userInfo'} render={props => <UserInfo {...props} match={{ url: '/dashboard/userInfo', register: '/register' }} />} />


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