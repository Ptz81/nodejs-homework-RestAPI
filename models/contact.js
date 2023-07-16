import { Schema, model } from "mongoose";
import handleMongooseError from "../helpers/handleMongooseError.js";
import Joi from "joi";

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: [true, 'Set format (xxx) xxx-xx']

    },
    favorite: {
      type: Boolean,
      default: false,
    },
},{ versionKey: false, timestamps: true });

contactSchema.post("save", handleMongooseError)

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
})

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
})

export const Contact = model("contact", contactSchema);

export const schemaSet = {
  addSchema,
  updateFavoriteSchema
};