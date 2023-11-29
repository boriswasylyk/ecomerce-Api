const { getAll, create, remove } = require('../controllers/image.controller');
const express = require('express');

const imageRouter = express.Router();

imageRouter.route('/')
    .get(getAll)
    .post( create);

imageRouter.route('/:id')
    .delete(remove);


module.exports = imageRouter;