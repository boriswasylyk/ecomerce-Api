const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id;
    const purchases = await Purchase.findAll({where: {userId: userId}})
    return res.json( purchases)
});

const create = catchError(async(req, res) => {
    const cart = await Cart.findAll({
        where : {userId: req.user.id},
        attributes: ['userUd', 'productId', 'quantity'],
        raw:true,
    });
    await Purchase.bulkCreate(cart);

    return res.json( cart)
});

module.exports = {
    getAll,
    create,
}