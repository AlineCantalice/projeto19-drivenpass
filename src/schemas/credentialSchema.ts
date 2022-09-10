import joi from "joi";

const credentialSchema = joi.object({
    url: joi.string().uri().required(),
    username: joi.string().required(),
    password: joi.string().required(),
    title: joi.string().max(50).required(),
});

export default credentialSchema;