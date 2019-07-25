const Validator = require("validator");
const isEmpty = require("./is-empty");

// module.exports = function validateLoginInput(data) {
exports.validateLoginInput = function (data) {

    let errors = {};

    // if these values are not present in the data object we are validating then they will be set to empty strings for the Validator.isEmpty
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    //Login validation rules
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (!Validator.isAlphanumeric(data.password)) {
        errors.password = "Password is not alphanumeric";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};