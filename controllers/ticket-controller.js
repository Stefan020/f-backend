const ticketModel = require('../model/Ticket');
const gamesModel = require('../model/Game');
const {getAdminGames} = require('../workers/top-match-worker')


const sendGamesToAdmin = async (req, res) => {
    let adminGames = await getAdminGames()
        if(adminGames){
            return res.status(200).send(adminGames)
            } else {
                return res.status(400).send('nema')
            }
}

const addGamesToBet = async(req, res) => {
    const fixture = req.body 
   
    let game = {
        fid:fixture.fid,
        home: fixture.home,
        hlogo: fixture.hlogo,
        away: fixture.away,
        alogo: fixture.alogo,
        score: fixture.score,
        scoreComp: null,
        bet: null,
        betStatus: null,
        time: fixture.time,
        matchStatus: fixture.matchStatus,
        _deleted: false
    }

    try {
        await gamesModel.addGamesToBet(game)
    } catch (error) {
        console.log(error)
        return res.status(400).send("Nemoze da se dodade za oblozuvanje")
    }
    return res.status(200).send("Успешно додаден натпревар!")
}

const placeBet = async (req, res) => {
    const {games} = req.body

    let ticket = {
        games,
        uid:req.user.uid,
        date: new Date,
        isWinner: false,
        isTicketChecked: false
    }

    try {
        await ticketModel.placeBet(ticket)
    } catch (error) {
        console.log(error)
                return res.status(400).send("Neuspesno oblozuvanje") 
    }

    return res.status(200).json({ ticket })
   
}

const getByUserId = async (req,res) => {
    try {
        let data = await ticketModel.getByUserId(req.user.uid)
        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
}

const getGamesToBet = async(req, res) => {
    try {
        let data = await gamesModel.getGamesToBet()
        return res.status(200).send(data)
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
}

const getOneTicket = async(req, res) => {
    try {
        let data = await ticketModel.getOneTicket(req.params.tid)
        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
}

const checkIsTicketWinner = async(req, res) => {
    try {
        let tickets = await ticketModel.getByUserId(req.user.uid)
        let checkedTicket = tickets.forEach((ticket) => {
            if(ticket.isTicketChecked !== true){
                checkTicket(ticket)
            }else{
                return res.status(201).send("Нема нова проверка")
            }
        })
        return res.status(200).send(checkedTicket)
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    sendGamesToAdmin,
    placeBet,
    getByUserId,
    addGamesToBet,
    getGamesToBet,
    getOneTicket,
    checkIsTicketWinner
}