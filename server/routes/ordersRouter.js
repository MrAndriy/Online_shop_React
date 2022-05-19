const Router = require('express');
const ordersController = require('../controllers/ordersController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');
const router = Router();

//Create a new Order
router.post('/', ordersController.createOrder);
//Retrieve owner all Orders
router.get('/', authMiddleware, ordersController.getAll);
//Retrieve one by id
router.get('/one/:id', authMiddleware, ordersController.getOne);
//Retrieve all Orders to Admin
router.get('/all', checkRole('ADMIN'), ordersController.getAllAdminPage);

module.exports = router;
