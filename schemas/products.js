let mongoose = require("mongoose");
let productSchema = mongoose.Schema(
  {
    tenSp: {
      type: String,
      required: true,
    },
    giaBan: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    giaNhap: {
      type: Number,
      default: 0,
      required: true,
      min: 0,
    },
    moTa: {
      type: String,
      default: "",
    },
    anhDaiDien: {
      type: String,
      default: "",
    },
    phanTramGiam: {
      type: Number,
      default: 0,
      min: 0,
    }, 
    soLuongCon: {
      type: Number,
      default: 0,
      min: 0,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "brand",
      required: true,
    },
    images: [
      {
        type: mongoose.Types.ObjectId,
        ref: "imageProduct",
        required: true,
      },
    ],
  

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("product", productSchema);
// products
