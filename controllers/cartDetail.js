let cartDetailModel = require("../schemas/cartDetail"); 
module.exports = {
    GetAllCartDetail: async () => {
        return await cartDetailModel.find();
    },
    CreateACartDetail: async (cartDetail) => {
        try {
            let newCartDetail = new cartDetailModel({
                product: cartDetail.product,
                quantity: cartDetail.quantity,
            });
            return await newCartDetail.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },
};