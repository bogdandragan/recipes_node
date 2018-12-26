var Joi = require('joi');

module.exports = {
    create:{
            body: {
                parentId: Joi.string(),
                name: Joi.string().required()
            }
    },
    update:{
            body: {
                name: Joi.string().required()
            }
    }
};