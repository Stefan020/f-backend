const express = require('express');
const ticket = require('../controllers/ticket-controller');
const auth = require('../controllers/user-controller');

const ticketRouter = express.Router();

ticketRouter.post("/place-bet", ticket.placeBet)
ticketRouter.get("/get-tickets-by-user/:uid", auth.authorization, ticket.getByUserId)
ticketRouter.get('/admin-games', ticket.sendGamesToAdmin)
ticketRouter.post('/admin/add-games-to-bet', ticket.addGamesToBet)
ticketRouter.get('/games-to-bet', ticket.getGamesToBet)
ticketRouter.get('/get-ticket/:tid', ticket.getOneTicket) 
ticketRouter.get('/check-ticket-wins', ticket.checkIsTicketWinner)

module.exports = ticketRouter;
