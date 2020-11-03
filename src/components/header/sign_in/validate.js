const isEmail = (email) => {
  const REGEXP_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return REGEXP_EMAIL.test(String(email).toLowerCase());
};

export const validateEmail = (rule, value, callback) => {
  if (value && !isEmail(value)) {
    callback("The email format is invalid.");
    return;
  }

  callback();
};
var r = /[^A-Z-a-z-0-9]/g;

export const validatePassword = (rule, value, callback) => {
  if (value && value.length < 8) {
    callback("The password must be at least 8 characters.");

    return;
  }
  if (value && r.test(value)) {
    callback("The password format is invalid.");

    return;
  }

  callback();
};
