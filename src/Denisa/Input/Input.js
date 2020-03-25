import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    // const inputClasses = [classes.InputElement];

    // if (props.invalid && props.shouldValidate && props.touched) {
    //     props.classes.push(classes.Invalid);
    // }
    const invalidInput = props.touched && props.errors.length?" invalid":"";
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={(props.classes || ['form-control']).join(' ')+invalidInput}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={(props.classes||[]).join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={(props.classes || []).join(' ')+invalidInput}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;

        case ('checkbox'):
            console.log("value in input",props.value)
            inputElement = (
                <label className={props.labelClass || "form-check-label checkbox-container"}>
                    Acepto las y la
                        <a href="#"> Condiciones del servicio </a>
                    y la
                    <a href="#"> Política de privacidad </a>
                    de TAXU.
                     <input className={(props.classes || []).join(' ') + invalidInput}
                        onChange={props.changed}
                        type="checkbox"
                        value={props.value}
                        /* checked={props.value ==="on"? true : false} */></input>
                    <span className="checkmark"></span>
                </label>
          
            );

            break;
        default:
            inputElement = <input
                className={(props.classes||[]).join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    let icons = null;
    if (props.inputIcons)
    {
        icons = props.inputIcons.map((icon,idx) => (<img key={idx} src={icon.source}
            className={icon.classes}
            alt="icon"
            key={icon.source}
        />));
    }
    return (
        <React.Fragment>
        <div className={props.containerClasses||"form-group"}>
            {props.label?<label className={classes.Label}>{props.label}</label>:null}
            {inputElement}
            {icons}
        </div>
            {props.errors.map(error => <p key={error} style={{color:"red"}}>{error}</p>)}
        </React.Fragment>
    );

};

export default input;