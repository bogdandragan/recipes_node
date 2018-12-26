const Category = require('../models/category.model');


exports.create = function (req, res, next) {
    const categoryId = req.body.categoryId;

    Category.findById(categoryId, (err, category) => {
        if (err) return next(err);
        if (!category){
            return res.send({type: 'fail', description : `category id [${categoryId}] not found`});
        }
        let recipe = category.recipes.create(req.body);
        category.recipes.push(recipe);

        category.save((err) => {
            if (err) return next(err);
            res.send({type: 'ok', categoryId: category.id, recipeId: recipe.id});
        });
    });
};

exports.getById = function (req, res, next) {
    const recipeId = req.params.id;

    Category.findOne({"recipes._id" : recipeId}, (err, category) => {
        if (err) return next(err);
        if (!category){
            return res.send({type: 'fail', description : `recipe id [${recipeId}] not found`});
        }
        const recipe = category.recipes.id(recipeId);
        res.send({type: 'ok', recipe});
    })
};

exports.update = function (req, res, next) {
    const recipeId = req.params.id;
    const recipe = req.body;

    Category.findOneAndUpdate({"recipes._id" : recipeId}, {$set: {"recipes.$.title" : recipe.title, "recipes.$.description" : recipe.description}}, {new: true}, (err, category) => {
        if (err) return next(err);
        if (!category){
            return res.send({type: 'fail', description : `recipe id [${recipeId}] not found`});
        }
        const updatedRecipe = category.recipes.id(recipeId);
        res.send({type: 'ok', recipe: updatedRecipe});
    });
};

exports.deleteById = function (req, res, next) {
    const recipeId = req.params.id;

    Category.findOne({"recipes._id" : recipeId}, (err, category) => {
        if (err) return next(err);
        if (!category){
            return res.send({type: 'fail', description : `recipe id [${recipeId}] not found`});
        }
        const recipe = category.recipes.id(recipeId);
        category.recipes.id(recipeId).remove();
        category.save((err) => {
            if (err) return next(err);
            res.send({type: 'ok', categoryId: category.id, recipeId: recipe.id});
        });
    })
};

exports.getPathToRecipe = function (req, res, next) {
    const recipeId = req.params.id;

    Category.findOne({"recipes._id" : recipeId}, (err, category) => {
        if (err) return next(err);
        if (!category){
            return res.send({type: 'fail', description : `recipe id [${recipeId}] not found`});
        }
        Category.populateParentNodes(category._id).then((path) => {
            res.send({ type: "ok", path})
        }).catch((err) => {
            next(err);
        });
    })
};