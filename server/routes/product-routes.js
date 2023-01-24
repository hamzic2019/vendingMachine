const express = require('express');
const Product = require('./../database/models/Product');
const router = express.Router();
const auth = require('./../middleware/auth');

router.get('/', async(req, res) => {
    try {
        const products = await Product.find();

        res.status(200).send({products});
    }catch(e) {
        // Send a 400 response with the error message if an error is caught
        res.status(400).send({e});
    }
});

router.post('/',auth ,async(req, res) => {
    try {
        if(req.error) throw 'You are not logged in!';

        const options = Object.keys(req.body);
        const allowed = ["productName", "cost", "amountAvailable"];
        const isValid = options.every((opt) => allowed.includes(opt));

        if(!isValid) throw 'You are not allowed to do that!';
        
        const product = new Product({
            sellerId: req.user._id,
            productName: req.body.productName,
            cost: req.body.cost,
            amountAvailable: req.body.amountAvailable
        });

        await product.save();

        res.status(200).send({product});
    }catch(e) {
        // Send a 400 response with the error message if an error is caught
        res.status(400).send({e});
    }
});

router.put('/:id',auth , async(req, res) => {
    try {
        if(req.error) throw 'You are not logged in!';

        const id = req.params.id;
        const options = Object.keys(req.body);
        const allowed = ["productName", "cost", "amountAvailable"];
        const isValid = options.every((opt) => allowed.includes(opt));

        if(!isValid) throw 'You can not edit that!';

        const product = await Product.findById(id);

         options.forEach((option) => {
            product[option] = req.body[option] 
         });

         await product.save();
        

        res.status(200).send({product});
    }catch(e) {
        // Send a 400 response with the error message if an error is caught
        res.status(400).send({e});
    }
});



module.exports = router;