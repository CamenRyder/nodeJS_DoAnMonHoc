var express = require("express");
var router = express.Router();
let productModel = require("../schemas/products");
let productController = require("../controllers/products");
let { CreateErrorRes, CreateSuccessRes } = require("../utils/responseHandler");
const { uploadAvatarProduct } = require("../utils/upload_file");
let {
  check_authentication,
  check_authorization,
} = require("../utils/check_auth");
let constants = require("../utils/constants");

const multer = require("multer");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let page = req.params.page || 1;
  let pageSize = req.params.pageSize || 10;
  let products = await productController.getAllProduct(page, pageSize);
  CreateSuccessRes(res, products, 200);
});
router.get("/:id", async function (req, res, next) {
  try {
    let product = await productController.getAProduct(req.params.id);
    CreateSuccessRes(res, product, 200);
  } catch (error) {
    next(error);
  }
});

// Cấu hình Multer để lưu file vào thư mục "uploads"
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/product/"); // Lưu vào thư mục "uploads"
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname); // Đổi tên file
  },
});

// Chỉ chấp nhận file ảnh (jpg, jpeg, png)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ chấp nhận file ảnh (jpg, jpeg, png)!"), false);
  }
};

// Tạo middleware Multer cho upload nhiều file
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn file 5MB
});

// API để upload nhiều file ảnh
router.post(
  "/",
  check_authentication,
  check_authorization(constants.ADMIN_PERMISSION),
  upload.array("images", 10),
  async (req, res, next) => {
    try {
      const files = req.files;
      if (!files || files.length === 0) {
        throw new Error("Không tìm thấy file ảnh nào!");
      }

      const fileUrls = files.map((file) => ({
        path: `/public/product/${file.filename}`,
      }));

      let body = req.body;
      body.images = fileUrls;
      body.anhDaiDien = fileUrls[0].path;
      body.user = req.user;
      let result = await productController.createProduct(body);

      CreateSuccessRes(res, result, 200);
    } catch (error) {
      next(error);
    }
  }
);
router.put(
  "/:id",
  check_authentication,
  check_authorization(constants.MOD_PERMISSION),
  upload.array("images", 10),
  async function (req, res, next) {
    try {
      const files = req.files;
      const id = req.params.id;
      if (!files || files.length === 0) {
        throw new Error("Không tìm thấy file ảnh nào!");
      }
      const fileUrls = files.map((file) => ({
        path: `/public/product/${file.filename}`,
      }));
      let body = req.body;
      body.images = fileUrls;
      body.anhDaiDien = fileUrls[0].path;
      body.user = req.user;
      console.log(body);
      let result = await productController.updateProduct(id, body);
      CreateSuccessRes(res, result, 200);
    } catch (error) {
      next(error);
    }
  }
);
router.delete("/:id", async function (req, res, next) {
  try {
    let result = await productController.deleteProduct(req.params.id);
    CreateSuccessRes(res, result, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
