import { Schema, model } from "mongoose";
import handleMongooseError from "../helpers/handleMongooseError.js";
import Joi from "joi";
// import {handleSaveError, handleUpdateValidate} from './hooks.js'

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
  },
  token: {
    type: String,
    default: '',
    }

}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  
})

export const User = model("user", userSchema);

export const userSchemaSet = {
  registerSchema,
  loginSchema,
};