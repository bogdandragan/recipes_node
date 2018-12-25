const Category = require('../models/category');
var mongoose = require('mongoose');

exports.category_create = function (req, res, next) {
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

    category.save(function (err, category) {
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

exports.category_get = function (req, res, next) {
    Category.findById(req.params.id, function (err, category) {
        if (err) return next(err);
        res.send(category);
    })
};

exports.category_update = function (req, res, next) {
    const parentId = mongoose.Types.ObjectId(req.body.parentId);
    Category.findByIdAndUpdate(req.params.id, {$set: {parent:req.body.parentId, name:req.body.name}}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

exports.category_delete = function (req, res, next) {
    Category.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};