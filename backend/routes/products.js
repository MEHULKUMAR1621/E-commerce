const express = require('express');

const router = express.Router();

const Product = require('../models/product');
const User = require('../models/users');
// const Order = require('../models/orders');

router.get('/',(req,res,next)=>{
    const productQuery = Product.find()
    productQuery
        .then(products=>{
            fetchedProducts = products;
            return Product.countDocuments();
        })
        .then(count => {
            res.status(200).json({
                message: "Product Fetched successfully!",
                products: fetchedProducts,
                maxProducts: count
            });
        })
        .catch(error=>{
            res.status(500).json({
                message: "Error While fetching.."
            })
        })
});

router.get('/category',(req,res,next)=>{
    console.log(req.query.category);
    const productQuery = Product.find({'category': req.query.category})
    productQuery
        .then(products=>{
            console.log(products);
            fetchedProducts = products;
            return Product.countDocuments();
        })
        .then(count => {
            res.status(200).json({
                message: "Product Fetched successfully!",
                products: fetchedProducts,
                maxProducts: count
            });
        })
        .catch(error=>{
            console.log(error);
            res.status(500).json({
                message: "Error While fetching.."
            })
        })
});

router.post('/create',(req,res,next)=>{
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        imageUrl: req.body.imageUrl,
    });
    product.save()
        .then(product=>{
            res.status(200).json({
                message: "Product Created",
                product: product
            })
        })
        .catch(error=>{
            console.log(error);
            res.status(500).json({
                message: "Cannot Store the product",
            })
        })
})

router.get('/add-cart', (req,res,next)=>{
    const userId = req.query.id;
    const productId = req.query.pid;
    User.findById(userId)
        .then(result=>{
            user = result
            return result;
        })
    Product.findById(productId)
        .then(product=>{
            product
            return user.addToCart(product);
        })
        .then(out=>{
            console.log(out);
            res.status(200).json({
                message: "Product Added to Cart",
            })
        })
});

router.get('/view-cart',(req,res,next)=>{
    const userId = req.query.id;
    User.findById(userId)
        .then(user=>{
            console.log(user);
            user.populate('cart.items.productId')
            .execPopulate()
            .then(user=>{
                console.log(user.cart.items);
                res.status(200).json({
                    message: "Cart View",
                    products: user.cart.items, 
                })
            })
        })
        
});

router.get('/increament',(req,res,next)=>{
    const userId = req.query.id;
    console.log(userId);
    User.findById(userId)
        .then(result=>{
            console.log(result);
            user=result;
            return result;
        })
    Product.findById(req.query.pid)
        .then(product=>{
            console.log(product);
            return user.increament(product);
        })
        .then(result=>{
            console.log(result);
            res.status(200).json({
                product : result,
            })
        })
})

router.get('/decreament',(req,res,next)=>{
    const userId = req.query.id;
    console.log(userId);
    User.findById(userId)
        .then(result=>{
            console.log(result);
            user=result;
            return result;
        })
    Product.findById(req.query.pid)
        .then(product=>{
            console.log(product);
            return user.decreament(product);
        })
        .then(result=>{
            console.log(result);
            res.status(200).json({
                product : result,
            })
        })
})

router.post('/RemoveCart',(req,res,next)=>{
    const userId = req.body.id;
    console.log(req.body.pid);
    User.findById(userId)
        .then(result=>{
            user = result
            return user.deletecart(req.body.pid);
        })
        .then(result=>{
            res.status(200).json({
                product: result
            })
        })
})

// router.get('/order',(req,res,next)=>{
//     const userId = req.query.id;
//     let totalPrice = 0;
//     User.findById(userId)
//         .then(result=>{
//             result
//             .populate('cart.items.productId')
//             .execPopulate()
//             .then(user=>{
//               const products = user.cart.items.map(i => {
//                 return { quantity: i.quantity, product: { ...i.productId._doc } };
//             });
//             console.log(products);
//             for(var i=0;i<products.length;i++){
//                 price = products[i].product.price*products[i].quantity
//                 totalPrice = totalPrice + price;
//             }
//             res.status(200).json({
//                 result: totalPrice,
//             })
//         })

//     })

// })

module.exports = router;