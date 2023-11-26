const express = require('express');
const userRouter = require('./user.reouter');
const categoryRouter = require('./category.router');
const productsRouter = require('./products.router');
const imageRouter = require('./image.router');
const purchaseRouter = require('./purchase.route');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', userRouter)

router.use('/categories', categoryRouter)


router.use('/products',productsRouter)

router.use('/image', imageRouter)

router.use('/cart', categoryRouter)
router.use('/purchase', purchaseRouter)

module.exports = router;