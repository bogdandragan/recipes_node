var Joi = require('joi');

module.exports = {
    create:{
        body: {
            categoryId: Joi.string().required(),
            title: Joi.string().required(),
            description: Joi.string().required()
        }
    },
    update:{
        body: {
            title: Joi.string().required(),
            description: Joi.string().required()
        }
    }
};