const express = require('express');
const router = express.Router();
//const productsService = require('../products/products'); // استيراد خدمة المنتجات
const { productsbyId } = require('../products/products');
const { updateQuantity } = require('../products/products');
let cart = [];
    
router.post('/cart', (req, res) => {
    const productId = req.body.productId;
    const quantity = req.body.quantity;

    
    const product = productsbyId(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

   
    if (!updateQuantity(productId, quantity)) {
        return res.status(400).json({ message: 'Insufficient quantity' });
    }

    
    const totalPrice = product.price * quantity;

    
    cart.push({
        id: productId,
        name: product.name,
        pricePerUnit: product.price,
        quantity: quantity,
        totalPrice: totalPrice
    });

    res.status(200).json({ message: 'Product added to cart successfully' });
});


router.get('/cart', (req, res) => {
    res.status(200).json(cart);
});

module.exports = router;