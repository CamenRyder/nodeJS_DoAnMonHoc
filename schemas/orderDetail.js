let mongoose = require("mongoose");
let orderDetailSchema = mongoose.Schema(
  {
    quanity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "product",
      required: true,
    },
    order: {
      type: mongoose.Types.ObjectId,
      ref: "order",
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
module.exports = mongoose.model("orderDetail", orderDetailSchema);
