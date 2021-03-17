const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.transactionPassword = !isEmpty(data.transactionPassword) ? data.transactionPassword : "";
  data.pincode = !isEmpty(data.pincode) ? data.pincode : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.fulladdress = !isEmpty(data.fulladdress) ? data.fulladdress : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  if (!Validator.isLength(data.transactionPassword, { min: 6, max: 30 })) {
    errors.transactionPassword = "Transaction Password must be at least 6 characters";
  }

  if (Validator.equals(data.password, data.transactionPassword)) {
    errors.transactionPassword = "Password and Transaction Password cannot be same";
  }

  //address checks
  if (Validator.isEmpty(data.pincode)) {
    errors.pincode = "Pincode field is required";
  }
  if (!Validator.isLength(data.pincode, { min: 6, max: 6 })) {
    errors.pincode = "pincode must be 6 characters";
  }
  if (Validator.isEmpty(data.state)) {
    errors.state = "state field is required";
  }
  if (Validator.isEmpty(data.fulladdress)) {
    errors.fulladdress = "fulladdress field is required";
  }
  if (Validator.isEmpty(data.city)) {
    errors.city = "city field is required";
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
