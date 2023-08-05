import { Schema, model } from "mongoose";
import handleMongooseError from "../helpers/handleMongooseError.js";
import Joi from "joi";


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
    subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: '',
    },
    avatar:{
      type: String,
      required: true
    },
    verify: {
      type: Boolean,
      default: false
  },
  verificationCode: {
    type: String,
    default:''
    },

}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
})

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
})

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  
})

export const User = model("user", userSchema);

export const userSchemaSet = {
  registerSchema,
  loginSchema,
  emailSchema
};