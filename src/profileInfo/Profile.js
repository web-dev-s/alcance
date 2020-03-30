import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as a from '../store/actions/actionTypes';
import * as actions from '../store/actions/index';
import ProfileItem from "./ProfileItem";
import profileIcon from '../assets/images/user.png';
import dateIcon from '../assets/images/calendar.png';
import idIcon from '../assets/images/cedula.png';
import phoneIcon from '../assets/images/phone.png';
import emailIcon from '../assets/images/email.png';
import passwordIcon from '../assets/images/lock.png';
import profileImg from '../assets/images/profileImg.png';
import defaultProfileImg from '../assets/images/user.png'
import globeIcon from '../assets/images/globe.png';
import locationIcon from '../assets/images/location.png';
import mapIcon from '../assets/images/map.png';
import editIcon from '../assets/images/edit.png';
import FlashingButton from '../components/UI/FlashingButton/FlashingButton';
import { updateObject, checkValidity, color } from '../shared/utility';
import Input from '../components/UI/Input/Input';
import ProfilePictureComponent from '../components/AVATAR/ProfilePictureComponent/ProfilePictureComponent';
import BdModal from '../components/UI/Modal/BdModal';
import CameraComponent from '../components/AVATAR/SwitchCamsComponent/CameraComponent';
const UserClientProfile = props => {


    // useEffect(() => { }, [])

    const [showCamera, setShowCamera] = useState(false);
    const [changingAvatar, setChangingAvatar] = useState(false);
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
        let elementConfig = { type: 'email', placeholder: 'Usuario/Email', }
        if (fieldText == Phone) elementConfig = { type: 'number', placeholder: 'Teléfono', }


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
            elementConfig={elementConfig}
            value={fieldText == Phone ? phone : email}
            invalid={fieldText == Phone ? !phoneValid : !emailValid}
            shouldValidate={{ required: true, isEmail: fieldText == Phone ? false : true }}
            touched={fieldText == Phone ? phoneTouched : emailTouched}
            changed={event => fieldText == Phone ? inputPhoneChanged(event) : inputEmailChanged(event)}
            onFocus={() => { }}
        />


    }
    const { Name, Surname, BirthDate, IDCard, Phone, Email, BusinessName, BusinessAddress, State, profileImage } = props.userInfo;
    const onUpdateUsersData = () => {
        const data = {
            in_Email: email,
            in_Phone: phone,
            /*   in_State: profileImage,
              in_BusinessAddress: BusinessAddress,
              in_Picture: profileImage, */
            in_Token: props.userToken,
        }

        props.onUpdateUserData(data).then(res => {
            console.log('-------  props.onUpdateUserData---------------------')
            console.log(res)


            if (res.status === '200') {
                setEditableText(false)
            }
        });


    }

    const mesageModalClosed = () => {

    };
    const handleFileSelect = (e) => {
        e.preventDefault();
        const fileSelector = document.createElement('input');
        fileSelector.setAttribute('type', 'file');
        fileSelector.addEventListener("change", function (e) {
            // console.log('change:=> ', e.target.files);

            props.onSetProfileImage(URL.createObjectURL(e.target.files[0]));


        }, false);

        fileSelector.click();
    }

    const modalChangePhoto = <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1, overflow: 'hidden', marginTop: '30px', }}>
        <div style={{ flex: 1, display: 'flex', height: '50%', width: '70%', alignItems: 'center', alignContent: 'center', justifyContent: 'center', alignSelf: 'center', }}
            onClick={(e) => { setChangingAvatar(!changingAvatar); setShowCamera(true) }}
        >
            <p style={{ textAlign: 'center' }}>Toma una foto</p>
        </div>
        <div style={{ flex: 1, display: 'flex', height: '50%', width: '70%', alignItems: 'center', alignContent: 'center', justifyContent: 'center', alignSelf: 'center', borderBottom: '1px solid #f8bb48', borderTop: '1px solid #f8bb48', }}
            onClick={(e) => { setChangingAvatar(!changingAvatar); handleFileSelect(e) }}
        >
            <p style={{ textAlign: 'center' }}>Importar foto</p>
        </div>
        <div style={{ flex: 1, display: 'flex', height: '50%', width: '70%', alignItems: 'center', alignContent: 'center', justifyContent: 'center', alignSelf: 'center', }}
            onClick={(e) => { setChangingAvatar(!changingAvatar); props.onSetProfileImage(defaultProfileImg) }}
        >
            <p style={{ textAlign: 'center' }}>Borrar foto</p>
        </div>
    </div>

    return (<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignitems: 'center', marginTop: '88px', marginBottom: '45px', marginLeft: '20px', marginRight: '20px', }}>
        {changingAvatar && < div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
            <BdModal id='showhangingAvatar' show={changingAvatar} modalClosed={(e) => { mesageModalClosed(e) }}
                mobileStyle={{ top: '25%', left: '10%', right: '10%', width: undefined }}
            >
                {modalChangePhoto}
            </BdModal>
        </div>}
        {showCamera && (<div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center'/* width: '250px', height: '250px' */ }}>

            <CameraComponent returnToInfos={() => { setChangingAvatar(false); setShowCamera(false) }} />

        </div>)
        }
        {!showCamera && <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1, }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignitems: 'center', flex: 1, }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignitems: 'center', flex: 1 }} onClick={() => { setChangingAvatar(true) }}>
                    <img src={props.userInfo.profileImage ? props.userInfo.profileImage : profileImg} style={{ width: '100px', height: '100px', resizeMode: 'contain' }} />

                </div>
                <div style={{ display: 'flex', flex: 2, flexDirectiom: 'row', justifyContent: 'flex_start', alignItems: 'center', alignSelf: 'center', }}>
                    <label style={{ fontSize: '22px', alignSelf: 'flex-start', paddingLeft: '10%', width: '100%' }}>{Name} {Surname}</label>
                </div>
            </div>
        </div>}
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
                clicked={(e) => { onUpdateUsersData() }}
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
        userToken: state.auth.userToken,
        userInfo: { profileImage: state.al.profileImage, ...state.al.showUserInfo, },

    }
);


const mapDispatchToProps = dispatch => {
    return {
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
        onUpdateUserData: (dS) => dispatch(actions.updateUserData({ type: a.VEN_UPDATE_USER_DATA, data: { in_Token: dS.in_Token, in_Email: dS.in_Email, in_Phone: dS.in_Phone, } })),
        onSetProfileImage: (proifileImage) => dispatch(actions.setProfileImage({ profileImage: proifileImage })),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserClientProfile);