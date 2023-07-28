import path from "path";
import fs from "fs/promises"
import { User } from "../../models/user";
const avatarDir = path.join(_dirname, 'public', 'avatar');
const updateAvatar = async(req, res) => {
   const {_id} = req.user //зберігаємо ід
    const { path: tempDir, originalname } = req.file // старий шлях до файлу з тимчасової папки
    const newPathDir = path.join(avatarDir, originalname) //створюємо новий шлях до файлу 
    await fs.rename(tempDir, newPathDir) //переміщаємо файл з темп у аватар
const avatar = path.join('avatar', originalname); //шдях до файлу
await User.findByIdAndUpdate(_id, {avatar})// знаючи ід можна перезаписати аватар url
    res.json({
    avatar,
})
}
export default updateAvatar;