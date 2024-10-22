import mongoose from "mongoose";

import bcrypt from "bcrypt";
const { ObjectId } = mongoose.Schema.Types;
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Provide your name"],
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minLength: [6, "Please make your password is at least 6 characters long"],
      maxLength: [
        128,
        "please make sure your password is less than 128 characters long",
      ],
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
    console.log(error);
  }
});
const UserModel =
  mongoose.models.UserModel || mongoose.model("UserModel", userSchema);

export default UserModel;
