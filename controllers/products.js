let productModel = require("../schemas/products");
let mongoose = require("mongoose");
let categoryModel = require("../schemas/category");
let brandModel = require("../schemas/brand");
let imageProductModel = require("../schemas/imageProduct");
let userModel = require("../schemas/user");

const { get } = require("mongoose");
const user = require("../schemas/user");

module.exports = {
  getAllProduct: async ({ page, pageSize }) => {
    try {
      let products = await productModel
        .find({
          isDeleted: false,
        })
        .populate("category")
        .skip((page - 1) * pageSize)
        .limit(pageSize);
      return products;
    } catch (error) {
      next(error);
    }
  },

  createProduct: async (body) => {
    try {
      console.log("New product");
      const [brand, category] = await Promise.all([
        brandModel.findOne({ isDeleted: false, tenLoai: body.brand }),
        categoryModel.findOne({ isDeleted: false, tenLoai: body.category }),
      ]);

      let newProduct = new productModel();
      newProduct.tenSp = body.tenSp;
      newProduct.giaBan = parseInt(body.giaBan, 10);
      newProduct.giaNhap = parseInt(body.giaNhap, 10);
      newProduct.moTa = body.moTa;
      newProduct.anhDaiDien = body.anhDaiDien;
      newProduct.soLuongCon = parseInt(body.soLuongCon, 10);
      newProduct.category = category._id;
      newProduct.brand = brand._id;

      newProduct.user = body.user._id;

      let imageIds = [];
      for (const image of body.images) {
        let imageProduct = new imageProductModel({
          url: image.path,
          productId: newProduct._id,
        });
        await imageProduct.save();
        imageIds.push(imageProduct._id);
      }

      // if (body.images) {
      //   let imageProduct = await imageProductModel.insertMany({
      //     url: body.images.path,
      //     productId: newProduct._id,
      //   });
      //   body.images = imageProduct.map((image) => image._id);
      // }
      newProduct.images = imageIds;

      return await newProduct.save();
    } catch (error) {
      throw error;
    }
  },
};
