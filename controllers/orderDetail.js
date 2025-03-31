let orderDetailModel = require("../schemas/orderDetail");

module.exports = {
    GetAllOrderDetail: async () => {
        return await orderDetailModel.find();
    },
};