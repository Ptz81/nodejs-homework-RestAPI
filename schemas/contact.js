import Joi from "joi";

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().length(10)
    .pattern(/\([0-9]\){3}[0-9]{7}/i)
    .required(),
})

export default addSchema;