import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ProfileItem from "./ProfileItem";
import profileIcon from '../../assets/images/user.png';
import * as actions from '../../store/actions/index';
import dateIcon from '../../assets/images/calendar.png';
import idIcon from '../../assets/images/cedula.png';
import phoneIcon from '../../assets/images/phone.png';
import emailIcon from '../../assets/images/email.png';
import passwordIcon from '../../assets/images/lock.png';
import profileImg from '../../assets/images/profileImg.png';
import globeIcon from '../../assets/images/globe.png';
import locationIcon from '../../assets/images/location.png';
import mapIcon from '../../assets/images/map.png';
import editIcon from '../../assets/images/edit.png';
import FlashingButton from '../../components/UI/FlashingButton/FlashingButton';
import { updateObject, checkValidity, color } from '../../shared/utility';
import Input from '../../components/UI/Input/Input'; 
 
const UserClientProfile = props => {

 
    useEffect(() => { console.log(props.userType) }, [])

    const [editableText, setEditableText] = useState(false);

    const [email, setEmail] = useState(props.userInfo.Email);// useState('a@a.aaa');
    const [emailValid, setEmailValid] = useState(true);
    const [emailTouched, setEmailTouched] = useState(false);

    const [phone, setPhone] = useState(props.userInfo.Phone);// useState('a@a.aaa');
    const [phoneValid, setPhoneValid] = useState(true);
    const [phoneTouched, setPhoneTouched] = useState(false);

    const inputEmailChanged = (e) => {
        setEmail(e.target.value);
        setEmailValid(checkValidity(e.target.value, { required: true, isEmail: true }));
        setEmailTouched(true);
    };
    const inputPhoneChanged = (e) => {
        setPhone(e.target.value);
        setPhoneValid(checkValidity(e.target.value, { required: true, isEmail: false }));
        setPhoneTouched(true);
    };
    const fieldText = (img, fieldText, editable) => {
        return <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignitems: 'center', paddingTop: '10px', paddingBottom: '5px', flex: 1, borderBottom: '1px solid #D2D2D2' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignitems: 'center', alignSelf: 'center', width: '20px' }}>
                <img src={img} style={{ width: '20px', height: '20px', resizeMode: 'contain' }} />
            </div>
            <div style={{ display: 'flex', flex: 2, flexDirectiom: 'row', justifyContent: 'flex_start', alignItems: 'center', alignSelf: 'center', }}>
                <label style={{ fontSize: '12px', alignSelf: 'flex-start', paddingLeft: '10%', width: '100%' }} >{fieldText}</label>
            </div>
            {editable && <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'flex-end', alignSelf: 'flex-end', paddingLeft: '5px', marginLeft: '20px', paddingLeft: '10px', paddingRight: '0px', marginRight: '0px' }}>
                <FlashingButton
                    clicked={(e) => { setEditableText(true) }}
                    clickableImage={true}
                    image={editIcon}
                    imageStyle={{ alignSelf: 'flex-end', justifyContent: 'flex-end', alignItems: 'flex-end' }}
                    containerStyle={{ alignSelf: 'flex-end', justifyContent: 'flex-end', alignItems: 'flex-end' }}
                />

            </div>}
        </div>
    }
    const renderEditableField = (img, fieldText) => {
        return <Input
            key={fieldText}
            containerStyle={{
                borderBottom: '1px solid #D2D2D2',
                display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                width: '100%', paddingTop: '2px', minHeight: '50px', fontSize: '12px',
            }}
            middleContainerStyle={{ border: 'none', }}
            inputStyle={{ minHeight: '50px', border: 'none', fontSize: '14px' }}
            leftimage={fieldText == Phone ? phoneIcon : emailIcon}
            elementType='input'
            elementConfig={{ type: 'email', placeholder: 'Usuario/Email', }}
            value={fieldText == Phone ? phone : email}
            invalid={fieldText == Phone ? !phoneValid : !emailValid}
            shouldValidate={{ required: true, isEmail: fieldText == Phone ? false : true }}
            touched={fieldText == Phone ? phoneTouched : emailTouched}
            changed={event => fieldText == Phone ? inputPhoneChanged(event) : inputEmailChanged(event)}
            onFocus={() => { }}
        />


    }
    const { Name, Surname, BirthDate, IDCard, Phone, Email, BusinessName, BusinessAddress, State, } = props.userInfo;

    return (<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignitems: 'center', marginTop: '88px', marginBottom: '45px', marginLeft: '20px', marginRight: '20px', }}>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1, }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignitems: 'center', flex: 1, }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignitems: 'center', flex: 1 }}>
                    <img src={props.userInfo.profileImage ? props.userInfo.profileImage : profileImg} style={{ width: '100px', height: '100px', resizeMode: 'contain' }} />
                </div>
                <div style={{ display: 'flex', flex: 2, flexDirectiom: 'row', justifyContent: 'flex_start', alignItems: 'center', alignSelf: 'center', }}>
                    <label style={{ fontSize: '22px', alignSelf: 'flex-start', paddingLeft: '10%', width: '100%' }}>{Name} {Surname}</label>
                </div>
            </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch', flex: 1, paddingBottom: '20px' }}>
            {props.userType !== 'client' && fieldText(globeIcon, BusinessName)}
            {props.userType !== 'client' && fieldText(locationIcon, BusinessAddress)}
            {props.userType !== 'client' && fieldText(mapIcon, State)}
            {fieldText(profileIcon, Name)}
            {fieldText(profileIcon, Surname)}
            {fieldText(dateIcon, BirthDate)}
            {fieldText(idIcon, IDCard)}
            {!editableText && fieldText(phoneIcon, Phone, true)}
            {!editableText && fieldText(emailIcon, Email, true)}
            {editableText && renderEditableField(phoneIcon, Phone)}
            {editableText && renderEditableField(emailIcon, Email)}
            {fieldText(passwordIcon, '*****************')}
        </div>

        {editableText && <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: '20px' }}>

            <FlashingButton
                clicked={(e) => { setEditableText(false) }}
                label={'SAVE'}
                style={{
                    color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '2px', minHeight: '20px', fontWeight: 'bold',
                    textAlign: ' center', marginRight: '10px',
                    display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
                }}
                textStyle={{ fontSize: '14px' }}
            />

            <FlashingButton
                clicked={(e) => { setEditableText(false) }}
                label={'DISCARD'}
                style={{
                    color: 'white', alignSelf: 'center', backgroundColor: '#f8bb48', borderRadius: '2px', minHeight: '20px', fontWeight: 'bold',
                    textAlign: ' center', marginLeft: '10px',
                    display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
                }} textStyle={{ fontSize: '14px' }}
            />

        </div>}
    </div >);
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