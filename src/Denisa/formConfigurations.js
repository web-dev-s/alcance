// import Eye from '../../assets/img/icons/eye.png';
// import Lock from '../../assets/img/icons/lock.png';
// import Mail from '../../assets/img/icons/mail.png';
// import Key from '../../assets/img/icons/key.png';

import Eye from '../assets/img/icons/eye.png';
import Lock from '../assets/img/icons/lock.png';
import Mail from '../assets/img/icons/mail.png';
import Key from '../assets/img/icons/key.png';
import Phone from '../assets/img/icons/tel.png';

const configurations = {
    login: {
        loginForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                label: "Email:",
                value: 'sophia.white0031@yahoo.com',
                icons: [
                    // {
                    //     source: Mail,
                    //     classes:"input-icon-right"
                    // },
                    {
                        source: Mail,
                        classes: "input-icon"
                    }

                ],
                // classes:["form-check"],
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false, errors: [],

                touched: false
            },
            password: {
                elementType: 'input',
                label: "Elegir una contraseña:",
                icons: [
                    {
                        source: Eye,
                        classes: "input-icon-right"
                    },
                    {
                        source: Lock,
                        classes: "input-icon"
                    }

                ],
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '123456',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false, errors: [],
                touched: false
            },
          
            // terms: {
            //     elementType: 'checkbox',
            //     containerClasses: ["form-check"],
            //     // elementConfig: {
            //     //     type: 'password',
            //     //     placeholder: 'confirmPassword'
            //     // },
            //     value:"off",
            //     validation: {
            //         checked: true
            //     },
            //     valid: false, errors: [],
            //     touched: false
            // }
        },
        formIsValid: false,
        isSignUp: false
    },
    signup: {
        loginForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                label: "Email:",
                value: 'a@c.c',
                icons: [
                    // {
                    //     source: Mail,
                    //     classes:"input-icon-right"
                    // },
                    {
                        source: Mail,
                        classes: "input-icon"
                    }

                ],
                // classes:["form-check"],
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false, errors: [],

                touched: false
            },
            password: {
                elementType: 'input',
                label: "Elegir una contraseña:",
                icons: [
                    {
                        source: Eye,
                        classes: "input-icon-right"
                    },
                    {
                        source: Lock,
                        classes: "input-icon"
                    }

                ],
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: 'denisa',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false, errors: [],
                touched: false
            },
            confirmPassword: {
                elementType: 'input',
                icons: [
                    {
                        source: Eye,
                        classes: "input-icon-right"
                    },
                    {
                        source: Key,
                        classes: "input-icon"
                    }

                ],
                label: "Confirmar contraseña:",
                elementConfig: {
                    type: 'password',
                    placeholder: 'confirmPassword'
                },
                value: 'denisa',
                validation: {
                    required: true,
                    pswMatch: true
                },
                valid: false, errors: [],
                touched: false
            },
            phone: {
                elementType: 'input',
                icons: [
                    // {
                    //     source: ,
                    //     classes: "input-icon-right"
                    // },
                    {
                        source: Phone,
                        classes: "input-icon"
                    }

                ],
                label: "Confirmar contraseña:",
                elementConfig: {
                    type: 'text',
                    placeholder: 'confirmPassword'
                },
                value: 'denisa',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false, errors: [],
                touched: false
            },
            terms: {
                elementType: 'checkbox',
                containerClasses: ["form-check"],
                // elementConfig: {
                //     type: 'password',
                //     placeholder: 'confirmPassword'
                // },
                value: 'off',
                validation: {
                    checked:true
                },
                valid: false, errors: [],
                touched: false,
                value:1
            }
        },
        formIsValid: false,
        isSignUp: false
    },

    forgot: {
        loginForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                label: "Email:",
                value: 'a@c.c',
                icons: [
                    // {
                    //     source: Mail,
                    //     classes:"input-icon-right"
                    // },
                    {
                        source: Mail,
                        classes: "input-icon"
                    }

                ],
                // classes:["form-check"],
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false, errors: [],
                touched: false
            },
        },
        formIsValid: false,
        isSignUp: false
    }
}

export default configurations;