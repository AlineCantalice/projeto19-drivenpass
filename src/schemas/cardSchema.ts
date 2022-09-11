import joi from "joi";

const cardSchema = joi.object({
    cardName: joi.string().required(),
    cardNumber: joi.string().required(),
    password: joi.string().required(),
    securityCode: joi.string().max(3).required(),
    expirationDate: joi.string().required(),
    isVirtual: joi.boolean().required(),
    type: joi.valid('CREDIT', 'DEBIT', 'BOTH').required(),
    title: joi.string().required()
});

export default cardSchema;