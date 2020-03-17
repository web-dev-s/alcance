
import React from 'react';
import Input from '../Input/Input';

const form = (props) => {
    let formElementsArray = null;
    if (props.formElements)
    {
        formElementsArray = [];
    }
    for (let key in props.formElements) {
        formElementsArray.push({
            id: key,
            config: props.formElements[key]
        });
    }
    //same for buttons
   
    const form = formElementsArray.map(formElement => {
        console.log(formElement.classes)
        return (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            errors={formElement.config.errors}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            classes={formElement.config.classes}
            inputIcons={formElement.config.icons}
            label={formElement.config.label}
            containerClasses={formElement.config.containerClasses}
            changed={(event) => props.inputChangedHandler(event, formElement.id)} />
    )});

    return (
        <form onSubmit={props.onSubmit}>
            
            {form}
            {props.children}
            <button style={{ width: "300px", height: "50px" }} type="submit" className="btn btn-primary">{props.submitBtnText}</button>
           
            {/* <Button btnType="Success" disabled={!this.state.formIsValid}>SUBMIT</Button>
            <Button btnType="Danger" clicked={this.switchMethod}>Switch to {this.state.isSignUp ? "signIn" : "signUp"}</Button> */}
        </form>
    )
}

export default form;

