const mongoose = require('mongoose');

const userSchema = require('./schemas/user');
const orderSchema = require('./schemas/order');
const dogSchema = require('./schemas/dog');
const productSchema = require('./schemas/product');
const suggestionSchema = require('./schemas/suggestion');
const categorySchema = require('./schemas/category');
const addressSchema = require('./schemas/address');

exports.User = mongoose.model('User', userSchema);
exports.Order = mongoose.model('Order', orderSchema);
exports.Dog = mongoose.model('Dog', dogSchema);
exports.Product = mongoose.model('Product', productSchema);
exports.Suggestion = mongoose.model('Suggestion', suggestionSchema);
exports.Category = mongoose.model('Category', categorySchema);
exports.Address = mongoose.model('Address', addressSchema);
