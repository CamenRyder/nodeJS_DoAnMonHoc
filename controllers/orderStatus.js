let orderStatusModel  = require("../schemas/orderStatus");

module.exports = {
    getAllOrderStatus: async (req, res, next) => {
        try {
            return await orderStatusModel.find(
                { isDeleted: false }
            );
            
        } catch (error) {
            next(error);
        }
    },
    updateOrderStatus: async (id, body) => {
        try {
            let orderStatus = await orderStatusModel.findOneAndUpdate(
                { _id: id },
                body
            );
            return orderStatus;
        } catch (error) {
            throw error;
        }
    },
    createOrderStatus: async (body) => {
        try {
            let newOrderStatus = new orderStatusModel(body);
            return await newOrderStatus.save();
        } catch (error) {
            throw error;
        }
    },
    deleteOrderStatus: async (id) => {
        try {
            return await orderStatusModel.findByIdAndUpdate(id, {
                isDeleted: true,
            });
        } catch (error) {
            throw error;
        }
    },
};