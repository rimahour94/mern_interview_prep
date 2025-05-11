import { usermodel } from "../database/schema/userschema.js";
import { errors, userLogin, userRegister } from "../messages/messages.js";
import { status } from "../messages/statuscodes.js";
import { generateJwtToken } from "../server.js";

export const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body || {};

  if (!fullname && !email && !password) {
    return res.status(status.invalidRequest).send(userRegister.failure);
  }
  try {
    const user = new usermodel({ fullname, email, password });
    const userRes = await user.save();
    userRegister.success.data = userRes;
    return res.status(status.success).send(userRegister.success);
  } catch (err) {
    userRegister.failure.message = err?.message;
    return res.status(status.invalidRequest).send(userRegister.failure);
  }
};

export const userlogin = async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    let userobj = { ...userLogin };
    userobj.failure.message = errors.status.requiredlogin;
    return res.status(status.invalidRequest).send(userLogin.failure);
  }
  try {
    const jwttoken = generateJwtToken({ email, password });
    const user = await usermodel.findOne({ email });
    const validateUser = user && user.comparePassword(password);
    if (!user) {
      return res.status(status.invalidRequest).send(userLogin.failure);
    }

    if (!validateUser) {
      return res
        .status(status.invalidRequest)
        .send(userLogin.incorrectPassword);
    }

    let data = {
      email: user.email,
      fullname: user.fullname,
      createdAt: user.createdAt,
    };

    userLogin.success.data = data;
    userLogin.success.token = jwttoken;
    return res.status(status.success).send(userLogin.success);
  } catch (error) {
    userLogin.failure.message = error.message;
    res.status(status.invalidRequest).send(userLogin.failure);
  }
};
