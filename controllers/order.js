let orderModel = require("../schemas/order");
module.exports = {
  GetAllOrder: async () => {
    let orders = await orderModel.find().populate({
      path: "orderDetail",
    });
    return orders;
  },
};
