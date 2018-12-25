const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title:String,
    description:String
});

const articleSchema = new Schema({
    title:String,
    description:String,
    content:String
});

const categorySchema = new Schema({
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    name:String,
    recipes:[recipeSchema],
    articles:[articleSchema]
});

module.exports = mongoose.model('Category', categorySchema);