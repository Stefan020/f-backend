const mongoose = require('mongoose');

const News = mongoose.model(
    'news',
    {
        title:String,
        category:String,
        tags:Array,
        content:String,
        images:String,
        pubDate:Date,
        _deleted:Boolean
    },
    'news'
);

const save = async (data) => {
    let news = new News(data)
    return await news.save()
};

const getAll = async () => {
    let news = await News.find({})
    return news;
};

const getByPubDate = async() => {
    let data = await News.find({ _deleted:false}).sort({pubDate:-1}).limit(5)
    return data;
};

const getOne = async (nid) => {
    let data = await News.findOne({ _id:nid })
    return data;
};

const getByCategory = async (cat) => {
    let data = await News.find({ category:cat, _deleted:false })
    return data; 
};

const getByTags = async (tag) => {
    let data = await News.find({tags:tag})
    return data;
};

const update = async (rid, recipeData) => {
        let data = await News.updateOne({_id: rid}, recipeData)
        return data.nModified !== 0;
};


const remove = async (rid) => {
    let data = await News.updateOne({ _id: rid}, {_deleted: true});
    return data.nModified !== 0;
};

module.exports = {
    save,
    getAll,
    getOne,
    getByCategory,
    getByTags,
    getByPubDate,
    remove,
    update
};