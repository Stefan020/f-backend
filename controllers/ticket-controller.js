const ticketModel = require('../model/Ticket');
const {getAdminGames} = require('../workers/top-match-worker')


const sendGamesToAdmin = async (req, res) => {
    let adminGames = await getAdminGames()
        if(adminGames){
            return res.status(200).send(adminGames)
            } else {
                return res.status(400).send('nema')
            }
}

const placeBet = async (req, res) => {
    const {games} = req.body

    let ticket = {
        games,
        uid:req.user.uid,
        date: new Date,
        isWinner: false
    }

    try {
        await ticketModel.placeBet(ticket)
        console.log(req.user)
    } catch (error) {
        console.log(error)
                return res.status(400).send("Neuspesno oblozuvanje") 
    }

    return res.status(200).json({ ticket })
   
}

// const checkIfTicketWins = (data, ticket) => {
//     let forReturn = true;
//     ticket.bet.forEach((match) => {
//         if (!data[match.matchId] || (data[match.matchId] !== match.bet)) {
//             forReturn = false;
//             return forReturn
//         }
//     })
//     return forReturn;
// }

const getByUserId = async (req,res) => {
    try {
        let data = await ticketModel.getByUserId(req.user.uid)
        return res.status(200).send({data});
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    sendGamesToAdmin,
    placeBet,
    getByUserId
}