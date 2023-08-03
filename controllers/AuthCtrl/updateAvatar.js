import path from "path";
import fs from "fs/promises"
import { User } from "../../models/user.js";
import Jimp from "jimp";

// const avatarDir = path.join(_dirname, 'public', 'avatar');
const avatarDir = path.resolve('public', 'avatar');
const updateAvatar = async (req, res) => {
  // const { originalname } = req.file;
   const {_id} = req.user //зберігаємо ід
    const filename = `${_id}_${originalname}`; // замінюємо імя на унікальне - до оригіналу додаємо ід
    const { path: tempDir, originalname } = req.file // старий шлях до файлу з тимчасової папки
    const image = await Jimp.read(tempDir) // бібліотека - записуємо параметри аватару
    image.resize(250, 250)
      .writeAsync(tempDir)
  const newPathDir = path.join(avatarDir, filename); //створюємо новий шлях до файлу 
  await fs.rename(tempDir, newPathDir); //переміщаємо файл з темп у аватар
const avatar = path.join('avatar', filename); //шлях до файлу
await User.findByIdAndUpdate(_id, {avatar})// знаючи ід можна перезаписати аватар url
    res.json({
    avatar,
})
}
export default updateAvatar;