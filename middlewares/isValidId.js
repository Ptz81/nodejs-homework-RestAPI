import isValidObjectId from "mongoose";
import HttpErrors from "../helpers/HttpError.js";


export const isValidId = (req, res, next) => {
    const { id } = req.params;
    if (isValidObjectId(id)) {
        next(HttpErrors(400, `${id} is not valid`))
    }
    next()
}