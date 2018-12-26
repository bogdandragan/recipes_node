const express = require('express');
const router = express.Router();
const categoryCtrl = require('../controllers/category');
const articleCtrl = require('../controllers/article');
const recipeCtrl = require('../controllers/recipe');


router.get('/category/:id/path/', categoryCtrl.getPathToCategory);
router.get('/category/:id/recipes/', categoryCtrl.getCategoryRecipes);
router.get('/category/:id/articles/', categoryCtrl.getCategoryArticles);

router.get('/article/:id/path/', articleCtrl.getPathToArticle);
router.get('/recipe/:id/path/', recipeCtrl.getPathToRecipe);


module.exports = router;