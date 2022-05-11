const Router = require('express');
const router = Router();
const productController = require('../controllers/productController');
const checkRole = require('../middleware/checkRoleMiddleware');

//Create a new Product
router.post('/', checkRole('ADMIN'), productController.create);
//Retrieve all Products
router.get('/', productController.getAll);
// Retrieve a single Product with id
router.get('/:id', productController.getOne);
// Update a Product with id
router.put('/:id', checkRole('ADMIN'), productController.updateOne);
// Delete a Product with id
router.delete('/:id', checkRole('ADMIN'), productController.deleteOne);
// Create a new Product
router.delete('/', checkRole('ADMIN'), productController.deleteAll);

module.exports = router;
