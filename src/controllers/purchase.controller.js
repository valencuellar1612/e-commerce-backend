const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const ProductCart = require('../models/ProductCart');
const Image = require('../models/Image');

const getAll = catchError(async(req, res) => {
    const purchase = await Purchase.findAll({
        include: [{
            model: Product,
            include: [Image],
        }],
        where: {userId: req.user.id}
    });
    return res.json(purchase);
});

const create = catchError(async(req, res)=> {
    const productsCart = await ProductCart.findAll({
        where: {userId: req.user.id},
        attributes: ['quantity', 'userId', 'productId'],
        raw: true,
    });
    const purchases = await Purchase.bulkCreate(productsCart);
    await ProductCart.destroy({where: {userId: req.user.id}});
    return res.status(201).json(purchases);
});

module.exports = {
    getAll,
    create
}