var Joi = require('joi');

module.exports = {
    create:{
            body: {
                parent: Joi.string(),
                name: Joi.string().required()
            }
    },
    update:{
            body: {
                parentId: Joi.string().required(),
                name: Joi.string().required()
            }
    }
};