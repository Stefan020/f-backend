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
        time: String,
    },
    'games'
);

const addGamesToBet = async (data) => {
    let  game = new Game(data)
    return await game.save()
};

const getGamesToBet = async () => {
    let game = await Game.find({}).sort({time: -1}).limit(9)
    return game;
}

module.exports = {
    addGamesToBet,
    getGamesToBet
}