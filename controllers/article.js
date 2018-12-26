const Category = require('../models/category');


exports.create = function (req, res, next) {
    const categoryId = req.body.categoryId;

    Category.findById(categoryId, (err, category) => {
        if (err) return next(err);
        if (!category){
            return res.send({type: 'fail', description : `category id [${categoryId}] not found`});
        }
        let article = category.articles.create(req.body);
        category.articles.push(article);

        category.save((err) => {
            if (err) return next(err);
            res.send({type: 'ok', categoryId: category.id, articleId: article.id});
        });
    });
};

exports.getById = function (req, res, next) {
    const articleId = req.params.id;
    Category.findOne({"articles._id" : articleId}, (err, category) => {
        if (err) return next(err);
        if (!category){
            return res.send({type: 'fail', description : `article id [${articleId}] not found`});
        }
        const article = category.articles.id(articleId);
        res.send({type: 'ok', article: article});
    })
};

exports.update = function (req, res, next) {
    const article = req.body;
    const articleId = req.params.id;
    Category.findOneAndUpdate({"articles._id" : articleId},
        {$set: {"articles.$.title" : article.title,
            "articles.$.description" : article.description,
            "articles.$.content" : article.content}},
        {new: true}, (err, category) => {
        if (err) return next(err);
        if (!category){
            return res.send({type: 'fail', description : `article id [${articleId}] not found`});
        }
        const updatedArticle = category.articles.id(articleId);
        res.send({type: 'ok', article: updatedArticle});
    });
};

exports.deleteById = function (req, res, next) {
    const articleId = req.params.id;
    Category.findOne({"articles._id" : articleId}, (err, category) => {
        if (err) return next(err);
        if (!category){
            return res.send({type: 'fail', description : `article id [${articleId}] not found`});
        }
        const article = category.articles.id(articleId);
        category.articles.id(articleId).remove();
        category.save((err) => {
            if (err) return next(err);
            res.send({type: 'ok', categoryId: category.id, articleId: article.id});
        });
    })
};

exports.getPathToArticle = function (req, res, next) {
    const articleId = req.params.id;

    Category.findOne({"articles._id" : articleId}, (err, category) => {
        if (err) return next(err);
        if (!category){
            return res.send({type: 'fail', description : `article id [${articleId}] not found`});
        }
        Category.populateParentNodes(category._id).then((path) => {
            res.send({ type: "ok", path:path})
        }).catch((err) => {
            next(err);
        });
    })
};