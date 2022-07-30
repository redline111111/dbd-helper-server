import {body} from 'express-validator'

export const loginValidation = [
    body('password', "Пароль должен быть больше 5 символов").isLength({min: 5}),
    body('login', "Логин должен быть больше 3 символов").isLength({min: 3}),
];

export const registerValidation = [
    body('email', "Неверная почта").isEmail(),
    body('password', "Пароль должен быть больше 5 символов").isLength({min: 5}),
    body('login', "Логин должен быть больше 3 символов").isLength({min: 3}),
    body('avatarUrl', "Неверная ссылка на аватарку").optional().isURL(),
];