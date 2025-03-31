var express = require("express");
var router = express.Router();
let paymentController = require("../controllers/payment");
var router = express.Router();
let { CreateSuccessRes, CreateErrorRes } = require("../utils/responseHandler");
let {
  check_authentication,
  check_authorization,
} = require("../utils/check_auth");
let constants = require("../utils/constants");

// GET payment listing.
router.get(
  "/",
  check_authentication,
  check_authorization(constants.USER_PERMISSION),
  async (req, res, next) => {
    try {
      let payments = await paymentController.getAllPayment();
      CreateSuccessRes(res, payments, 200);
    } catch (error) {
      next(error);
    }
  }
);

// GET payment by ID
router.get(
  "/:id",
  check_authentication,
  check_authorization(constants.USER_PERMISSION),
  async (req, res, next) => {
    try {
      let payment = await paymentController.getPaymentById(req.params.id);
      if (!payment) {
        return CreateErrorRes(res, "Payment not found", 404);
      }
      CreateSuccessRes(res, payment, 200);
    } catch (error) {
      next(error);
    }
  }
);
// POST create payment
router.post(
  "/",
  check_authentication,
  check_authorization(constants.MOD_PERMISSION),
  async (req, res, next) => {
    try {
      let payment = await paymentController.createPayment(req.body.tenLoai);
      CreateSuccessRes(res, payment, 201);
    } catch (error) {
      next(error);
    }
  }
);
// PUT update payment
router.put(
  "/:id",
  check_authentication,
  check_authorization(constants.MOD_PERMISSION),
  async (req, res, next) => {
    try {
      let payment = await paymentController.updatePayment(
        req.params.id,
        req.body.tenLoai
      );
      if (!payment) {
        return CreateErrorRes(res, "Payment not found", 404);
      }
      CreateSuccessRes(res, payment, 200);
    } catch (error) {
      next(error);
    }
  }
);
// DELETE payment
router.delete(
  "/:id",
  check_authentication,
  check_authorization(constants.ADMIN_PERMISSION),
  async (req, res, next) => {
    try {
      let payment = await paymentController.deletePayment(req.params.id);
      if (!payment) {
        return CreateErrorRes(res, "Payment not found", 404);
      }
      CreateSuccessRes(res, payment, 200);
    } catch (error) {
      next(error);
    }
  }
);

// export the router
module.exports = router;
