const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Auth
router.post('/auth/login', authController.login);

// Categories
router.get('/categories', productController.getCategories);
router.post('/categories', authMiddleware, adminMiddleware, productController.createCategory);
router.put('/categories/:id', authMiddleware, adminMiddleware, productController.updateCategory);
router.delete('/categories/:id', authMiddleware, adminMiddleware, productController.deleteCategory);

// Product Types
router.get('/types', productController.getProductTypes);
router.post('/types', authMiddleware, adminMiddleware, productController.createProductType);
router.put('/types/:id', authMiddleware, adminMiddleware, productController.updateProductType);
router.delete('/types/:id', authMiddleware, adminMiddleware, productController.deleteProductType);

// Products
router.get('/products', productController.getProducts);
router.post('/products', authMiddleware, adminMiddleware, productController.createProduct);
router.put('/products/:id', authMiddleware, adminMiddleware, productController.updateProduct);
router.delete('/products/:id', authMiddleware, adminMiddleware, productController.deleteProduct);

// Orders & Checkout
router.post('/checkout', orderController.checkout);
router.get('/orders', authMiddleware, adminMiddleware, orderController.getOrders);
router.put('/orders/:id/status', authMiddleware, adminMiddleware, orderController.updateStatus);
router.get('/invoices', authMiddleware, adminMiddleware, orderController.getInvoices);

module.exports = router;
