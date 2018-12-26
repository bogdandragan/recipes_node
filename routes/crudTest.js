const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const categoryCtrl = require('../controllers/category');
const categoryValidation = require('../validations/category.validation.js');
const recipeCtrl = require('../controllers/recipe');
const recipeValidation = require('../validations/recipe.validation.js');
const articleCtrl = require('../controllers/article');
const articleValidation = require('../validations/article.validation.js');


router.post('/category', validate(categoryValidation.create), categoryCtrl.create);
router.get('/category/:id', categoryCtrl.getById);
router.put('/category/:id', validate(categoryValidation.update), categoryCtrl.update);
router.delete('/category/:id', categoryCtrl.deleteById);

router.post('/recipe', validate(recipeValidation.create), recipeCtrl.create);
router.get('/recipe/:id', recipeCtrl.getById);
router.put('/recipe/:id', validate(recipeValidation.update), recipeCtrl.update);
router.delete('/recipe/:id', recipeCtrl.deleteById);

router.post('/article', validate(articleValidation.create), articleCtrl.create);
router.get('/article/:id', articleCtrl.getById);
router.put('/article/:id', validate(articleValidation.update), articleCtrl.update);
router.delete('/article/:id', articleCtrl.deleteById);

module.exports = router;