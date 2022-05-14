const Router = require('express');
const ordersController = require('../controllers/ordersController');
const router = Router();

//Create a new Order
router.post('/', ordersController.createOrder);
//Retrieve all Orders
router.get('/', ordersController.getAll);

module.exports = router;
