const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.set('strictQuery', false)

const ImageSchema = new Schema({
  type: String,
  data: Buffer
})

const ProductSchema = new Schema({
  name:  String,
  brand: String,
  value: String,
  color: [String],
  registerDate: Date,
  image: ImageSchema
});

const CartSchema = new Schema({
  name: String,
  color: String,
  total: String,
  quantity: String,
  shippingValue: String,
  totalWithShipping: String
})

module.exports = {
  ProductSchema: ProductSchema,
  CartSchema: CartSchema
}