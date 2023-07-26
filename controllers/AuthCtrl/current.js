
//отримуємо дані користувача, щою повторно не логінитись
const getCurrent = async(req, res) => {
    const { name, email } = req.user;
    res.json({
        name,
        email,
    })
}
export default getCurrent;