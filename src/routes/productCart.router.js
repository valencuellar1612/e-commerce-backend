const { getAll, create, getOne, remove, update } = require('../controllers/productCart.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const productCartRouter = express.Router();

productCartRouter.route('/cart')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

productCartRouter.route('/cart/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = productCartRouter;