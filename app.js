const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user-routes');
const newsRouter = require('./routes/news-routes');
const ticketRouter = require('./routes/ticket-routes');
const config = require('./config.json');
const {expressjwt: jwt} = require('express-jwt');
const bodyParser = require('body-parser');
const {updateGamesJob} = require('./workers/cron/update-games');
const storageRouter = require('./routes/storage-routes');

const app = express();
app.use(bodyParser.json());

app.use(express.json())

//uncomment to start checking games
// updateGamesJob()

app.use(jwt({
  secret: config.security.access_token_secret,
  algorithms: ['HS256']
}).unless({
  path: [
    {
      url: /\/api\/users/
    },
    {
      url: /\/api\/news/
    },
    {
      url: /\/api\/news/
    }
  ]
}));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Bad JWT');
  }
});

app.use("/api/v1.0.0/users", userRouter)
app.use("/api/v1.0.0/news", newsRouter)
app.use("/api/v1.0.0/tipster", ticketRouter)
app.use("/api/v1.0.0/storage", storageRouter)

mongoose.connect(
    `mongodb+srv://stefan-galeb:stefangaleb2509@clusterfmk.4w2mqu7.mongodb.net/?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
  ).then(() => app.listen(8000))
  .then(() => console.log("Connected to database and listening to locallhost:8000"))
  .catch((err) => console.log(err))