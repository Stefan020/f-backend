var cron = require('node-cron');
const {
    getOneGame,
    updateGame
} = require('../../model/Game');
const {
    getAdminGames
} = require('../top-match-worker');


const updateGamesJob = async () => {
    cron.schedule('* */10 * * *', async () => {
        let allGames = await getAdminGames()
        let doUpdate;
        if (allGames) {

            allGames.forEach(async (el) => {
                if (el.matchStatus === 'FT') {
                    let updatedGameData = el
                    let gameToUpdate = await getOneGame(el.fid)

                    if (gameToUpdate && (
                            updatedGameData.score.home !== gameToUpdate.score.home ||
                            updatedGameData.score.away !== gameToUpdate.score.away)) {
                        doUpdate = await updateGame(el.fid, updatedGameData)
                    } else {
                        doUpdate = "Nema promeni na rezultatot"
                    }
                }
            })
        }
    })
}

module.exports = {
    updateGamesJob
}