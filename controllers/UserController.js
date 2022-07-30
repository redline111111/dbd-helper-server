import jwt   from "jsonwebtoken";
import bcrypt from "bcrypt";

import userModel from "../models/User.js";

export const register = async (req,res) =>{
    try {
     const password =  req.body.password;
     const salt = await bcrypt.genSalt(10);
     const hash = await bcrypt.hash(password, salt);
 
     const doc = new userModel({
         email: req.body.email,
         login: req.body.login,
         avatarUrl: req.body.avatarUrl,
         passwordHash: hash,
     });
 
     const user = await doc.save();
 
     const token = jwt.sign({
         _id: user._id,
     }, "haha123",{ expiresIn: "30d"});
 
     const {passwordHash, ...userData} = user._doc;
 
     res.json({
         ...userData,
         token,
     });
 
    } catch (error) {
         res.status(500).json({
             message: "Ошибка регистрации", 
         })
    }
}
export const login = async (req,res) =>{
    try {
        const user = await userModel.findOne({email: req.body.email});

        if (!user){
            return res.status(401).json({
                message: "Пользователь не найден",
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if(!isValidPass){
            return res.status(403).json({
                message: "Неверный логин или пароль",
            })
        }

        const token = jwt.sign({
            _id: user._id,
        }, "haha123",{ expiresIn: "30d"});
        
        const {passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token,
        });

    } catch (error) {
        res.status(500).json({
            message: "Не удалось авторизоваться", 
        })
    }
}

export const getMe = async (req,res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if(!user){
            return res.status(404).json({
                message: 'Пользователь не найден',
            })
        }
        const {passwordHash, ...userData} = user._doc;

        res.json(userData);

    } catch (error) {
        return res.status(500).json({
            message: 'Нет доступа',
        })
    }
}