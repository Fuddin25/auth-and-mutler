const express = require("express");

const router = express.Router();

// Controller
const {
  addUsers,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const { getProduct, addProduct } = require("../controllers/product");
const {
  getTransactions,
  addTransaction,
} = require("../controllers/transaction");
const { getCategories, addCategory } = require("../controllers/category");
const { register, login, checkAuth } = require("../controllers/auth");

// Middleware
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");

// Route
router.post("/user", addUsers);
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

router.get("/products", getProduct);
router.post("/product", auth, uploadFile("image"), addProduct);

router.get("/transactions", getTransactions);
router.post("/transaction", auth, addTransaction);

router.get("/categories", getCategories);
router.post("/category", addCategory);

router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);

module.exports = router;
