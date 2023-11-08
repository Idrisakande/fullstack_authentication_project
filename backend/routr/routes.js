import { Router } from "express";

export const router = Router();
/**import all controllers */
import * as controllers from "../controller/appContoller.js";
import { registerMail } from "../controller/mailer.js";
import { Auth, localVariables } from "../middleware/auth.js";

// post methods
router.route("/register").post(controllers.register); // register the user
router.route("/registerMail").post(registerMail); // send the email
router
  .route("/authenticate")
  .post(controllers.verifyUser, (req, res) => res.end()); // authenticate the user
router.route("/login").post(controllers.verifyUser, controllers.login); //login in app

// get methods
router.route("/user/:username").get(controllers.getUser); // user with username
router
  .route("/generateOTP")
  .get(controllers.verifyUser, localVariables, controllers.generateOTP); // generate random OTP
router.route("/verifyOTP").get(controllers.verifyUser, controllers.verifyOTP); // verified generated OTP
router.route("/createResetSession").get(controllers.createResetSession); // reset all the variables

// put methods
router.route("/updateUser").put(Auth, controllers.updateUser); // is use to update the user profile
router
  .route("/resetPassword")
  .put(controllers.verifyUser, controllers.resetPassword); // to reset password
