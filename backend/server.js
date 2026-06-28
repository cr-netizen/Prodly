const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory data
let products = [
  {
    id: 1,
    productName: "Apple Jam",
    ingredients: "Apple, Sugar",
    weight: "500g",
    features: "No preservatives",
    tone: "Premium",
    description:
      "Premium apple jam made from fresh apples."
  },
  {
    id: 2,
    productName: "Mixed Pickle",
    ingredients: "Mango, Lemon, Spices",
    weight: "250g",
    features: "Traditional recipe",
    tone: "Traditional",
    description:
      "Authentic mixed pickle prepared using traditional methods."
  }
];

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Prodly Backend API!"
  });
});

// GET ALL PRODUCTS
app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});

// SEARCH PRODUCTS
app.get("/api/products/search", (req, res) => {

  const q = req.query.q;

  const result = products.filter((product) =>
    product.productName
      .toLowerCase()
      .includes(q.toLowerCase())
  );

  res.status(200).json(result);
});

// GET SINGLE PRODUCT
app.get("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find(
    (p) => p.id === id
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.status(200).json(product);
});

// CREATE PRODUCT
app.post("/api/products", (req, res) => {

  const newProduct = {
    id: products.length + 1,
    ...req.body
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

// UPDATE PRODUCT
app.put("/api/products/:id", (req, res) => {

  const id = Number(req.params.id);

  const index = products.findIndex(
    (p) => p.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  products[index] = {
    ...products[index],
    ...req.body
  };

  res.status(200).json(products[index]);
});

// DELETE PRODUCT
app.delete("/api/products/:id", (req, res) => {

  const id = Number(req.params.id);

  const index = products.findIndex(
    (p) => p.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  products.splice(index, 1);

  res.sendStatus(204);
});



// Error Middleware
app.use((err, req, res, next) => {

  console.error(err);

  res.status(500).json({
    message: "Internal Server Error"
  });

});

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});