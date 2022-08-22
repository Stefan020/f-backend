// const schedule = require('node-schedule');
// const getRule = new schedule.RecurrenceRule();
// const setRule = new schedule.RecurrenceRule();
// const getTopData = require('../fetchData/topData').getTopData;
// const setWinnings = require('../fetchData/setWinings').setWinings;
// const saveMatchesStatistics = require('../fetchData/setWinings').saveMatchesStatistics;


// getRule.hour = 9;
// getRule.minute = 0;
// getRule.tz = 'Etc/UTC';

// const gettingJob = schedule.scheduleJob(getRule, () => {
//     getTopData();
// });

// setRule.hour = 8;
// setRule.minute = 30;
// setRule.tz = 'Etc/UTC';

// const settingJob = schedule.scheduleJob(setRule, async () => {
//     await saveMatchesStatistics();
//     setWinnings();
// });
 
const fetch = require('node-fetch');

const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?date=2022-08-09'

const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '8935d9e334msh195ae00a70c5613p1e2cefjsnbfaf938a6951',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };

  const getAdminGames = async(req,res) => {
    let games = []
    await fet
    ch(url, options)
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
                    score: element.goals 
                }
                
                games.push(game)
                // console.log(games)
                
            }))
            .catch(err => console.error('error:' + err));
            return games;
}

module.exports = {
    getAdminGames
}