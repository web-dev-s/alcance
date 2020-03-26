import React, { useState/* , useRef, useEffect  */ } from 'react';
import { connect } from 'react-redux';
//import * as actions from '../../../store/actions/index';
import avatar from '../../../assets/images/profileImg.png';
import editImg from '../../../assets/images/edit.png';
import classes from './ProfilePictureComponent.css';
import Measure from "react-measure";

//import FlashingButton from '../../UI/FlashingButton/FlashingButton';
// backgroundImage: 'url(' + props.profileImage + ')' 

const ProfilePictureComponent = (props) => {

    const [changingAvatar, setChangingAvatar] = useState(false);
    const [avatarContainer, setAvatarContainer] = useState({ width: 0, height: 0, });

    function handleResize(contentRect) {
        setAvatarContainer({
            width: contentRect.bounds.width,
            height:/*  Math.round( */contentRect.bounds.width /* / aspectRatio) */,

        });
    }

    return (<div style={{ position: 'static', display: 'flex', flexDirection: 'column', overflow: 'visible', flex: 1, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>

        <div style={{ flex: 1, display: 'flex', position: 'relative', height: '50%', width: '50%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'/* , border: '5px solid #f8bb48' */, borderRadius: '50%' }}>

            <Measure bounds onResize={handleResize}>
                {({ measureRef }) => (
                    <div ref={measureRef} style={{ overflow: 'hidden', flex: 1, display: 'flex', borderRadius: '50%', alignSelf: 'center', /* height: '50%', */ width: '50%', }}>

                        <img src={props.profileImage ? props.profileImage : avatar} alt="avatar" style={{ height: avatarContainer.height, width: avatarContainer.width, resize: 'contain', alignSelf: 'center' }} />
                    </div>
                )}
            </Measure>
            <div style={{ flex: 1, position: 'absolute', bottom: 0, right: '-3px', height: '100%', width: '30%', display: 'flex', flexDirection: 'row', alignItems: 'flex-end', backgroundColor: 'transparent' }}>
                <div style={{ height: '30%', width: '30%', }}>
                    <img onClick={() => { setChangingAvatar(!changingAvatar); }} src={editImg} alt="edit" style={{ height: '100%', resize: 'contain', }} />
                </div>
            </div>
        </div>
        {changingAvatar && <div className={[classes.ActionChoser]} style={{
            zIndex: '200',
            display: 'flex', flex: 1, position: 'absolute', top: avatarContainer.height + 48, flexDirection: 'column', alignItems: 'center',
            boxSizing: 'border-box', boxShadow: '0 2px 3px #ccc',
            border: '1px solid white', borderRadius: '8px',
            overflowY: 'auto', padding: '5px',

            justifyContent: 'center', textAlign: 'center',

            paddingBottom: '5px',
            minWidth: '60%',
            fontSize: '14px',
            backgroundColor: 'white'

        }}  >
            <div style={{ flex: 1, display: 'flex', height: '50%', width: '70%', alignItems: 'center', alignContent: 'center', justifyContent: 'center', alignSelf: 'center', }}
                onClick={(e) => { setChangingAvatar(!changingAvatar); props.onTakeFoto(e) }}
            >
                <p style={{ textAlign: 'center' }}>Toma una foto</p>
            </div>
            <div style={{ flex: 1, display: 'flex', height: '50%', width: '70%', alignItems: 'center', alignContent: 'center', justifyContent: 'center', alignSelf: 'center', borderBottom: '1px solid #f8bb48', borderTop: '1px solid #f8bb48', }}
                onClick={(e) => { setChangingAvatar(!changingAvatar); props.onUploadFoto(e) }}
            >
                <p style={{ textAlign: 'center' }}>Importar foto</p>
            </div>
            <div style={{ flex: 1, display: 'flex', height: '50%', width: '70%', alignItems: 'center', alignContent: 'center', justifyContent: 'center', alignSelf: 'center', }}
                onClick={(e) => { setChangingAvatar(!changingAvatar); props.onDeleteFoto(e) }}
            >
                <p style={{ textAlign: 'center' }}>Borrar foto</p>
            </div>
        </div>}
    </div >
    );
}

const mapStateToProps = state => {
    return {
        profileImage: state.al.profileImage,

    };
};

export default connect(mapStateToProps, null)(ProfilePictureComponent);