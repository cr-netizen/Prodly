const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    productName: {
      type: String,
      required: true
    },

    // Everything below is optional: a product can be saved as a draft
    // before ingredients/weight/features are filled in, and before a
    // description has been generated or written.
    ingredients: {
      type: String,
      default: ""
    },

    weight: {
      type: String,
      default: ""
    },

    features: {
      type: String,
      default: ""
    },

    tone: {
      type: String,
      default: ""
    },

    description: {
      type: String,
      default: ""
    }

  },
  {
    timestamps:true
  }
);


module.exports =
mongoose.model(
  "Product",
  productSchema
);
