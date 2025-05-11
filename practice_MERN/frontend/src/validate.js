const emailRegEx =
  /^[a-zA-Z0-9.]{3,}[a-zA-Z0-9!@#$%^&*()_-][@][a-z]{3,}[.][a-z]{3}$/;
const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
export const validate = (key, value) => {
  let err = {};
  if (key === "email") {
    if (value === "") {
      err.email = "email is required";
    } else if (!emailRegEx.test(value)) {
      err.email = "email is not valid";
    } else {
      err.email = "";
    }
  }

  if (key === "password") {
    if (value === "") {
      err.password = "password is required";
    } else if (!passwordRegEx.test(value)) {
      err.password = "password is not valid";
    } else {
      err.password = "";
    }
  }

  return err;
};
