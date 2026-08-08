const express = require("express");

const router = express.Router();

const requireAuth = require("../middleware/authMiddleware");

const {
  getProducts,
  searchProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

// ---------- PUBLIC ROUTES ----------

router.get(
  "/",
  requireAuth,
  getProducts
);

router.get(
  "/search",
  requireAuth,
  searchProducts
);


router.get(
  "/:id",
  requireAuth,
  getProduct
);

// ---------- PROTECTED ROUTES ----------

router.post(
  "/",
  requireAuth,
  createProduct
);

router.put(
  "/:id",
  requireAuth,
  updateProduct
);

router.delete(
  "/:id",
  requireAuth,
  deleteProduct
);

module.exports = router;