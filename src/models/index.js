const Cart = require("./Cart");
const Category = require("./Category");
const Image = require("./Image");
const Products = require("./Products");
const User = require("./User")
const Purchase = require("./Purchase");
const purchaseRouter = require("../routes/purchase.route");


Category.hasMany(Products);
Products.belongsTo(Category);

Products.hasMany(Image);
Image.belongsTo(Products)

Products.hasMany(Cart)
Cart.belongsTo(Products)

User.hasMany(Cart)
Cart.belongsTo(User)

Products.hasMany(Purchase)
Purchase.belongsTo(Products)

User.hasMany(Purchase)
Purchase.belongsTo(User)