const getMatchWinner = (homeScore, awayScore) => {
    if(homeScore === awayScore) {
        return 0
    }else if(homeScore > awayScore){
        return 1
    }else {
        return 2
    }
};

const gamesChecker = (ticket) => {
    ticket.forEach(el => {
        let hs = el.home
        let as = el.away 

        getMatchWinner(hs, as)
    })
};

module.exports = {
    getMatchWinner
}