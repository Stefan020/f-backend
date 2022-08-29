const mongoose = require('mongoose');

const Ticket = mongoose.model(
    'ticket', {
        games: Array({
            fid: String,
            hometeam: String,
            awayteam: String,
            bet: String,
            matchStatus: String,
            finalScore: Object,
            scoreComp:String,
            betStatus: String
        }),
        uid: String,
        isWinner: Boolean,
        date: Date,
        isTicketChecked: Boolean
    },
    'ticket'
);

const placeBet = async (data) => {
    let ticket = new Ticket(data)
    return await ticket.save()
};

const getByUserId = async (uid) => {
    let data = await Ticket.find({ uid: uid })
    return data;
};

const getOneTicket = async(tid) => {
    let data = await Ticket.findOne({_id: tid})
    return data;
} 

const update = async (tid, ticket) => {
    let data = await News.Ticket({ _id: tid }, ticket)
    return data.nModified !== 0;
};

module.exports = {
    placeBet,
    getByUserId,
    update,
    getOneTicket
}