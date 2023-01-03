const express = require('express');
const { Produto, Carrinho } = require('../src/models/models');
const router = express.Router();

router.get('/products', async(request, response) => {
  try{
    const produtos = await Produto.find({}).exec();
    return response.status(200).json({ data: produtos });
  }catch(err){
    return response.status(404).json({ data: null, message: err.message })
  }
});

router.post('/create-product', async (request, response) => {
  const product = request.body;

  if(!request.body.name){
    return response.status(400).json({ created: 'failed, no data found' })
  }

  try {
    await Produto.create(product);
    return response.status(201).json({ created: 'succeed' })
  }catch(err) {
    return response.status(500).json({ created: 'failed', message: err.message })
  }
});

router.patch('/edit-product/:id', async (request, response) => {
  const productId = request.params.id;
  const productToSave = request.body;

  try {
    const product = await Produto.findByIdAndUpdate(productId, productToSave).exec();
    console.log(product);

    return response.status(200).json({ updated: 'suceed' });
  }catch(err){
    console.log(err);
    return response.status(404).json({ updated: 'failed', message: err.message });
  }
})

router.delete('/delete-product/:id', async (request, response) => {
  const productId = request.params.id;

  try {
    await Produto.findByIdAndDelete(productId).exec();
    return response.status(202).json({ deleted: 'succeed' });
  }catch(err){
    return response.status(404).json({ deleted: 'failed', message: err.message });
  }
});

//cart routes

router.get('/cart', async (request, response) => {
  try {
    const carrinho = await Carrinho.find({}).exec();
    return response.status(200).json({ data: carrinho });
  }catch(err) {
    return response.status(500).json({ data: null, message: err.message });
  }
});

router.post('/cart', async (request, response) => {
  const cartItem = request.body;

  try {        
    const shippingPrice = 0.1 * cartItem.value;
    const totalWithShippingPrice = parseFloat(cartItem.value) + parseFloat(shippingPrice);

    const cart = await Carrinho.create({ 
      name: cartItem.name, 
      color: cartItem.color,
      quantity: 1, 
      shippingValue: shippingPrice, 
      total: cartItem.value, 
      totalWithShipping: totalWithShippingPrice
    });
    
    return response.status(201).json({ data: cart });
  }catch(err) {
    return response.status(500).json({ create: 'failed', message: err.message });
  }
});

router.patch('/cart/:id', async (request, response) => {
  const productId = request.params.id;
  const itemToSave = request.body;

  try {
    await Carrinho.findByIdAndUpdate(productId, itemToSave).exec();
    return response.status(200).json({ updated: 'suceed' })
  }catch(err) {
    return response.status(500).json({ update: 'failed', message: err.message });
  }
});

router.delete('/cart/:id', async (request, response) => {
  const productId = request.params.id;

  try {
    await Carrinho.findByIdAndDelete(productId).exec();
    return response.status(200).json({ delete: 'success' });
  }catch(err){
    return response.status(500).json({ delete: 'failed', message: err.message });
  }
})

module.exports = {
  Routes: router
}