import app from "./app.js"
import mongoose from "mongoose"

const DB_HOST = 'mongodb+srv://Taras:12345qwert@cluster0.ycalfsm.mongodb.net/Contacts_book?retryWrites=true&w=majority'

mongoose.set('strictQuery', true)

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
  })
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })

