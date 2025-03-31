let mongoose = require("mongoose");
let cartSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true,
    },
    createDate: {
      type: String,
      required: true,
    },
    updateDate: {
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
module.exports = mongoose.model("cart", cartSchema);
