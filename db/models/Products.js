import mongoose, { models } from "mongoose";
import { Schema, model } from "mongoose";

const ProductsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  slug: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
const Product = models.product || model("product", ProductsSchema);

export default Product;
