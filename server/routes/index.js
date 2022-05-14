const { Router } = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const orderRouter = require('./ordersRouter');

router.use('/user', userRouter);
router.use('/products', productRouter);
router.use('/orders', orderRouter);

module.exports = router;
