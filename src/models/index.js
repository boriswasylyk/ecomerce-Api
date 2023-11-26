const Cart = require("./Cart");
const Category = require("./Category");
const Image = require("./Image");
const Products = require("./Products");
const User = require("./User")


Category.hasMany(Products);
Products.belongsTo(Category);

Products.hasMany(Image);
Image.belongsTo(Products)

Products.hasMany(Cart)
Cart.belongsTo(Products)

User.hasMany(Cart)
Cart.belongsTo(User)