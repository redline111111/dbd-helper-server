import {body} from 'express-validator'

export const postCreateValidation = [
    body('title', "Название должно быть больше 4 символов").isLength({min: 5}).isString(),
    body('character', "Неверное название персонажа").isLength({min: 5}).isString(),
    body('perks', "Неверный формат перков").isArray(),
    body('description', "Неверное описание").optional().isString(),
];