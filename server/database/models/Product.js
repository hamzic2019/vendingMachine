const {Schema, model} = require('mongoose');


const productSchema = new Schema({
    amountAvailable: {
        type: Number,
        required: true,
        validate: (number) => {
            if(!Number.isInteger(number)) false;
        }
    }
});

const Product = model('Product', productSchema);

module.exports = Product;