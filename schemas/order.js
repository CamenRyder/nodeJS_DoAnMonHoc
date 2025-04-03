let mongoose = require("mongoose");
let orderSchema = mongoose.Schema(
  {
    orderDate: {
      type: String,
      required: true,
      unique: true,
    },
    totalPrice: {
      type: Number,
      default: "",
    },
    totalQuantity: {
      type: Number,
      default: "",
    },
    shippingAddress: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    orderStatus: {
      type: mongoose.Types.ObjectId,
      ref: "orderStatus",
      required: true,
    },
    payment: {
      type: mongoose.Types.ObjectId,
      ref: "payment",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("order", orderSchema);
// products
