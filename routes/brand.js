var express = require("express");
var router = express.Router();
let brandController = require("../controllers/brand");
let { uploadAvatarProduct } = require("../utils/upload_file");
let { CreateSuccessRes } = require("../utils/responseHandler");
let {
  check_authentication,
  check_authorization,
} = require("../utils/check_auth");

let constants = require("../utils/constants");
// Get All Brand
router.get(
  "/",
  check_authentication,
  check_authorization(constants.USER_PERMISSION),
  async (req, res, next) => {
    try {
      let brands = await brandController.getAllBrand();
      CreateSuccessRes(res, brands, 200);
    } catch (error) {
      next(error);
    }
  }
);

// Create Brand
router.post(
  "/",
  check_authentication,
  check_authorization(constants.MOD_PERMISSION),
  uploadAvatarProduct.single("file"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        throw new Error("Khong co file anh dai dien");
      } else {
        let tenLoai = req.body.tenLoai;
        let anhDaiDien = "/public/product/" + req.file.filename;
        let user = await brandController.createBrand({ tenLoai, anhDaiDien });
        CreateSuccessRes(res, user, 200);
      }
    } catch (error) {
      next(error);
    }
  }
);

// Update Brand
router.put(
  "/:id",
  check_authentication,
  check_authorization(constants.MOD_PERMISSION),
  uploadAvatarProduct.single("file"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        throw new Error("Khong co file anh dai dien");
      } else {
        let id = req.params.id;
        let tenLoai = req.body.tenLoai;
        let anhDaiDien = "/public/product/" + req.file.filename;
        let user = await brandController.updateBrand(id, {
          tenLoai,
          anhDaiDien,
        });
        CreateSuccessRes(res, user, 200);
      }
    } catch (error) {
      next(error);
    }
  }
);
// Delete Brand
router.delete(
  "/:id",
  check_authentication,
  check_authorization(constants.ADMIN_PERMISSION),
  async (req, res, next) => {
    try {
      let id = req.params.id;
      let brand = await brandController.deleteBrand(id);
      CreateSuccessRes(res, brand, 200);
    } catch (error) {
      next(error);
    }
  }
);

// export the router
module.exports = router;
