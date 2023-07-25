import app from "./app.js"
import mongoose from "mongoose"
// import DB_HOST from "./config.js"

const {DB_HOST} = process.env;

mongoose.set('strictQuery', true)

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3001, () => {
  console.log("Database connection successful. Server running. Use our API on port: 3000")
})
  })
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })

