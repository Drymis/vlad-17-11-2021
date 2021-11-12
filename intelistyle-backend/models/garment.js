const mongoose = require('mongoose');
const Image = require("./image").schema;

const garmentSchema = new mongoose.Schema(
  {
    product_id: {
      type: Number,
      unique: true,
      required: true,
    },
    stock: {
      type: Number,
      unique: false,
      required: true,
    },
    price: {
      type: Number,
      unique: false,
      required: true,
    },
    discount: {
      type: Number,
      unique: false,
      required: true,
    },
    image_urls: [{
      type: String, 
      unique: false,
      required: false,
    }],
    product_imgs_src: [{
      type: String, 
      unique: false,
      required: false,
    }],
    product_categories_mapped: [{
      type: String, 
      unique: false,
      required: false,
    }],
    product_categories: [{
      type: String, 
      unique: false,
      required: false,
    }],
    images: [{
      type: Image,
      unique: false,
      required: false
    }],
    position: [{
      type: String, 
      unique: false,
      required: false,
    }],
    product_description: {
      type: String,
      unique: false,
      required: false,
    },
    url: {
      type: String,
      unique: false,
      required: false,
    },
    source: {
      type: String,
      unique: false,
      required: false,
    },
    gender: {
      type: String,
      unique: false,
      required: false,
    },
    product_title: {
      type: String,
      unique: false,
      required: false,
    },
    brand: {
      type: String,
      unique: false,
      required: false,
    },
    currency_code: {
      type: String,
      unique: false,
      required: false,
    },
  },
  {collection: 'garment'},
  { timestamps: true },
);

// garmentSchema.index({product_title: 'text', product_description: 'text'});
 
module.exports = Garment = mongoose.model('Garment', garmentSchema);
 