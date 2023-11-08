import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../confg.js";
import otpGenerator from "otp-generator";

/** middleware for verify user */
// create async function
// set try and catch block
// get the username from user and set it to condition that if req.method is equal to GET, return req.query or return req.body
// and check the user existence with username
// and if username does not exist return a message that 'can't find user
// and if user exist with username, call the next function
export const verifyUser = async (req, res, next) => {
  try {
    // get username and check for the rquest method
    const { username } = req.method === "GET" ? req.query : req.body;
    // Check if user exists
    const user = await UserModel.findOne({ username });
    // if user doesn't exist
    if (!user) return res.status(404).send({ msg: "Can't find user" });
    // Attach the user object to the request
    // req.user = user;
    // Call the next middleware function if user exist
    next();
  } catch (error) {
    return res.status(401).send({ error: "Authentication error" });
  }
};
/** Post: http://localhost:8000/api/register
 *@params : {
    "username": "Drisy",
    "password": "admin123",
    "email": "example@gmail.com",
    "fullName": "Akande Idris",
    "mobileNumber": "08107057812",
    "address": "No 12 osoghbo street",
    "profileImg": ""
 }
 */
export const register = async (req, res) => {
  try {
    const { username, email, profileImg, password } = req.body;

    // Check if email or username already exists
    const [existingUsername, existingEmail] = await Promise.all([
      UserModel.findOne({ username }),
      UserModel.findOne({ email }),
    ]);

    if (existingUsername) {
      return res
        .status(400)
        .send({ msg: `Username ${username} already exists!... Enter new username and email` });
    }

    if (existingEmail) {
      return res.status(400).send({ msg: `Email ${email} already exists!... Enter new email and username` });
    }

    // Generate a salt
    // const salt = await bcrypt.genSalt(10);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new UserModel({
      username,
      email,
      profileImg,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();
    console.log(user.username);
    return res.status(201).send({
      msg: `${username}, you have successfully registered...!`,
    });
    // const { email, username, imageProfile, password } = req.body;
    // // // check if the user exist in the database
    // // const existUsername = await UserModel.findOne({ username })
    // //   .then((user) => {
    // //     if (user) {
    // //       return res.status(400).send({
    // //         msg: `${user.username} already exist, enter a unique username`,
    // //       });
    // //     }
    // //   })
    // //   .catch((error) => res.status(400).send({ error: "Username not found" }));

    // // // check if the email exist in the database
    // // const existEmail = await UserModel.findOne({ email })
    // //   .then((user) => {
    // //     if (user) {
    // //       return res.status(400).send({
    // //         msg: `${user.email} already exist, enter a unique email`,
    // //       });
    // //     }
    // //   })
    // //   .catch((error) => res.status(400).send({ error: "email not found" }));

    // // Promise.all([existUsername, existEmail])
    // //   .then(() => {
    // //     if (password) {
    // //       bcrypt
    // //         .hash(password, 10)
    // //         .then((hashedPassword) => {
    // //           const user = new UserModel({
    // //             profile: profile || "",
    // //             username,
    // //             email,
    // //             password: hashedPassword,
    // //           });
    // //           //   return and save the data as response
    // //           user
    // //             .save()
    // //             .then((result) =>
    // //               res.status(201).send({ msg: "User Register successfully" })
    // //             )
    // //             .catch((error) =>
    // //               res.status(500).send({ msg: "not successful" })
    // //             );
    // //         })
    // //         .catch((error) => {
    // //           return res
    // //             .status(500)
    // //             .send({ error: "Enable to hashed password" });
    // //         });
    // //     }
    // //   })
    // //   .catch((error) => {
    // //     return res.status(500).send({ msg: "No exiting individual" });
    // //   });

    // // Check if email or username already exists in the database
    // const [existingUsername, existingEmail] = await Promise.all([
    //   UserModel.findOne({ username }),
    //   UserModel.findOne({ email }),
    // ]);

    // if (existingUsername) {
    //   return res.status(400).send(`${username} already exists`);
    // }

    // if (existingEmail) {
    //   return res.status(400).send(`${email} already exists`);
    // }
    // // Hash the password
    // // if password is provided
    // if (password) {
    //   const hashedPassword = await bcrypt.hash(password, 10);
    //   // Create a new user
    //   const newUser = new UserModel({
    //     username,
    //     password: hashedPassword,
    //     imageProfile: imageProfile || " ",
    //     email,
    //   });
    //   // Save the new user to the database
    //   await newUser
    //     .save()
    //     .then((result) => {
    //       return res.status(201).send(result);
    //     })
    //     .catch((error) => {
    //       return res.status(404).send(error);
    //     });
    //   // console.log(newUser);
    //   // return res.status(201).send(newUser);
    //   // if password is not provided
    // } else {
    //   return res.status(201).send({ msg: "please input your password" });
    // }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: "An error occurred during registration" });
  }

  // try {
  //   const { username, email, password, profile } = req.body;

  //   const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  //   if (existingUser) {
  //     return res.status(409).json({ message: "User already exists" });
  //   }

  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const user = new UserModel({
  //     username,
  //     email,
  //     hashedPassword,
  //     profile,
  //   });

  //   await user.save();

  //   res.status(201).json({ message: "User created successfully" });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: "Server error" });
  // }
};

/** Post: http://localhost:8000/api/login
 *@params : {
    "username": "Drisy",
    "password": "admin123"
 }
 */
export const login = async (req, res) => {
  // get or request the username and password from the body
  // set up a catch block
  // find the user with the username and compare the user input password with the store user hashedpassword in the database
  // also check if we don't have the password
  // create a jsonwebtokem with payload, serect and expiresIn object to authentecate or sign in the user
  //  and return a successful message, the username and the token

  // get username and password from the input or body
  const { username, password } = req.body;
  // set try and catch block
  try {
    // Check if the user already exists in the database by checking for username
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ message: "Invalid username or password" });
    }
    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(404).send({ message: "Invalid password!... try again or recover password" });
    }
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      ENV.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    // retun a login message
    return res
      .status(201)
      .send({ message: `${username}, you have successful log in `, username, token });
  } catch (error) {
    console.log(error);
    return res.status(500).send("An error occurred during login");
  }

  // try {
  //   UserModel.findOne({ username })
  //     .then((user) => {
  //       bcrypt
  //         .compare(password, user.password)
  //         .then((passwordCheck) => {
  //           if (!passwordCheck) {
  //             return res.status(400).send({ error: "Don't have password" });
  //           }
  //           // create jwt token
  //           const token = jwt.sign(
  //             {
  //               userId: user._id,
  //               username: user.username,
  //             },
  //             ENV.JWT_SECRET,
  //             { expiresIn: "24h" }
  //           );
  //           return res.status(200).send({
  //             msg: "login successful..",
  //             username: user.username,
  //             token,
  //           });
  //         })
  //         .catch((error) => {
  //           return res.status(400).send({ error: "Password does not match" });
  //         });
  //     })
  //     .catch((error) => {
  //       return res
  //         .status(404)
  //         .send({ error: `${username} not found in our database` });
  //     });
  // } catch (error) {
  //   return res.status(500).send({ error });
  // }
};

