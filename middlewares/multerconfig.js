import multer from "multer";
import path from "path";


// const tempDir = path.join(__dirname, "../", "temp");//шлях до папки
const tempDir = path.resolve("temp");//шлях до папки інший варіант запису
//налаштування мідлвари - де зберегти і під яким ім'ям
const multerConfig = multer.diskStorage({
    destination: tempDir,//місце збереження файлу. Оскільки ми немаємо багато даних, то це місце збереження тимчасове, а мідлвара універсальна. Забереме файл через контролер
    // функція, яка може нам зберегти файл не під тим ім'ям, яке нам прийшло
    filename: (req, file, cb) => {
        const { originalname } = file;
        const prefix = `${Date.now()}'-'${Math.round(Math.random() * 1E9)}`; //унікальний префікс до назви файлу
        const filename = `${prefix}_${originalname}`;//додаємо префікс до назви файлу
        cb(null, filename );//зберігаємо файл під новим ім'ям
    }
})

const limits = {
    fileSize: 1024 * 1024 * 5,
} //обмеження розміру завантаження

//мідлвара для зберігання
const uploadFunc = multer({
    storage: multerConfig,
    limits
})
export default uploadFunc;
