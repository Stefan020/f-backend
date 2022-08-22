const mongoose = require('mongoose');

const Ticket = mongoose.model(
    'ticket',
    {
        games:Array({
            hometeam:String,
            awayteam:String,
            bet:String,
            finalScore:String
        }),
        uid:String,
        isWinner:Boolean,
        date:Date
    },
    'ticket'
);

const placeBet = async (data) => {
    let ticket = new Ticket(data)
    return await ticket.save()
};

const getByUserId = async (uid) => {
    let data = await Ticket.find({ uid:uid })
    return data;
};

module.exports = {
    placeBet,
    getByUserId
}