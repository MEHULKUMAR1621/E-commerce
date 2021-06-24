const express = require('express');

const router = express.Router();
const User = require('../models/users');
const Order = require('../models/orders');

router.get('/save', (req, res, next) => {
    const value = [];
    User.findById(req.query.id)
        .then(user => {
            user.populate('cart.items.productId')
                .execPopulate()
                .then(user => {
                    const products = user.cart.items.map(i => {
                        return { quantity: i.quantity, product: { ...i.productId._doc } };
                    });
                    const order = new Order({
                        products: products,
                        userId: '5f3a5a2d0bf4ec39003a63bd',
                    })
                    order.save()
                        .then(result => {
                            console.log(result);
                        }).catch(err => {
                            console.log(err);
                        })
                });
        })
})

router.get('/view', (req, res, next) => {
    console.log(req.query.id);
    Order.find({ 'userId': req.query.id })
        .then(order => {
            console.log(order);
            res.status(200).json({
                message: "Orders",
                value: order
            })
        })
})

module.exports = router;
