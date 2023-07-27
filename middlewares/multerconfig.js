import multer from "multer";
import path from "path";
import app from "../app";

const tempDir = path.join(__dirname, "temp");//шлях до папки
//налаштування мідлвари - де зберегти і під яким ім'ям
const multerConfig = multer.diskStorage({
    destination: tempDir,//місце збереження файлу. Оскільки ми немаємо багато даних, то це місце збереження тимчасове, а мідлвара універсальна. Забереме файл через контролер
    // функція, яка може нам зберегти файл не під тим ім'ям, яке нам прийшло
    filename: (req, file, cb) => {
        cb(null, file.originalname);//зберігаємо файл під оригінальним ім'ям
    }
})
//мідлвара для зберігання
const upload = multer({
    storage: multerConfig,
})
export default upload;

//використання
// const avatarDir = path.join(_dirname, 'public', 'avatar')
// upload.fields([{name:'cover', maxCount:1},{name:'subcover', maxCount:3}]) //завантажити кілька файлів з кількох полів
// upload.array('cover', 8) //завантажити 8 файлів
// app.post('api/contacts', upload.single('cover'), async (req, res) => { //завантажити один файл з назвою cover
//     console.log(req.body)
//     const {path:tempDir, originalname} = req.file // старий шлях до файлу з тимчасової папки
//     const newPathDir = path.join(avatarDir, originalname) //створюємо новий шлях до файлу 
// await fs.rename(tempDir, newPathDir) //переміщаємо файл з темп у аватар
// const cover = path.join('public', 'avatar', originalname); //шдях до файлу
// const newContact = {   //дані нового користувача
//      id:nanoid,
//      ...req.body,
//      cover,
//}
// contacts.push(newContact) //закидаємо користувача у базу
// res.status(201).json(newContact) //надаємо статус і виводимо нового користувача
// })