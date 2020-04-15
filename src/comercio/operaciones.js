import React, { useEffect, useState } from 'react';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import axios from '../axios-orders';
import * as a from '../store/actions/actionTypes';
import * as actions from '../store/actions/index';
import * as _ from 'lodash';
import { Button, Grid, List, Avatar, ListItemAvatar, ListItemText, ListItem } from '@material-ui/core';
import { updateObject, checkValidity, color } from '../shared/utility';
import classes from './comercio.css';
import balanceIMG from '../assets/images/balance.png';
import giveMoney from '../assets/images/redArrow.png';
import receiveMoney from '../assets/images/greenArrow.png';
import { BrowserView, MobileView, /* isBrowser, isMobile */ } from "react-device-detect";
import useWindowDimensions from '../hooks/useWindowsDimensions';
import moment from "moment";
import 'moment/locale/es';

const Comercio_Operaciones = props => {
    const { height, width } = useWindowDimensions();
    const [transList, setTransList] = useState([]);
    const { userType, userId } = props;
    // eslint-disable-next-line react-hooks/exhaustive-deps  
    useEffect(() => {
        console.log('------Comercio_Operaciones--------------------------------------')
        console.log(props)
        props.onGetAllTransactionsForUser(props.userToken).then(res => {
            console.log('-----onGetAllTransactionsForUser--------------');
            console.log(res);
            if (res.status === '200') { setTransList([...res.data.result]) }
        });
    }, []);
    return (<div >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingLeft: '5%', paddingRight: '5%' }} >
            <MobileView style={{ width: width, height: height, marginTop: '48px', position: 'relative' }}>
                <div className={classes.container} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginTop: '2%' }}>

                    < div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', }}>

                        <div style={{ marginBottom: '4%', borderLeft: `5px solid ${color.alcanceOrange}`, display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center', }}>
                            <label style={{ fontSize: '1.4rem', color: color.alcanceOrange, marginLeft: '10px' }}>{'Operaciones recientes'}</label>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign: 'left', marginTop: '20px' }}>
                            <List dense style={{ minWidth: '99%' }}>
                                {transList && transList.length ? transList.map((item, idx) => {
                                    /*     const labelId = `checkbox-list-secondary-label-${item.Name || item.PassportNumber}`;
                                        let checked = false; */
                                    return (
                                        <ListItem key={idx} button style={{ display: 'flex',  width: '100%' }}>
                                            <img alt={`Avatar n°${idx + 1}`} src={+item.Amount > 0 ? receiveMoney : giveMoney} style={{ width: '10px', height: '10px', marginRight: '2px', resize: 'contain', justifyContent: 'center', alignSelf: 'center', transform: 'rotate(180deg)' }} />

                                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

                                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', lineHeight: '1.1' }}>
                                                    <ListItemText id={idx + '3'} primary={item.OperationType == 'in' ? 'Recibiste' : 'Enviaste'} style={{ color: item.OperationType == 'in' ? 'green' : 'red', fontWeight: '900', paddingLeft: '5px', marginBottom: 0 }} />
                                                    <ListItemText id={idx + '2'} primary={'$' + item.Amount} style={{ color: item.OperationType == 'in' ? 'green' : 'red', fontWeight: '900', display: 'flex', justifyContent: 'center' }} />
                                                    <ListItemText id={idx + '13'} primary={(item.OperationType == 'in' ? ' de ' : ' a ') + item.OtherPersonName} style={{ color: item.OperationType == 'in' ? 'green' : 'red', display: 'flex', justifyContent: 'center' }} />

                                                    {(item.ControlID) && <ListItemText id={idx + '13'} primary={+item.Amount > 0 ? 'de ' : 'a ' + item.ControlID} style={{ color: +item.Amount > 0 ? 'green' : 'red', display: 'flex', justifyContent: 'center' }} />
                                                    }
                                                    {(item.PassportNumber) &&
                                                        <ListItemText id={idx + '1'} primary={'(' + item.PassportNumber + ')'} style={{ color: 'blue', fontWeight: '900', display: 'flex', justifyContent: 'center' }} />
                                                    }

                                                </div>
                                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'left' }}>
                                                    <ListItemText id={idx + '1'} primary={moment(new Date(moment(item.Time).toDate())).locale('es').format("DD[/]MM[/]YYYY [a las] HH[:]mm ").toString()} style={{ color: 'darkGray' /* +item.Amount > 0 ? 'green' : 'red'  */, paddingLeft: '5px', display: 'flex', marginTop: 0 }} />


                                                </div>
                                                {/*  {(item.Name || item.PassportNumber) && <ListItemText id={idx + '1'} primary={' from ' + item.Name + '(' + item.PassportNumber + ')'} style={{ color: +item.Amount > 0 ? 'blue' : 'green' }} />} */}

                                            </div>


                                        </ListItem>
                                    );
                                }) : <ListItem key={1} button>
                                        <ListItemAvatar>
                                            <Avatar alt={`Avatar n°1`} src={balanceIMG} />
                                        </ListItemAvatar>
                                        <ListItemText id={1} primary={'No tienes operaciones recientes'} style={{ color: 'black', fontWeight: '900', paddingTop: '30px', paddingBottom: '30px' }} />
                                    </ListItem>}
                            </List>
                        </div>

                    </div>

                </div>
            </MobileView>
        </div>
        <BrowserView style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div className={classes.mainBrowserContainer}
                style={{
                    maxWidth: '400px', marginLeft: '10%', marginRight: '10%',
                    position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                    overflow: 'hidden',
                }}
            >
                <div className={classes.container} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginTop: '2%' }}>

                    < div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', }}>

                        <div style={{ marginBottom: '4%', borderLeft: `5px solid ${color.alcanceOrange}`, display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center', }}>
                            <label style={{ fontSize: '1.4rem', color: color.alcanceOrange, marginLeft: '10px' }}>{'Operaciones recientes'}</label>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign: 'left', marginTop: '20px' }}>
                            <List dense style={{ minWidth: '99%' }}>
                                {transList && transList.length ? transList.map((item, idx) => {
                                    /*     const labelId = `checkbox-list-secondary-label-${item.Name || item.PassportNumber}`;
                                        let checked = false; */
                                    return (
                                        <ListItem key={idx} button style={{ display: 'flex', width: '100%' }}>
                                            <img alt={`Avatar n°${idx + 1}`} src={+item.Amount > 0 ? receiveMoney : giveMoney} style={{ width: '10px', height: '10px', marginRight: '2px', resize: 'contain', justifyContent: 'center', alignSelf: 'center', transform: 'rotate(180deg)' }} />

                                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

                                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', lineHeight: '1.1' }}>
                                                    <ListItemText id={idx + '3'} primary={item.OperationType == 'in' ? 'Recibiste' : 'Enviaste'} style={{ color: item.OperationType == 'in' ? 'green' : 'red', fontWeight: '900', paddingLeft: '5px', marginBottom: 0 }} />
                                                    <ListItemText id={idx + '2'} primary={'$' + item.Amount} style={{ color: item.OperationType == 'in' ? 'green' : 'red', fontWeight: '900', display: 'flex', justifyContent: 'center' }} />
                                                    <ListItemText id={idx + '13'} primary={(item.OperationType == 'in' ? ' de ' : ' a ') + item.OtherPersonName} style={{ color: item.OperationType == 'in' ? 'green' : 'red', display: 'flex', justifyContent: 'center' }} />

                                                    {(item.ControlID) && <ListItemText id={idx + '13'} primary={+item.Amount > 0 ? 'de ' : 'a ' + item.ControlID} style={{ color: +item.Amount > 0 ? 'green' : 'red', display: 'flex', justifyContent: 'center' }} />
                                                    }
                                                    {(item.PassportNumber) &&
                                                        <ListItemText id={idx + '1'} primary={'(' + item.PassportNumber + ')'} style={{ color: 'blue', fontWeight: '900', display: 'flex', justifyContent: 'center' }} />
                                                    }

                                                </div>
                                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'left' }}>
                                                    <ListItemText id={idx + '1'} primary={moment(new Date(moment(item.Time).toDate())).locale('es').format("DD[/]MM[/]YYYY [a las] HH[:]mm ").toString()} style={{ color: 'darkGray' /* +item.Amount > 0 ? 'green' : 'red'  */, paddingLeft: '5px', display: 'flex', marginTop: 0 }} />


                                                </div>
                                                {/*  {(item.Name || item.PassportNumber) && <ListItemText id={idx + '1'} primary={' from ' + item.Name + '(' + item.PassportNumber + ')'} style={{ color: +item.Amount > 0 ? 'blue' : 'green' }} />} */}

                                            </div>


                                        </ListItem>
                                    );
                                }) : <ListItem key={1} button>
                                        <ListItemAvatar>
                                            <Avatar alt={`Avatar n°1`} src={balanceIMG} />
                                        </ListItemAvatar>
                                        <ListItemText id={1} primary={'No tienes operaciones recientes'} style={{ color: 'black', fontWeight: '900', paddingTop: '30px', paddingBottom: '30px' }} />
                                    </ListItem>}
                            </List>
                        </div>

                    </div>

                </div>
            </div>
        </BrowserView>

    </div >);
}
const mapStateToProps = state => {
    return {
        userType: state.auth.userType,
        userToken: state.auth.userToken,
        showUserInfo: state.al.showUserInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetAllTransactionsForUser: (token) => dispatch(actions.getAllTransactionsForUser({ type: a.VEN_GET_ALL_TRANSACTIONS, data: { in_Token: token } })),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Comercio_Operaciones, axios));
