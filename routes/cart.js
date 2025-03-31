var express = require("express");
var router = express.Router();
let cartController = require("../controllers/cart");
let { CreateSuccessRes } = require("../utils/responseHandler");

// Get All Cart
router.get("/", async (req, res, next) => {
  try {
    let carts = await cartController.GetAllCart();
    CreateSuccessRes(res, carts, 200);
  } catch (error) {
    next(error);
  }
});

// Export the router
module.exports = router;
