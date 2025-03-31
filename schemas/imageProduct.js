let mongoose = require("mongoose");
let imageProduct = mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("imageProduct", imageProduct);
