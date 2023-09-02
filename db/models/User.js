import { Schema, model, models } from "mongoose";
import validator from "validator";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,

      select: false,
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
