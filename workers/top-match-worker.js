const fetch = require('node-fetch');
const {  getMatchWinner} = require('./utils');
const {getOneTicket, update} = require('../model/Ticket');
const { getOne, updateUser } = require('../model/User');


const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const year = today.getFullYear();

const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${year}-${month}-${day}`

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '8935d9e334msh195ae00a70c5613p1e2cefjsnbfaf938a6951',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  }
};

/**
 * @param {object} req 
 * @param {object} res 
 * @returns all games from rest api
 */
const getAdminGames = async (req, res) => {
  let games = []
  await fetch(url, options)
    .then(res => res.json())
    .then(json =>

      json.response.forEach(element => {

        let fixture = element.fixture
        let teams = element.teams

        let game = {
          fid: fixture.id,
          time: fixture.date,
          home: teams.home.name,
          hlogo: teams.home.logo,
          away: teams.away.name,
          alogo: teams.away.logo,
          score: element.goals,
          matchStatus: fixture.status?.short
        }

        games.push(game)

      }))
    .catch(err => console.error('error:' + err));
  return games;
}

const checkTicket = async (ticket) => {
 
  let game = {}
  let gamesToCheck = []
  let gamesAfterCheck = []
  let chechedTicket
  let ticketScore = {
    played: 0,
    correct: 0
  }

  let data = ticket.games

  await data.forEach(el => {
    if (el.matchStatus === 'FT') {
        game = {
        fid: el.fid,
        hometeam: el.hometeam,
        awayteam: el.awayteam,
        finalScore: el.finalScore,
        scoreComp: getMatchWinner(el.finalScore.home, el.finalScore.home),
        bet: el.bet,
        matchStatus: el.matchStatus,
        betStatus: el.betStatus
      }

      gamesToCheck.push(game)
    }

  })
  if (gamesToCheck.length !== 9) {
    return
  }else {
    await gamesToCheck.forEach(async(el) => {
      ticketScore.played + 1
      if (el.scoreComp === el.bet) {
        ticketScore.correct + 1
        game = {
          fid: el.fid,
          hometeam: el.hometeam,
          awayteam: el.awayteam,
          finalScore: el.finalScore,
          scoreComp: getMatchWinner(el.finalScore.home, el.finalScore.home),
          bet: el.bet,
          betStatus: 'green'
        }
        gamesAfterCheck.push(game)
      } else {
        game = {
          fid: el.fid,
          hometeam: el.hometeam,
          awayteam: el.awayteam,
          finalScore: el.finalScore,
          scoreComp: getMatchWinner(el.finalScore.home, el.finalScore.home),
          bet: el.bet,
          betStatus: 'red'
      }
      gamesAfterCheck.push(game)
    }
  
    let ticketToDB = {
      games: gamesAfterCheck,
      uid: ticket.uid,
      isWinner: ticketScore.correct === 9,
      date: ticket.date,
      isTicketChecked: true
    }
  
    let userToUpdate = updateUser({_id: ticket.uid}, {
      betCount: betCount + ticketScore.played,
      correctBetCount: correctBetCount + ticketScore.correct
  })
  
    if (ticketScore.played === 9) {
      chechedTicket = await update(ticket._id, ticketToDB)
      }
    })
  }
}

module.exports = {
  getAdminGames,
  checkTicket
}
 