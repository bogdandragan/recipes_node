const express = require('express');
const router = express.Router();
const categoryCtrl = require('../controllers/category.controller');
const articleCtrl = require('../controllers/article.controller');
const recipeCtrl = require('../controllers/recipe.controller');

/**
 * Route returns path to current category.
 * @name get /api/category/:id/path/
 */
router.get('/category/:id/path/', categoryCtrl.getPathToCategory);
/**
 * Route returns recipe list for category _id.
 * @name get /category/:id/articles/
 */
router.get('/category/:id/recipes/', categoryCtrl.getCategoryRecipes);
/**
 * Route returns article list for category _id.
 * @name get /api/category/:id/articles/
 */
router.get('/category/:id/articles/', categoryCtrl.getCategoryArticles);
/**
 * Route returns categories path for article _id .
 * @name get /api/article/:id/path/
 */
router.get('/article/:id/path/', articleCtrl.getPathToArticle);
/**
 * Route returns categories path for recipe _id .
 * @name get /api/recipe/:id/path/
 */
router.get('/recipe/:id/path/', recipeCtrl.getPathToRecipe);


module.exports = router;