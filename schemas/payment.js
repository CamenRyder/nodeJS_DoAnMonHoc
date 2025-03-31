let mongoose = require("mongoose");
let paymentSchema = mongoose.Schema(
  {
    tenLoai: {
      type: String,
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
module.exports = mongoose.model("payment", paymentSchema);
