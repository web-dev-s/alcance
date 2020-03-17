export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }
    if (rules.exactLength) {
        /* eslint eqeqeq: 0 */
        isValid = value.length == rules.exactLength && isValid
    }
    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;

        isValid = (Number(value) || pattern.test(value)) && isValid
    }

    if (rules.equals) {
        //  equals: { val: 'string' }
        isValid = (value === rules.equals.val) && isValid
    }

    return isValid;
}
export const color = {
    trasparent: 'transparent',
    black: '#000036',
    washedBlack: '#40495c',
    white: '#ffffff',
    blue: '#3771ff',
    washedBlue: '#3771ff',
    lightgray: '#D4DFE8',
    darkgray: '#7c8797',
    gray: '#9DB2C5',
    red: '#dc3117',
    viola: '#6a48a0',
    darkRed: '#DF2935',
    lightSky: '#e5f2fe',
    darkBlue: '#00153d',
    sky: '#dff0ff',
    yellow: '#ffb602',
    green: '#40D100',
    redOrange: '#FB5607',
    twitterBlue: '#47cdf7',
    header: '#054993',
    // text:'#054993',
    // blue:"#054993",
    lightblue: '#0cb6f3',
    facebook: "#3667b8",
    twitter: "#00a3f9",
    instragram: "#e50069",
    textInput: '#0a1d41',
    transparent: 'transparent',
    brown: '#463100',
    alcanceOrange: '#F8BC3C', 
    // lightGray:'#b5c8dd'
};
