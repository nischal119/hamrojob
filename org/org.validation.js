import Joi from "joi";

export const orgSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net"] } })
    .required(),
  contactNumber: Joi.string().min(8).max(10).required(),
  established: Joi.date().required(),
  organizationName: Joi.string().min(1).max(100).required(),
});
