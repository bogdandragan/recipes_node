const express = require('express');
const router = express.Router();
const validate = require('express-validation');

const categoryCtrl = require('../controllers/category.controller');
const recipeCtrl = require('../controllers/recipe.controller');
const articleCtrl = require('../controllers/article.controller');

const categoryValidation = require('../validations/category.validation');
const recipeValidation = require('../validations/recipe.validation');
const articleValidation = require('../validations/article.validation');

/**
 * Route creates category
 * @name post /crudtest/category
 * @reqBodyParam {parentId} id of parent category (string, optional)
 * @reqBodyParam {name} category name (string, required)
 */
router.post('/category', validate(categoryValidation.create), categoryCtrl.create);
/**
 * Route returns category with specified _id .
 * @name get /crudtest/category/:id
 */
router.get('/category/:id', categoryCtrl.getById);
/**
 * Route updates category with specified _id .
 * @name put /crudtest/category/:id
 * @reqBodyParam {name} category name (string, required)
 */
router.put('/category/:id', validate(categoryValidation.update), categoryCtrl.update);
/**
 * Route deletes category with specified _id .
 * @name delete /crudtest/category/:id
 */
router.delete('/category/:id', categoryCtrl.deleteById);


/**
 * Route creates recipe
 * @name post /crudtest/recipe
 * @reqBodyParam {categoryId} id of recipe category (string, required)
 * @reqBodyParam {title} recipe title (string, required)
 * @reqBodyParam {description} recipe description (string, required)
 */
router.post('/recipe', validate(recipeValidation.create), recipeCtrl.create);
/**
 * Route returns recipe with specified _id .
 * @name get /crudtest/recipe/:id
 */
router.get('/recipe/:id', recipeCtrl.getById);
/**
 * Route updates recipe with specified _id .
 * @name put /crudtest/recipe/:id
 * @reqBodyParam {title} recipe title (string, required)
 * @reqBodyParam {description} recipe description (string, required)
 */
router.put('/recipe/:id', validate(recipeValidation.update), recipeCtrl.update);
/**
 * Route deletes recipe with specified _id .
 * @name delete /crudtest/recipe/:id
 */
router.delete('/recipe/:id', recipeCtrl.deleteById);


/**
 * Route creates article
 * @name post /crudtest/article
 * @reqBodyParam {categoryId} id of article category (string, required)
 * @reqBodyParam {title} article title (string, required)
 * @reqBodyParam {description} article description (string, required)
 * @reqBodyParam {content} article content (string, required)
 */
router.post('/article', validate(articleValidation.create), articleCtrl.create);
/**
 * Route returns article with specified _id .
 * @name get /crudtest/article/:id
 */
router.get('/article/:id', articleCtrl.getById);
/**
 * Route updates article with specified _id .
 * @name put /crudtest/article/:id
 * @reqBodyParam {title} article title (string, required)
 * @reqBodyParam {description} article description (string, required)
 * @reqBodyParam {content} article content (string, required)
 */
router.put('/article/:id', validate(articleValidation.update), articleCtrl.update);
/**
 * Route deletes article with specified _id .
 * @name delete /crudtest/article/:id
 */
router.delete('/article/:id', articleCtrl.deleteById);

module.exports = router;