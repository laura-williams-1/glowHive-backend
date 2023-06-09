const express = require("express");
const products = express.Router();
const {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require("../queries/products");
const {
  checkRequest,
  checkId
} = require("../validations/checkProducts")

products.get("/", async (req, res) => {
  const allProducts = await getAllProducts();

  if (allProducts[0]) {
    res.status(200).json(allProducts);
  } else {
    res.status(500).json({ error: "Server Error" });
  }
});
products.get("/search", async (req, res) => {
  const searchTerm = `%${req.query.q}%`;
  try {
    const searchedProducts = await searchProducts(searchTerm);

    res.status(200).json(searchedProducts);
    console.log(searchedProducts);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});
products.get("/:id", checkId, async (req, res) => {
  const { id } = req.params;
  const product = await getOneProduct(id);

  if (product.id) {
    res.status(200).json(product);
  } else {
    res.status(500).json({ error: "Server Error" });
  }
});

products.post("/", checkRequest, async (req, res) => {
  const newProduct = req.body;

  try {
    const addedProduct = await createProduct(newProduct);
    res.status(202).json(addedProduct);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

products.put("/:id", checkId, checkRequest, async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedProduct = await updateProduct(id, body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

products.delete("/:id", checkId, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await deleteProduct(id);
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = products;
