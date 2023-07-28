const ctrlWrapper = ctrl => {
    const func = async (req, res, next) => {
        try {
            await ctrl(req, res, next);
        } catch (error) {
            next(error);
        }
    }
    return func;
}
export default ctrlWrapper; //функція обгортка, яка обгортає контролер та додає до неї try/catch