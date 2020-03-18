import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                style={{ border: 'none', ...props.inputStyle, width: '100%', height: '100%' }}
                className={classes.Input}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                style={{ border: 'none', ...props.inputStyle, width: '100%', height: '100%' }}

                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    style={{ border: 'none', ...props.inputStyle, width: '100%', height: '100%' }}
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
        case ('cardInput'):
            inputElement = <input
                style={{ border: 'none', ...props.inputStyle, width: '100%', height: '100%' }}

                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        default:
            inputElement = <input
                style={{ border: 'none', ...props.inputStyle, width: '100%', height: '100%' }}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={classes.Input} style={{  ...props.containerStyle }}>
            <text className={classes.Label} style={{ ...props.labelStyle }}>{props.label}</text>
            <div className={inputClasses.join(' ')} 
                style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', ...props.inputStyle, ...props.middleContainerStyle }}>
                {props.leftImage && <div style={{ display: 'flex', flexDirection: 'row', maxHeight: '25px', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '0px', marginRight: '4%' }}>
                    <img src={props.leftImage} alt="logo" style={{ width: '100%', height: '100%', resizeMode: 'contain', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '0px' }} />
                </div>}
                <div style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', }}>
                    {inputElement}
                </div>

            </div>
        </div>
    );

};

export default input;