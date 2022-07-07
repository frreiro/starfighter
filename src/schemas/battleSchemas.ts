import joi from "joi";

const usernamesSchemas = joi.object({
    firstUser: joi.string().required(),
    secondUser: joi.string().required()
})


export default usernamesSchemas