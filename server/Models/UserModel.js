import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});
const UserModel = mongoose.model("User", userSchema);
export default UserModel;
