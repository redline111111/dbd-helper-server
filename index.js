import express from "express";
import multer from "multer";
import mongoose from "mongoose";

import { registerValidation, loginValidation } from "./validations/auth.js";
import { postCreateValidation } from "./validations/post.js";
import { UserController, PostController } from "./controllers/index.js";
import {handleValidationErrors, checkAuth} from "./utils/index.js";


mongoose.connect('mongodb+srv://admin:roshanhasfolen11@cluster0.yh0bogl.mongodb.net/entity?retryWrites=true&w=majority')
.then(() => { console.log('DB connect')})
.catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use('/uploads', express.static('uploads'));


const storage = multer.diskStorage({
    destination: (_,__, cb) =>{
        cb(null, 'uploads');
    },
    filename: (_, file, cb) =>{
        cb(null, file.originalname);
    }
})

const upload = multer({storage});

app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.post('/auth/login',loginValidation, handleValidationErrors, UserController.login)
app.get('auth/me', checkAuth, UserController.getMe )

app.post('/upload', checkAuth, upload.single('image'), (req,res) =>{
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
});

app.get('/posts', PostController.getAll );
app.get('/posts/:id', PostController.getOne );
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create );
app.delete('/posts/:id', checkAuth, PostController.remove );
app.patch('/posts/:id', checkAuth, handleValidationErrors, PostController.update );

app.listen(4444, (err) =>{
    if(err){
        return console.log(err);
    }
    console.log('Server ok');
});

