import mongoose from "mongoose";

const orgModelSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    minlength: 3,
    maxlength: 55,
    trim: true,
    nullable: true,
  },

  established: {
    type: Date,
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
});
export const Org = mongoose.model("Org", orgModelSchema);
