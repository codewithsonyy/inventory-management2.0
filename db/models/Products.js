import mongoose, { models } from "mongoose";
import { Schema, model } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const ProductsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  slug: {
    type: String,
    required: true,
    unique: true,
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

ProductsSchema.plugin(mongooseUniqueValidator, {
  message: "product with `{PATH}` = `{VALUE}` already exists",
});

const Product = models.product || model("product", ProductsSchema);

export default Product;
