import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import router from './routes/api/contacts.js';
import dotenv from 'dotenv'

import authRouter from './routes/api/auth.js'

const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
dotenv.config()
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/contacts', router)

app.use(express.static("public"));//якщо прийде запит на статичний файл, шукай у папці Паблік

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({message})
})
export default app;