/** Get: http://localhost:8000/api/user/Drisy  */
/**
 * @param :{
 * call try and catch
 * first distruture username from req.param
 * check if username was not provided from req.param
 * if it exist, use findOne function to check the user in database
 * and if error, return error
 * if no user, return appropriate message
 * and if there is user, retrun user
 * }
 */
export const getUser = async (req, res) => {
  try {
    // distruture username from req.param
    const { username } = req.params;
    // check if username is provided
    if (!username) {
      return res.status(400).send({ error: "Username not provided" });
    }
    // find the user in the database
    const user = await UserModel.findOne({ username });
    // if user does not exist
    if (!user) {
      return res
        .status(404)
        .send({ error: `User with username ${username} not found ` });
    }
    // if user exist
    // and hide the password
    // mongoose return unnecessary data with object so convert to json
    // const { password, ...userData } = user.toObject();
    // or
    const { password, ...userData } = Object.assign([], user.toJSON());

    return res.status(201).send(userData);
    // return any internet error
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Server error" });
  }
};

/** Put: http://localhost:8000/api/updateUser
 *@params : {
    "id": "userid",
 }
 body: {
    fullName: "",
    address: "",
    files: ""
 }
 */
/**
 * we make a put request to the update user end point
 * and pass id with the request and accept the data which we want it to appear
 * by first using try and catch block
 * and destructure id from req.query.id
 * and check if there is an id
 * if so, we pass data to the body and get the data from the req.body
 * and we use updateOne() function that accept the corresponding id and the new data to update as a parameter, to perform update function
 * and if data is updated, return appropriate message else return appropriate error meassage
 */
