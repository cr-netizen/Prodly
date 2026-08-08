const Product = require("../models/Product");

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products =
await Product.find({
  user:req.user.id
});

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// SEARCH PRODUCTS
const searchProducts = async (req, res) => {
  try {
    const q = req.query.q;

    const products = await Product.find({
      productName: {
        $regex: q,
        $options: "i"
      }
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET SINGLE PRODUCT
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const product =
await Product.create({

  ...req.body,

  user:req.user.id

});

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {

  try {

    const product =
      await Product.findOneAndUpdate(

        {
          _id: req.params.id,
          user: req.user.id
        },

        req.body,

        {
          new:true
        }

      );


    if(!product){

      return res.status(404).json({

        message:
          "Product not found."

      });

    }


    res.status(200).json(product);


  }

  catch(error){

    res.status(500).json({

      message:
        error.message

    });

  }

};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {

  try {


    const product =
      await Product.findOneAndDelete({

        _id:req.params.id,

        user:req.user.id

      });



    if(!product){

      return res.status(404).json({

        message:
          "Product not found."

      });

    }


    res.sendStatus(204);


  }

  catch(error){

    res.status(500).json({

      message:
        error.message

    });

  }

};

module.exports = {
  getProducts,
  searchProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};