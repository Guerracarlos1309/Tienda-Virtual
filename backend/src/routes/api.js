const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Auth
router.post('/auth/login', authController.login);

// Products
router.get('/products', productController.getProducts);
router.post('/products', authMiddleware, adminMiddleware, productController.createProduct);
router.put('/products/:id', authMiddleware, adminMiddleware, productController.updateProduct);
router.delete('/products/:id', authMiddleware, adminMiddleware, productController.deleteProduct);

// Orders & Checkout
router.post('/checkout', orderController.checkout);
router.get('/orders', authMiddleware, adminMiddleware, orderController.getOrders);
router.get('/invoices', authMiddleware, adminMiddleware, orderController.getInvoices);

module.exports = router;
