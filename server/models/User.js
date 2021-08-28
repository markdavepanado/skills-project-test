import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      url: String,
      cloudinaryId: String,
      createdAt: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
