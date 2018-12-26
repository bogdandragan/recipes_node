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
    parent: {                       //store parent ref to traverse to top of tree
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    children: [{                    //store children refs to traverse from top to down
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    name:String,
    recipes:[recipeSchema],
    articles:[articleSchema]
});

categorySchema.indexes({ parent: 1, children: 1 });


categorySchema.statics.populateParentNodes = function (id){
    const categoryModel = this;

    function getParent(id, arr){
        return new Promise((resolve, reject) => {
            categoryModel.findById(id).then((category) => {
                if (!category){
                    resolve(arr);
                }
                arr.unshift(category.name);
                if (category.parent) {
                    getParent(category.parent, arr).then((d) => {
                        resolve(arr)
                    });
                }
                else {
                    resolve(arr)
                }
            }).catch((err) => {
                reject(err);
            })
        });
    }

    return new Promise((resolve, reject) => {
        getParent(id, []).then((path) => {
            resolve(path);
        }).catch((err) => {
            reject(err)
        })
    })
}


module.exports = mongoose.model('Category', categorySchema);