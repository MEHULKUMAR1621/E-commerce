const express = require('express');

const router = express.Router();
const User = require('../models/users');

router.post("/signup", (req, res, next) => {
    const user = new User({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
    });
    user
        .save()
        .then(result => {
            res.status(200).json({
                message: "User Created",
                result: result
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "Invalid authentication credentials!"
            })
        });
})

router.post("/login", (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user=>{
            if(!user){
                return res.status(401).json({
                    message: "Auth failed"
            });
        }
        fetchedUser = user;
        if(fetchedUser.password == req.body.password){
            res.status(200).json({
                userId: fetchedUser._id,
                message: "YOu are Logged in.."
            })
        }
        else{
            res.status(401).json({
                message: "Invalid Authentication credential"
            })
        }
    })
    .catch(error=>{
        res.status(401).json({
            message: "Invalid Authentication credential"
        })
    })
})

router.post("/clearCart", (req,res,next)=>{
    User.findById(req.body.id)
        .then(user=>{
            // console.log(user.cart.items);
            user.cart.items = [];
            user.save()
            .then(result => {
                res.status(200).json({
                    message: "User Created",
                    result: result
                })
            })
        })
        .catch(error=>{
            console.log(error);
        })
})


module.exports = router;