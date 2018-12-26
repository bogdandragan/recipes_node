const Category = require('../models/category.model');

exports.create = function (req, res, next) {
    const parentId = req.body.parentId;

    let category = new Category(
        {
            parent: parentId,
            children: [],
            name: req.body.name,
            recipes: [],
            articles: []
        }
    );

    category.save((err, category) => {
        if (err) {
            return next(err);
        }
        const insertedId = category.id;
        if(parentId){
            console.log("inserted id", insertedId);
            Category.findByIdAndUpdate(parentId, {$push: {children : insertedId}}, function (err, categotry) {
                if (err) return next(err);
                res.send({ type: "ok", id:insertedId})
            });
        }else{
            res.send({ type: "ok", id:insertedId})
        }
    })
};

exports.getById = function (req, res, next) {
    const categoryId = req.params.id

    Category.findById(categoryId, (err, category) => {
        if (err) return next(err);
        if (!category){
            return res.send({type: 'fail', description : `category id [${categoryId}] not found`});
        }
        res.send({ type: "ok", category:category});
    })
};

exports.update = function (req, res, next) {
    const categoryId = req.params.id

    Category.findByIdAndUpdate(categoryId, {$set: {name:req.body.name}}, {new: true}, (err, product) => {
        if (err) return next(err);
        if (!category){
            return res.send({type: 'fail', description : `category id [${categoryId}] not found`});
        }
        res.send({ type: "ok", category:category});
    });
};

exports.deleteById = function (req, res, next) {
    const categoryId = req.params.id
    Category.findByIdAndRemove(categoryId, (err, category) => {
        if (err) return next(err);
        if (!category){
            return res.send({type: 'fail', description : `category id [${categoryId}] not found`});
        }
        res.send({ type: "ok", id:category.id})
    })
};

exports.getPathToCategory = function (req, res, next) {
    const categoryId = req.params.id;

    Category.findById(categoryId, (err, category) => {
        if (err) return next(err);
        if (!category){
            return res.send({type: 'fail', description : `category id [${categoryId}] not found`});
        }
        Category.populateParentNodes(category.parent).then((path) => {
            console.log("res",path);
            res.send({ type: "ok", path:path})
        }).catch((err) => {
            next(err);
        });
    })
};

exports.getCategoryRecipes = function (req, res, next) {
    const categoryId = req.params.id;

    Category.findById(categoryId, (err, category) => {
        if (err) return next(err);
        if (!category){
            return res.send({type: 'fail', description : `category id [${categoryId}] not found`});
        }
        res.send({ type: "ok", recipes:category.recipes});

    })
};

exports.getCategoryArticles = function (req, res, next) {
    const categoryId = req.params.id;

    Category.findById(categoryId, (err, category) => {
        if (err) return next(err);
        if (!category){
            return res.send({type: 'fail', description : `category id [${categoryId}] not found`});
        }
        res.send({ type: "ok", recipes:category.articles});

    })
};