export const updateUser = async (req, res) => {
  try {
    // get the id from req.query
    // const id = req.query.id;
    const { userId } = req.user;
    // if the id wasn't provided
    // if (!id) {
    //   return res.status(400).send({ msg: "User ID is required" });
    // }

    // get the data from the body
    const dataToUpdate = req.body;
    // update the user with the given id
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $set: dataToUpdate },
      { new: true }
      // _id is use to find id that is pass which is a unique identifier in Momgodb database
      // We use the $set operator to update only the fields that are present in the req.body object.
      // We pass the { new: true } option to ensure that we get the updated user data back
    );

    // check if the user is updated and further the query with nModified for if any 'document' in the database is updated
    if (updatedUser.nModified === 0) {
      // nModified = 0, means no document is updated
      return res.status(404).send({ msg: "User not found" });
    } else {
      // else one document is updated
      console.log(updatedUser);
      return res
        .status(200)
        .send({ msg: "User updated successfully", user: updatedUser });
    }
  } catch (error) {
    console.log(error);
    // return the server error
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

/** Get: http://localhost:8000/api/generateOTP  */
/**
 * first generate the OTP and set the type of OTP value you want
 * and store it in a app locals variable to access the OTP from middleware
 */
export const generateOTP = async (req, res) => {
  try {
    req.app.locals.OTP = await otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    res.status(201).send({ code: req.app.locals.OTP });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "An error occurred while generating OTP.",
    });
  }
};

/** Get: http://localhost:8000/api/verifyOTP  */
/**
 *
 */
export const verifyOTP = async (req, res) => {
  try {
    const { code } = req.query;
    const copiedOTP = parseInt(code);
    const generatedOTP = parseInt(req.app.locals.OTP);

    if (generatedOTP === copiedOTP) {
      // Reset OTP and start reset password session
      req.app.locals.OTP = null;
      req.app.locals.resetSession = true;

      return res.status(200).send({
        msg: "OTP verification successful. Please start reset password session.",
      });
    } else {
      return res.status(400).send({
        msg: "Invalid OTP. Please try again.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      msg: "An error occurred while verifying OTP.",
    });
  }
};

// successfully redirect the user when the OTP is valid
/** Get: http://localhost:8000/api/createResetSession  */
export const createResetSession = async (req, res) => {
  try {
    if (req.app.locals.resetSession) {
      // resetSession is true, so we can proceed
      // allowing access to that route only once
      // req.app.locals.resetSession = false;
      return res.status(201).send({ flag: req.app.locals.resetSession });
    }

    return res.status(440).send({ msg: "Reset session expired" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("An error occurred while creating reset session");
  }
};

// update the password when we have valid session
/** PUt: http://localhost:8000/api/resetPassword  */
export const resetPassword = async (req, res) => {
  try {
    //if there is no valid session then user can not reset password
    if (!req.app.locals.resetSession) {
      return res.status(440).send({ msg: "Reset session expired" });
    }

    const { username, password } = req.body;
    // find the user in the database
    const user = await UserModel.findOne({ username });
    // if user does not exist
    if (!user) {
      return res
        .status(404)
        .send({ error: `User with username ${username} not found ` });
    }
    // check if password is provided
    if (!password) {
      return res.status(400).send({ msg: "Password not provided" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword) {
      return res
        .status(400)
        .send({ msg: "An error occurred while hashing password" });
    }
    // Update the user's password in the database
    const updatedUser = await UserModel.findOneAndUpdate(
      { username },
      { $set: { password: hashedPassword } },
      { new: true }
    );
    // check if the user is updated and further the query with nModified for if any 'document' in the database is updated
    if (updatedUser.nModified !== 0) {
      // if nModified !== 0, reset session
      req.app.locals.resetSession = false;
      // nModified !== 0, means document is updated
      return res.status(200).send({
        msg: "Password reset successfully",
        password: hashedPassword,
      });
    } else {
      // else no document is updated
      return res
        .status(400)
        .send({ msg: "An error occurred while updating password" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Internal server error while resetting password");
  }

  // const { username, password } = req.body;

  // User.findOne({ username })
  //   .then(user => {
  //     if (!user) {
  //       return res.status(400).send('User not found');
  //     }

  //     bcrypt.hash(password, 10)
  //       .then(hashedPassword => {
  //         User.updateOne({ username }, { password: hashedPassword })
  //           .then(() => {
  //             res.status(200).send('Password reset successfully');
  //           })
  //           .catch(error => {
  //             console.log(error);
  //             res.status(500).send('An error occurred while updating password');
  //           });
  //       })
  //       .catch(error => {
  //         console.log(error);
  //         res.status(500).send('An error occurred while hashing password');
  //       });
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     res.status(500).send('An error occurred while finding user');
  //   });
};

// 08029465584

// 07034293477
