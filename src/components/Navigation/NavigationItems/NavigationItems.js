import React from 'react';
import { connect } from 'react-redux';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems} style={props.style}>
        {/*    { <NavigationItem link="/" exact>Home</NavigationItem>} */}
        {/*   {props.isAuthenticated ? <NavigationItem link="/payment">Payment Page</NavigationItem> : null}   */}

        {props.isAuthenticated ? <NavigationItem link={props.userType == 'client' ? "/client" : '/comercio'}>Home</NavigationItem> : null}
        {!props.isAuthenticated
            ? <NavigationItem link="/">Authenticate</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.authenticated,
        userType: state.auth.userType,
        userToken: state.auth.userId
    }
}
export default connect(mapStateToProps, null)(navigationItems); 