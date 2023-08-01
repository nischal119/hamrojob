import Joi from "joi";

export const userSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net"] } })
    .required(),
  contactNumber: Joi.string().min(8).max(10).required(),
  userType: Joi.string().required(),
  personName: Joi.string().min(5).max(20).trim().required(),
  age: Joi.number().min(18).max(100).required(),
  password: Joi.string().required(),
  organizationName: Joi.any(),
});
