const express=require('express') ;
const mongoose=require('mongoose') ;
const userRouter=require('./routes/user-routes') ;
const newsRouter=require('./routes/news-routes') ;
// import  from ''
// import userRouter from './routes/user-routes';
// import newsRouter from './routes/news-routes';

const app = express();

app.use(express.json())

app.use("/api/users", userRouter)
app.use("/api/news", newsRouter)

mongoose.connect(
    `mongodb+srv://stefan-galeb:stefangaleb2509@clusterfmk.4w2mqu7.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology:true
  },
    ).then(() => app.listen(8000))
    .then(() => console.log("Connected to database and listening to locallhost:8000"))
    .catch((err) => console.log(err))
