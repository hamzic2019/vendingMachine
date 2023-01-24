const {Schema, model, default: mongoose} = require('mongoose');


const productSchema = new Schema({
    amountAvailable: {
        type: Number,
        required: true,
        validate: (number) => {
            if(!Number.isInteger(number)) false;
        }
    },
    cost: {
        type: Number,
        required: true
    },
    productName: {
        type: String,
        trim: true,
        required: true,
        unique: true // it makes no sanse to have 2 times same product
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const Product = model('Product', productSchema);

module.exports = Product;