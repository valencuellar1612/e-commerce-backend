const { getAll, create } = require('../controllers/purchase.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT')

const purchaseRouter = express.Router();

purchaseRouter.route('/purchases')
    .get(verifyJWT,getAll)
    .post(verifyJWT, create)

module.exports = purchaseRouter;