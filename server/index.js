import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import {registerValidation, loginValidation} from './validations.js'
import {validationResult} from "express-validator";
import checkAuth from "./utils/checkAuth.js";
import userModel from './models/User.js'

import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'

mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.qqibxix.mongodb.net/?retryWrites=true&w=majority')
    .then(()=>console.log('DB ok'))
    .catch((err)=>console.log('DB error',err));

const app = express()

app.use(express.json())

app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/registr', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

//app.get('/posts', PostController.getAll)
//pp.get('/posts/:id', PostController.getAll)
app.post('/posts', PostController.create)
//app.get('/posts', PostController.getAll)

app.listen(4444,(err)=>{
    if(err) {
        return console.log(err.message);
    }
    console.log('Server started on port 444');
})