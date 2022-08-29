const express = require('express');
const storage = require('../controllers/storage-controller')

const storageRouter = express.Router();

storageRouter.post("/add-image", storage.storeFile)
storageRouter.post("/:iid", storage.getFile)

module.exports = storageRouter;
