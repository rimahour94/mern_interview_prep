import { status } from "./statuscodes.js";

export const errors = {
  fullname: {
    required: "Fullname is required.",
    invalidname: "Please enter characters and length should be 3 to 50",
  },
  email: {
    required: "Email is required.",
    invalidEmail: "Please enter a valid email.",
  },
  password: {
    required: "Password is required.",
    invalidPassword:
      "Password must contain atleast 1 uppercase, 1 digit and 1 special character.",
  },
  status: {
    required: "Please enter fullname, email and password",
    requiredlogin: "Please enter email and password",
  },
};

export const userRegister = {
  success: { status: status.success, message: "User created successfully" },
  failure: { status: status.invalidRequest, message: errors.status.required },
};

export const userLogin = {
  success: { success: status.success, message: "User logged in successfully" },
  failure: {
    status: status.invalidRequest,
    message: "User not found",
  },
  incorrectPassword: {
    status: status.invalidRequest,
    message: "Please enter correct password",
  },
};
