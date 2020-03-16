
import React, { useEffect, useState, useRef } from 'react';
import { Button, Grid, Checkbox, List, Avatar, ListItemAvatar, ListItemText, ListItemSecondaryAction, ListItem } from '@material-ui/core';


const CheckBox = (props) => {
    const [checked, setChecked] = useState(false);

    return (
        <Checkbox
            edge="end"
            color={props.color||'primary'}
            onChange={() => { setChecked(!checked) }}
            checked={checked}
            inputProps={{ 'aria-labelledby': props.labelId }}
        />

    )
};

export default CheckBox;