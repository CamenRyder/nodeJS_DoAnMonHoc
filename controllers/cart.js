let cartModel = require("../schemas/cart"); 
module.exports = {  
    GetAllCart: async () => {
        return await cartModel.find();
    },
    CreateAnCart: async (cart) => {
        try {
            let newCart = new cartModel({
                cart: cart,
            });
            return await newCart.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },
};