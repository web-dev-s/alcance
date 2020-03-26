import React, { useState, useRef } from 'react';
import classes from './Profile.css';

const ProfileItem = props => {

    const [isEditing, setIsEditing] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const [data, setData] = useState(props.data);
    //nu sunt asa sigura pe state, se updateaza asincron
    //si am nevoie de valoarea asta da un moment nedeterminat 
    let field = useRef(null);

    console.log(isEditing);
    const { onUpdateUserData, editable, leftIcon, whichData } = props;

    console.log(isEditing)
    return (<div className={classes.UserInfoRow} >
        <div className={classes.centeredRow}>
            <img className={classes.leftIcon} src={leftIcon} alt="birthdate" />
            {editable ?
                <input type="text"
                    ref={field}
                    value={data}
                    className={isInvalid && classes.invalid}
                    readOnly={!isEditing}
                    onChange={(ev) => { setData(ev.currentTarget.value) }} />
                :
                <span>{data}</span>
            }

        </div>
        {editable && <img src={require('../../assets/images/edit.png')}
            className={classes.rightIcon}
            alt="edit"
            onClick={() => {
                setIsEditing(prevEditing => {
                    if (prevEditing) {
                        let payload = {};
                        //ce updatez
                        const key = "in_" + whichData;
                        const value = field.current.value;
                        payload[key] = value;
                        //poti apela o functie de validare
                        //if (validate(value)) {
                             onUpdateUserData(payload)
                        // }
                        // else {
                        //     setIsInvalid(true)
                        // }

                    }
                    return !prevEditing;
                });

            }}
        />
        }
    </div>);
}

export default ProfileItem;