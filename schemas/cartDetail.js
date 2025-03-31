let mongoose = require("mongoose");
let cartDetailSchema = mongoose.Schema(
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
    cart: {
      type: mongoose.Types.ObjectId,
      ref: "cart",
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
module.exports = mongoose.model("cartDetail", cartDetailSchema);
