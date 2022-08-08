const express = require('express');
const news = require('../controllers/news-controller')

const newsRouter = express.Router();

newsRouter.get("/", news.getAllNews)
newsRouter.get("/:nid", news.getOne)
newsRouter.post("/save", news.save)
newsRouter.get("/:cat", news.getByCategory)
newsRouter.post("/tags", news.getByTag)

module.exports = newsRouter;
