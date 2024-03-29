import express from "express";
import userRouter from './routes/user.route.js'
import cors from 'cors'
import cookieParser from "cookie-parser";
export const app = express();

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded())

app.use('/user', userRouter)