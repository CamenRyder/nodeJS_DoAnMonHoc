var express = require("express");
var router = express.Router();
let cartController = require("../controllers/cart");
let { CreateSuccessRes } = require("../utils/responseHandler");
let constants = require("../utils/constants");
let {
  check_authentication,
  check_authorization,
} = require("../utils/check_auth");
// Get All Cart by UserId
router.get(
  "/",
  check_authentication,
  check_authorization(constants.USER_PERMISSION),
  async (req, res, next) => {
    try {
      const user = req.user;
      // get data by query
      let carts = await cartController.getAllCartByUserId(user._id);
      CreateSuccessRes(res, carts, 200);
    } catch (error) {
      next(error);
    }
  }
);

// Create Cart
router.post(
  "/",
  check_authentication,
  check_authorization(constants.USER_PERMISSION),
  async (req, res, next) => {
    try {
      const user = req.user;
      // get data by query
      let cart = await cartController.createCart({ userId: user._id });
      CreateSuccessRes(res, cart, 200);
    } catch (error) {
      next(error);
    }
  }
);

// Delete Cart
router.delete(
  "/:id",
  check_authentication,
  check_authorization(constants.USER_PERMISSION),
  async (req, res, next) => {
    try {
      let cart = await cartController.deleteCart(req.params.id);
      CreateSuccessRes(res, cart, 200);
    } catch (error) {
      next(error);
    }
  }
);

// Update Cart
router.put(
  "/AutoUpdate/:id",
  check_authentication,
  check_authorization(constants.USER_PERMISSION),
  async (req, res, next) => {
    try {
      let cart = await cartController.autoUpdateCart(req.params.id);
      CreateSuccessRes(res, cart, 200);
    } catch (error) {
      next(error);
    }
  }
);

// Export the router
module.exports = router;
