var express = require("express");
var router = express.Router();
const orderController = require("../controllers/order");
var router = express.Router();
let {
  check_authentication,
  check_authorization,
} = require("../utils/check_auth");
let constants = require("../utils/constants");

/* GET users listing. */
router.get("/getAllOrderByUserId/:userId", async (req, res, next) => {
  try {
    let userId = req.params.userId;
    let orders = await orderController.GetAllOrder();
    CreateSuccessRes(res, orders, 200);
  } catch (error) {
    next(error);
  }
});

// Get detail order by orderId
router.get("/getOrderByOrderId/:orderId", async (req, res, next) => {
  try {
    let orderId = req.params.orderId;
    let order = await orderController.getOrderByOrderId(orderId);
    CreateSuccessRes(res, order, 200);
  } catch (error) {
    next(error);
  }
});

// Create order
router.post(
  "/createOrder",
  check_authentication,
  check_authorization(constants.USER_PERMISSION),
  async (req, res, next) => {
    try {
      let order = req.body;
      order.user = req.user._id;
      let newOrder = await orderController.createOrder(order);
      CreateSuccessRes(res, newOrder, 200);
    } catch (error) {
      next(error);
    }
  }
);


router.put(
  "/updateOrder/:orderId",
  check_authentication,
  check_authorization(constants.USER_PERMISSION),
  async (req, res, next) => {
    try {
      let orderId = req.params.orderId;
      let order = req.body;
      let updateOrder = await orderController.updateOrder(orderId, order);
      CreateSuccessRes(res, updateOrder, 200);
    } catch (error) {
      next(error);
    }
  }
);

// export the router
module.exports = router;
