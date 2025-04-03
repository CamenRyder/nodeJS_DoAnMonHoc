var express = require("express");
var router = express.Router();
const ModelCategory = require("../schemas/category");
const brand = require("../schemas/brand");
const orderStatus = require("../schemas/orderStatus");
const payment = require("../schemas/payment");
const Product = require("../schemas/products");
const imageProduct = require("../schemas/imageProduct");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

router.get("/", async function (req, res, next) {
  // create list category
  let categoriesLocal = [];
  let categories = await ModelCategory.find();
  if (categories.length == 0) {
    categoriesLocal = [
      new ModelCategory({ tenLoai: "Điện Thoại" }),
      new ModelCategory({ tenLoai: "Laptop" }),
      new ModelCategory({ tenLoai: "Đồng Hồ" }),
      new ModelCategory({ tenLoai: "Tai Nghe" }),
      new ModelCategory({ tenLoai: "Màn Hình" }),
      new ModelCategory({ tenLoai: "Bàn Phím" }),
      new ModelCategory({ tenLoai: "Chuột" }),
      new ModelCategory({ tenLoai: "Phụ Kiện" }),
      new ModelCategory({ tenLoai: "PC" }),
      new ModelCategory({ tenLoai: "Khác" }),
    ];
    categoriesLocal.forEach(async (category) => {
      await category.save();
    });
  }

  // create list brand
  let brandsLocal = [];
  let brands = await brand.find();
  if (brands.length == 0) {
    brandsLocal = [
      new brand({ tenLoai: "Apple" }),
      new brand({ tenLoai: "Samsung" }),
      new brand({ tenLoai: "Xiaomi" }),
      new brand({ tenLoai: "Oppo" }),
      new brand({ tenLoai: "Vsmart" }),
      new brand({ tenLoai: "Nokia" }),
      new brand({ tenLoai: "Sony" }),
      new brand({ tenLoai: "Lenovo" }),
      new brand({ tenLoai: "Asus" }),
      new brand({ tenLoai: "Huawei" }),
    ];
    brandsLocal.forEach(async (brand) => {
      await brand.save();
    });
  }
  let orderStatusesLocal = [];
  let orderStatuses = await orderStatus.find();
  if (orderStatuses.length == 0) {
    orderStatusesLocal = [
      new orderStatus({ tenTrangThai: "Chờ xác nhận đơn hàng" }),
      new orderStatus({ tenTrangThai: "Đã xác nhận đơn hàng" }),
      new orderStatus({ tenTrangThai: "Đang giao hàng" }),
      new orderStatus({ tenTrangThai: "Đã giao hàng thông" }),
      new orderStatus({ tenTrangThai: "Đã nhận hàng" }),
      new orderStatus({ tenTrangThai: "Đã hủy đơn hàng" }),
      new orderStatus({ tenTrangThai: "Chờ xác nhận yêu cầu trả hàng" }),
      new orderStatus({ tenTrangThai: "Đã xác nhận yêu cầu trả hàng" }),
      new orderStatus({ tenTrangThai: "Đã trả hàng thông" }),
      new orderStatus({ tenTrangThai: "Thanh toán không thông" }),
    ];
    orderStatusesLocal.forEach(async (orderStatus) => {
      await orderStatus.save();
    });
  }

  let paymentsLocal = [];
  let payments = await payment.find();
  if (payments.length == 0) {
    let paymentsLocal = [
      new payment({ tenLoai: "Thanh toán khi nhận hàng" }),
      new payment({ tenLoai: "Thanh toán trên website" }),
    ];
    paymentsLocal.forEach(async (payment) => {
      await payment.save();
    });
  }

  let descriptions = [
    "Mô tả sản phẩm 1",
    "Mô tả sản phẩm 2",
    "Mô tả sản phẩm 3",
  ];
  let products = await Product.find();
  let categoriesProd = await ModelCategory.find();
  let brandsProd = await brand.find();

  if (products.length < 100) {
    for (let i = 1; i <= 172; i++) {
      let product = new Product();
      product.tenSp = "Product " + i;
      product.imgUrl = "/public/product/" + "device (" + i + ").png";
      product.giaBan = Math.floor(Math.random() * 9000) * 1000 + 1000;
      product.giaNhap = product.giaBan * 0.85;
      product.anhDaiDien = "/public/product/" + "device (" + i + ").png";
      product.moTa =
        descriptions[Math.floor(Math.random() * descriptions.length)];
      product.phanTramGiam = Math.floor(Math.random() * 40);
      product.soLuongCon = Math.floor(Math.random() * 1000);

      product.category =
        categoriesProd[Math.floor(Math.random() * categoriesProd.length)]._id;
      product.brand =
        brandsProd[Math.floor(Math.random() * brandsProd.length)]._id;
      let images = [];
      for (let j = 0; j < 5; j++) {
        let image = new imageProduct({
          url:
            "/public/product/" +
            "device (" +
            Math.floor(Math.random() * 172) +
            ").png",
          productId: product._id,
        }); 
        await image.save();
        images.push(image._id);
      }
      product.images = images;
      await product.save();
    }
  }

  return res.send("done");
});

module.exports = router;
