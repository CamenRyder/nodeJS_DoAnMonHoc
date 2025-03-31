var express = require("express");
var router = express.Router();
let orderStatusController = require("../controllers/orderStatus");
var router = express.Router();
let {
  check_authentication,
  check_authorization,
} = require("../utils/check_auth");
let { CreateSuccessRes } = require("../utils/responseHandler");
let constants = require("../utils/constants");

router.get(
  "/",
  check_authentication,
  check_authorization(constants.USER_PERMISSION),
  async (req, res, next) => {
    try {
      let ordersStatus = await orderStatusController.getAllOrderStatus();
      CreateSuccessRes(res, ordersStatus, 200);
    } catch (error) {
      next(error);
    }
  }
);

// create orderStatus
router.post(
  "/",
  check_authentication,
  check_authorization(constants.ADMIN_PERMISSION),
  async (req, res, next) => {
    try {
      let orderStatus = await orderStatusController.createOrderStatus(req.body);
      CreateSuccessRes(res, orderStatus, 201);
    } catch (error) {
      next(error);
    }
  }
);

// update orderStatus
router.put(
  "/:id",
  check_authentication,
  check_authorization(constants.ADMIN_PERMISSION),
  async (req, res, next) => {
    try {
      let orderStatus = await orderStatusController.updateOrderStatus(
        req.params.id,
        req.body
      );
      CreateSuccessRes(res, orderStatus, 200);
    } catch (error) {
      next(error);
    }
  }
);

// delete orderStatus
router.delete(
  "/:id",
  check_authentication,
  check_authorization(constants.ADMIN_PERMISSION),
  async (req, res, next) => {
    try {
      let orderStatus = await orderStatusController.deleteOrderStatus(
        req.params.id
      );
      CreateSuccessRes(res, orderStatus, 200);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
