const express = require('express');
const ticket = require('../controllers/ticket-controller');
const auth = require('../controllers/user-controller');

const ticketRouter = express.Router();

ticketRouter.post("/place-bet", auth.authorization, ticket.placeBet)
ticketRouter.get("/get-tickets-by-user/:uid", auth.authorization, ticket.getByUserId)
ticketRouter.get('/admin-games', ticket.sendGamesToAdmin)

module.exports = ticketRouter;
