import { Schema, model } from "mongoose";
import Joi from "joi";
import handleMongooseError from "../helpers/handleMongooseError.js";


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
  owner: {
      type: Schema.Types.ObjectId, //зберігаємо ід
      ref: "user", // з колекції user
      required: true
    }
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