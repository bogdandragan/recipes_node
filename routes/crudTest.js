const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const categoryCtrl = require('../controllers/category');
const categoryValidation = require('../validations/category.validation.js');
/* GET api listing. */

router.post('/createCategory', validate(categoryValidation.create), categoryCtrl.category_create);

router.get('/getCategory/:id', categoryCtrl.category_get);

router.put('/updateCategory/:id', validate(categoryValidation.update), categoryCtrl.category_update);

router.delete('/deleteCategory/:id', categoryCtrl.category_delete);

module.exports = router;