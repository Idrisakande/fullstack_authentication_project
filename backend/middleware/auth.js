import jwt from "jsonwebtoken";
import ENV from "../confg.js";
// import UserModel from "../model/User.model.js";

/**
 * access authorise header to validate request
 * use the authorise header to get the token by separating barear text from the token
 * retrive the user details for the logged in user
 * by using jwt to verify the token together with jwt secrect pass as an argument, this return decodedtoken
 * and pass the decodedtoken to the req.user and return a json decodedtoken
 * and get the user id from the decodedtoken and pass to the updateUser route instead of using const id = req.query.id
 * and updated the User route in a way that only the valid user can access the update route
 */
export const Auth = async (req, res, next) => {
  try {
    // access authorise header to validate request
    // by retrieve the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token with the secret key
    // and retrive the user details for the logged in user
    const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);

    req.user = decodedToken;

    //Call the next middleware
    next();
  } catch (error) {
    return res.status(401).send({ msg: "Authentication Failed" });
  }

  //   try {
  //     const token = req.header("Authorization").replace("Bearer ", "");
  //     const decodedToken = jwt.verify(token, ENV.JWT_SECRET);
  //     // const user = await UserModel.findOne({
  //     //   _id: decodedToken._id,
  //     //   "tokens.token": token,
  //     // });

  //     // if (!user) {
  //     //   throw new Error();
  //     // }

  //     //   req.token = token;
  //     req.user = decodedToken;
  //     res.json(decodedToken);
  //     // next();
  //   } catch (error) {
  //     res.status(401).send({ error: "Please authenticate" });
  //   }
};

/**
 * this is middleware variabe is created only when the generate OTP is calls
 * use the locals property of app to access the locals variable
 */
export const localVariables = (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };

  next();
};
// Drisy
