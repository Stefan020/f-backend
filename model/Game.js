const mongoose = require('mongoose');

const Game = mongoose.model(
    'games',
    {
        fid: String,
        home: String,
        hlogo: String,
        away: String,
        alogo: String,   
        score: Object, 
        time: Date,
        betStatus: String,
        matchStatus:String,
        _deleted: Boolean
    },
    'games'
);

const addGamesToBet = async (data) => {
    let  game = new Game(data)
    return await game.save()
};

const getGamesToBet = async () => {
    let game = await Game.find({_deleted: false}).sort({time: -1}).limit(9)
    return game;
} 

const getOneGame = async(fid) => {
    let data = await Game.findOne({fid: fid})
    return data;
}

const updateGame = async (fid, gameData) => {
    let data = await Game.updateOne({fid: fid}, gameData)
    return data.nModified !== 0;
}

module.exports = {
    addGamesToBet,
    getGamesToBet,
    getOneGame,
    updateGame 
}