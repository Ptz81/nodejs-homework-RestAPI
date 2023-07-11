import HttpErrors from "../helpers/HttpError.js";

const validateBody = schema => {
    const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
    throw HttpErrors(400, error.message);
    }
        next()
    }
    return func;
}
export default validateBody;