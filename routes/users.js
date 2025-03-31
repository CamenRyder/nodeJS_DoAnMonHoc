var express = require("express");
var router = express.Router();
let userController = require("../controllers/users");
let {
  check_authentication,
  check_authorization,
} = require("../utils/check_auth");
let { CreateSuccessRes } = require("../utils/responseHandler");
let constants = require("../utils/constants");
const {upload} = require("../utils/upload_file");
/* GET users listing. */
router.get(
  "/",
  check_authentication,
  check_authorization(constants.USER_PERMISSION),
  async function (req, res, next) {
    try {
      let users = await userController.getAllUsers();
      CreateSuccessRes(res, users, 200);
    } catch (error) {
      next(error);
    }
  }
);
// upload image
router.post(
  "/upload/:id",
  check_authentication,
  check_authorization(constants.USER_PERMISSION),
  upload.single("file"),
  async function (req, res, next) {
    try {
      if (!req.file) {
        throw new Error("k co file");
      } else {
        let user = await userController.UpdateAnUser(req.params.id, {
          avatarUrl:  "/public/avatar/" +  req.file.filename,
        });
        CreateSuccessRes(res, user, 200);
      }
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/",
  check_authentication,
  check_authorization(constants.ADMIN_PERMISSION),
  async function (req, res, next) {
    try {
      let body = req.body;
      let user = await userController.CreateAnUser(body);
      CreateSuccessRes(res, user, 200);
    } catch (error) {
      next(error);
    }
  }
);
router.put(
  "/:id",
  check_authentication,
  check_authorization(constants.USER_PERMISSION),
  async function (req, res, next) {
    try {
      let body = req.body;
      let user = await userController.UpdateAnUser(req.params.id, body);
      CreateSuccessRes(res, user, 200);
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
      let user = await userController.DeleteAnUser(req.params.id);
      CreateSuccessRes(res, user, 200);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
