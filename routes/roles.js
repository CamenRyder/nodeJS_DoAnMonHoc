var express = require("express");
var router = express.Router();
var roleController = require("../controllers/roles");
let { CreateSuccessRes } = require("../utils/responseHandler");
let {
  check_authentication,
  check_authorization,
} = require("../utils/check_auth");
let constants = require("../utils/constants");
/* GET users listing. */
router.get(
  "/",
  check_authentication,
  check_authorization(constants.ADMIN_PERMISSION),
  async function (req, res, next) {
    let roles = await roleController.getAllRoles();
    CreateSuccessRes(res, roles, 200);
  }
);

router.post(
  "/",
  check_authentication,
  check_authorization(constants.ADMIN_PERMISSION),
  async function (req, res, next) {
    try {
      let newRole = await roleController.createARole(req.body.name);
      CreateSuccessRes(res, newRole, 200);
    } catch (error) {
      
      next(error);
    }
  }
);

router.get(
  "/:id",
  check_authentication,
  check_authorization(constants.ADMIN_PERMISSION),
  async function (req, res, next) {
    try {
      let role = await roleController.getARole(req.params.id);
      CreateSuccessRes(res, role, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  check_authentication,
  check_authorization(constants.ADMIN_PERMISSION),
  async function (req, res, next) {
    try {
      let role = await roleController.deleteARole(req.params.id);
      CreateSuccessRes(res, role, 200);
    } catch (error) {
      next(error);
    }
  }
);
router.put(
  "/:id",
  check_authentication,
  check_authorization(constants.ADMIN_PERMISSION),
  async function (req, res, next) {
    try {
      await roleController.updateARole(req.params.id, req.body.name);
      CreateSuccessRes(res, "Cập nhật thành công", 200);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
