//Custom function for checking input errors by regex
export const validateInputs = (type, value) => {

    switch (type) {

        case 'username':
        case 'email':
        case 'password':
        case 'passwordConfirmation':

            if (value == "") {
                return `${type} field can not be empty`
            } else {
                return "ok"
            }

        case 'email':

            if (value !== "") {
                if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)) {

                    return "You need to add a valid email";
                } else {
                    return "ok";
                };
            } else {
                return "Email field can not be empty"
            }


        case 'username':

            if (value !== "") {
                if (! /[A-Za-zÀ-ÖØ-öø-ÿ ]/gi.test(value)) {
                    return "Usernames can not contain numbers or special character";
                } else {
                    return "ok";
                };
            } else {
                return "Username field can not be empty"
            }
            
        default:

            return "ok";


    }
};