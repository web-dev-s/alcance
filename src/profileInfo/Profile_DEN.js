import React from 'react';
import { connect } from 'react-redux';
import ProfileItem from "./ProfileItem";
import profileIcon from '../../assets/images/user.png';
import * as actions from '../../store/actions/index';
import dateIcon from '../../assets/images/calendar.png';
import idIcon from '../../assets/images/cedula.png';
import phoneIcon from '../../assets/images/phone.png';
import emailIcon from '../../assets/images/email.png';
import passwordIcon from '../../assets/images/lock.png';
import profileImg from '../../assets/images/profileImg.png'
//import editIcon from '../../assets/images/bx_bxs-edit.png';

import classes from './Profile.css';

const individualInfo = {
    client: {
        "BirthDate": { leftIcon: dateIcon },
        "IDCard": { leftIcon: idIcon }
    },

    store: {
        "State": { leftIcon: dateIcon },
        "BusinessAddress": { leftIcon: dateIcon },
        "BusinessName": { leftIcon: idIcon }
    }

}

const common = {
    Name: { leftIcon: profileIcon },
    Surname: { leftIcon: profileIcon },
    Email: { editable: 1, leftIcon: emailIcon },
    Phone: { editable: 1, leftIcon: phoneIcon },
    Password: { editable: 1, leftIcon: passwordIcon },
}

const UserClientProfile = props => {

    console.log('-------------------------')
    console.log(props)
    let profileItems = [];

    const allFields = { ...common, ...individualInfo[props.userType] }
    for (const key in allFields) {
        profileItems.push(<ProfileItem key={key}
            //props
            {...allFields[key]}
            data={props.userInfo[key]}
            onUpdateUserData={props.onUpdateUserData}
            whichData={key} />);
    } 

    return (<div style={{ padding: "0 15px", position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, marginTop: 0 }}>
        <h1>hello</h1>
        <div className={classes.profileImageWrapper}>
            {/* <input type="file" /> */}
            <span className={classes.profileImage} style={{ backgroundImage: props.userInfo.profileImage ? props.userInfo.profileImage : profileImg }}></span>
            {/* <img class="changeProfileImage" src="https://www.luzy-s1.net/tax4uweb/assets/img/icons/pen@2x.png"/>> */}
        </div>


        {/*   {profileItems} */}
        {allFields && allFields.length > 0 && allFields.map((item, index) => {
            return <ProfileItem key={index}
                //props

                data={item}
                onUpdateUserData={props.onUpdateUserData}
                whichData={item.id} />

        })}
    </div>
    );
}

const mapStateToProps = state => (
    {
        userType: state.auth.userType,
        userInfo: { profileImage: state.al.profileImage, ...state.al.showUserInfo, },

    }
);

const mapDispatchToProps = dispatch => ({
    onUpdateUserData: (data) => { dispatch(actions.updateUserData({ data })) }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserClientProfile);