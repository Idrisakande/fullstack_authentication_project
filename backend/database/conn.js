import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import ENV from "../confg.js";

export const connect = async () => {
  const mongod = await MongoMemoryServer.create();
  const getUri = mongod.getUri();

  mongoose.set("strictQuery", true);
  // const db = await mongoose.connect(getUri);
  const db = await mongoose.connect(ENV.ATLAS_URI);
  console.log("Database connected");
  return db;
};

// // // check if the user exist in the database
// const existUsername = await UserModel.findOne({ username })
//   .then((user) => {
//     if (user) {
//       return res.status(400).send({
//         msg: `${user.username} already exist, enter a unique username`,
//       });
//     }
//   })
//   .catch((error) => res.status(400).send({ error: "Username not found" }));

// // check if the email exist in the database
// const existEmail = await UserModel.findOne({ email })
//   .then((user) => {
//     if (user) {
//       return res.status(400).send({
//         msg: `${user.email} already exist, enter a unique email`,
//       });
//     }
//   })
//   .catch((error) => res.status(400).send({ error: "email not found" }));

// Promise.all([existUsername, existEmail])
//   .then(() => {
//     if (password) {
//       bcrypt
//         .hash(password, 10)
//         .then((hashedPassword) => {
//           const user = new UserModel({
//             files: files || "",
//             username,
//             email,
//             password: hashedPassword,
//           });
//           //   return and save the data as response
//           user
//             .save()
//             .then((result) =>
//               res.status(201).send({ msg: "User Register successfully" })
//             )
//             .catch((error) =>
//               res.status(500).send({ msg: "not successful" })
//             );
//         })
//         .catch((error) => {
//           return res
//             .status(500)
//             .send({ error: "Enable to hashed password" });
//         });
//     }
//   })
//   .catch((error) => {
//     return res.status(500).send({ msg: "No exiting individual" });
//   });
