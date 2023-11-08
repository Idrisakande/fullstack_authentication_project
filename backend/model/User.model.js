import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a unique username"],
    unique: [true, "Username Exist"],
  },
  password: {
    type: String,
    required: [true, "Please provide a unique password"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide a unique email"],
    unique: true,
  },
  fullName: { type: String },
  mobileNumber: { type: Number },
  address: { type: String },
  profileImg: { type: String },
});

export default mongoose.model.Users || mongoose.model("User", UserSchema);
