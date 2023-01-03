const mongoose = require('mongoose');
const { ProductSchema, CartSchema } = require('../schemas/schemas');

const { BD_LOGIN, BD_PASSWORD, BD_CLUSTER_URL } = process.env;
mongoose.connect(`mongodb+srv://${BD_LOGIN}:${BD_PASSWORD}@${BD_CLUSTER_URL}/?retryWrites=true&w=majority`);

const Produto = mongoose.model('Produto', ProductSchema);

const Carrinho = mongoose.model('Carrinho', CartSchema);

module.exports = {
  Produto: Produto,
  Carrinho: Carrinho
}