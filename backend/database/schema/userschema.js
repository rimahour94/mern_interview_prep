import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { errors } from "../../messages/messages.js";
import { emailRegEx, nameregex, passwordRegEx } from "../../utils/validate.js";

const userschema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, errors.fullname.required],
    validate: {
      validator: (value) => {
        return nameregex.test(value);
      },
      message: errors.fullname.invalidname,
    },
  },

  email: {
    type: String,
    unique: true,
    required: [true, errors.email.required],
    validate: {
      validator: (value) => emailRegEx.test(value),
      message: errors.email.invalidEmail,
    },
  },

  password: {
    type: String,
    required: [true, errors.password.required],
    validate: {
      validator: (value) => !passwordRegEx.test(value),
      message: errors.password.invalidPassword,
    },
  },
  avatar: {
    type: String,
    required: [true, "User profile is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

userschema.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

userschema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password, (err, isMatch) => {
    if (err) {
      return err;
    }

    return isMatch;
  });
};
export const usermodel = mongoose.model("Users", userschema);
