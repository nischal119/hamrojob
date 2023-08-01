import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  personName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 55,
    trim: true,
    nullable: true,
  },
  age: {
    type: Number,
    min: 18,
    max: 120,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  contactNumber: {
    type: String,
    required: true,
    min: 8,
    max: 10,
  },
  userType: {
    type: String,
    enum: ["seeker", "provider"],
    required: true,
    trim: true,
  },
  organizationName: {
    type: String,
    minlength: 3,
    maxlength: 55,
    trim: true,
    nullable: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});
export const User = mongoose.model("User", userSchema);
