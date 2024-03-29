const mongoose = require('mongoose');

const User = mongoose.model(
    'users',
    {
        firstName:String,
        lastName:String,
        betCount:Number,
        correctBetCount:Number,
        username:String,
        email:String,
        isAdmin:Boolean,
        password:String,
        idDeleted:Boolean
    },
    'users'
);

const save = async (userData) => {
    let user = new User(userData)
    let data = await user.save()
    return data;
};

const getOneByEmail = async (email) => {
    let data = await User.findOne({ email });
    return data;
};

const getOne = async (uid) => {
    let data = await User.findOne({_id:uid});
    return data;
};


const getOneForLogin = async (email) => {
    let data = await User.findOne({ email: email, isDeleted: false });
    return data;
};

const updateUser = async(uid, userData) => {
    let data = await User.updateOne({_id: uid}, userData);
    return data.nModified !== 0;
}

module.exports = {
    save,
    getOne,
    getOneByEmail,
    getOneForLogin,
    updateUser
};
